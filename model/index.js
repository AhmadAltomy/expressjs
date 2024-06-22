const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  epic: String,
  user: String,
  story: String,
  goal: String,
  notes: Array,
  acceptances: [
    {
      acceptance: String,
      done: Boolean,
    },
  ],
  tasks: [
    {
      task: String,
      statue: String,
    },
  ],
});

module.exports = mongoose.model("Story", storySchema);
