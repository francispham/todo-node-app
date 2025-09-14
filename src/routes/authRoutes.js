import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Prisma from "../prismaClient.js";

const router = express.Router();

/* Register a new user async endpoint /auth/register */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //? Save the username and an irreversibly encrypted password
  //? Save gilgamesh@gmail.com | aklsdjfasdf.asdf..qwe..q.we...qwe.qw.easd

  //? Encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  //? Save the new user and hashed password to the db
  try {
    const user = await Prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    //? Now that we have a user, I want to add their first todo for them
    const defaultTodo = `Hello :) Add your first todo!`;
    await Prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    //? Create a Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

/* Login returned user async endpoint /auth/login */
router.post("/login", async (req, res) => {
  //? We get their email, and we look up the password associated with that email in the database
  //? But we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
  //? So what we can to do, is again, one way encrypt the password the user just entered

  const { username, password } = req.body;

  try {
    const user = await Prisma.user.findUnique({
      where: {
        username,
      },
    });

    //? If we cannot find a user associated with that username, return out from the function
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    //? If the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

    // then we have a successful authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
