const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  timestamp: {
    type: Number,
    default: Date.now()
  },
  chat: String
});

module.exports = mongoose.model("Chat", ChatSchema);
