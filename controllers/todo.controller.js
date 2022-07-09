const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todoController = {
  postTodo: async (req, res) => {
    const { text } = req.body;

    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      });

      return res.json(todo);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
 
    try {

      const todo = await Todo.findById(id);

      if (todo.user.toString() === req.user.id) {
        await todo.remove();

        return res.json("удалено");
      }

      return res.status(401).json("ошибка. Нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка:" + e.toString());
    }
  },

  patchTodo: async (req, res) => {
    try {
      const patchTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );
      res.json(patchTodo);
    } catch (error) {
      res.json(error.message);
    }
  },

  findAllTodo: async (req, res) => {
    try {
      const AllTodo = await Todo.find({user: req.params.id});
      res.json(AllTodo);
    } catch (error) {
      res.json(error.message);
    }
  },
};
