const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this schema is used for words, count is amount of times it has been translated
const WordSchema = new Schema({
  to: String,
  from: String,
  word: String,
  count: {
    type: Number,
    default: 0
  },
  result: String,
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  isTranslated: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Word", WordSchema);
