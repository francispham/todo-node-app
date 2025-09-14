import express from "express";
import Prisma from "../prismaClient";

const router = express.Router();

/* Get all Todos for logged-in user */
router.get("/", async (req, res) => {
  const userId = req.userId;

  const todos = await Prisma.todo.findMany({
    where: { userId },
  });

  res.json(todos);
});

/* Create a new Todo */
router.post("/", async (req, res) => {
  const { task } = req.body;
  const userId = req.userId;

  const todo = await Prisma.todo.create({
    data: { task, userId },
  });

  res.json(todo);
});

/* Update a Todo */
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  const updatedTodo = await Prisma.todo.update({
    where: {
      id: parseInt(id),
      userId,
    },
    data: {
      completed: !!completed,
    },
  });

  res.json(updatedTodo);
});

/* Hard Delete a Todo */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  await Prisma.todo.delete({
    where: { id: parseInt(id), userId },
  });

  res.send({ message: "Todo deleted" });
});

export default router;
