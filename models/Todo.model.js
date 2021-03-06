const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
