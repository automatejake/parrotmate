const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpSchema = new Schema({
  helped: Array,
  to: String,
  from: String,
  word: String,
  like: {
    default: 0,
    type: Number
  },
  meh: {
    default: 0,
    type: Number
  }
});

module.exports = mongoose.model("Help", HelpSchema);
