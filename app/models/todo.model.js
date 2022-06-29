const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    userId: String,
    title: String,
    completed: Boolean,
    date: Date
  })

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;