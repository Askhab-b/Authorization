const { Router } = require("express");
const { todoController } = require("../controllers/todo.controller");
const authMiddleware = require("../models/middlewares/auth.middleware");

const router = Router();

router.post("/todos", authMiddleware, todoController.postTodo);
router.delete("/todos/:id", authMiddleware, todoController.deleteTodo);
router.patch("/todos/:id", todoController.patchTodo);
router.get("/todos/:id", authMiddleware, todoController.findAllTodo);

module.exports = router;
