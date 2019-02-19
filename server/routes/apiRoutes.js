const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Word = require("../models/word.js");
const request = require("superagent");
const Chat = require("../models/chat");
const Help = require("../models/help");
const async = require("async");
const _ = require("lodash");

const { googleAPI } = require("../../noCommit");
const quizzes = require("../dummy/texts");

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate");

// Instantiates a client
const translate = new Translate({
  credentials: googleAPI,
  projectId: "marine-balm-231904"
});

//google translate api
const translateIt = async (text, country) => {
  console.log(text, country);
  try {
    const [data] = await translate.translate(text, country);
    return data;
  } catch (err) {
    console.log(err, "Error at Translate It");
  }
};

// router.get('/test', (req, res) => {
//   res.status(200).json({ test: 'This is from the server' })
// })

//(I want a word translated from foreign language to my language) post json object with to, from, and the word to be translated
//retrieve list of translations, if there is no translation available do google translate
router.post("/translate", async (req, res) => {
  let { word, to, from } = req.body;
  word = word.replace(/\s+/, " ");
  const [everAsked] = await Word.find({ word, to, from, isTranslated: false });
  if (!everAsked) {
    const newWord = new Word();
    newWord.to = to;
    newWord.from = from;
    newWord.word = word;
    const savedWord = await newWord.save();
    const gTranslated = await translateIt(word, to);
    console.log(gTranslated);
    return res.json({ savedWord, fromGoogle: gTranslated });
  }
  const foundWords = await Word.find({ word, to, from, isTranslated: true });
  if (foundWords.length < 5) {
    const translatedText = translateIt(word, to);
    return res.json({
      fromGoogle: translatedText,
      text: word,
      fromServer: foundWords
    });
  } else {
    return res.json({
      fromGoogle: null,
      text: word,
      fromServer: foundWords
    });
  }
});

var message = "this is a message";
var healthyTimer = true;

router.post("/message", async (req, res) => {
  message = req.body.msg.replace(/\s+/, " ");
  console.log(message);
});

//if req.message != message, then check google api on limited basis, else not
router.get("/messages/:lastMsg/:language", async (req, res) => {
  console.log(req.body.lastMsg);
  console.log(req.body.language);
  // let { lastMsg, language } = req.body;
  res.send(req.body.lastMsg);

  if (lastMsg === message) {
    console.log("there");
    return null;
  } else if (healthyTimer) {
    let googleResponse = translateIt(language, message);
    res.json({ msg: googleResponse });
  } else {
    res.json({ msg: "exceeded api limit usage" });
  }
});

//(Person responds to translation) respose with the best translation, to from, word, and translation
router.post("/response", (req, res) => {
  const { word, to, from, result } = req.body;
  Word.find({ word, to, from, result }, function(err, doc) {
    if (doc.result == result) {
      //findOneById and update count
      let newCount = doc.count + 1;
      Word.findByIdAndUpdate(doc.id, { count: newCount }, function(err, doc) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      Word.save(function(err) {});
    }
  });
});

//(get random list of words/phrases pending to be translated)
router.get("/translations", (req, res) => {
  res.json({ word: "hello" });
  // const foundWords = await Word.find({}).limit(20);
  // res.json({
  //   pendingWords:foundWords
  // })
});

router.get("/quiz/:level/:lang", async (req, res) => {
  const arr = quizzes[req.params.level];
  const shuffled = _.shuffle(arr).slice(0, 10);
  const lanQuizzes = shuffled.join(" / ");
  try {
    const translated = await translateIt(
      lanQuizzes,
      req.params.lang.replace(/\s+/, "")
    );
    console.log(translated);
    res.json({ translated: translated.split("/"), answer: shuffled });
  } catch (err) {
    res.json({ translated: shuffled, answer: shuffled });
  }
});

router.post("/saveResults", async (req, res) => {
  const { answers, submits, to } = req.body;
  for (let i = 0; i < 5; i++) {
    if (submits[i]) {
      const [existWord] = await Word.find({
        to,
        from: "en",
        word: answers[i],
        result: submits[i].toLowerCase().trim()
      });
      if (existWord) {
        existWord.count = existWord.count + 1;
        existWord.save();
      } else {
        const newWord = new Word();
        newWord.from = "ko";
        newWord.to = "en";
        newWord.word = answers[i];
        newWord.result = submits[i].toLowerCase().trim();
        newWord.save();
      }
    }
  }
  res.json({ message: "done" });
});

router.post("/sendMessage", async (req, res) => {
  const newChat = new Chat();
  newChat.chat = await translateIt(req.body.chat, "en");
  newChat.timestamp = Date.now();
  newChat
    .save()
    .then(savedChat => {
      console.log(savedChat);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/chatHistory/:lang", async (req, res) => {
  const chats = await Chat.find()
    .sort({ timestamp: -1 })
    .limit(10);
  chats.sort((a, b) => {
    return a.timestamp > b.timestamp;
  });
  const toLanguage = chats
    .map(chat => {
      return chat.chat;
    })
    .join(" -=- ");
  const result = await translateIt(toLanguage, req.params.lang);
  res.json(result.split(/\-=\-|\- = \-|= = \-|= \- \-/gm));
});

router.post("/help", (req, res) => {
  const { from, to, word } = req.body;
  const newHelp = new Help();
  newHelp.from = from;
  newHelp.to = to;
  newHelp.word = word;
  newHelp
    .save()
    .then(h => {
      console.log(h);
    })
    .catch(er => {
      console.log(er);
    });
});

router.get("/help", async (req, res) => {
  const helps = await Help.find().limit(20);
  res.json(helps);
});

router.post("/help/edit/:id", async (req, res) => {
  const help = await Help.findById(req.params.id);
  const copy = [...help.helped];
  copy.push(req.body.input);
  help.helped = copy;
  help
    .save()
    .then(data => {
      console.log(data);
    })
    .catch(er => {
      console.log(er);
    });
});
module.exports = router;
