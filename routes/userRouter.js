import express from "express";
import User from "../models/User.js";
import { hash } from "../lib/crypto.js"
import { compare } from "bcrypt";
import jwt from "jsonwebtoken"

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    // TODO: hash the password
    req.body.password = await hash(req.body.password)
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
      originError: error
    })
  }
});


userRouter.post("/login", async (req, res, next) => {
    try {
        // 1 find user

        const user = await User.findOne({ email: req.body.email })

        // 2 compare  password

        const loginSuccess = await compare(req.body.password, user.password)

        if(!loginSuccess){ throw Error("Password mismatch")}

        // 3 create token

        const token = jwt.sign({ uid: user._id }, process.env.SECRET)

        res.send({user, token})

        // 4 send user with token






    } catch (error) {
        next({
            status: 401,
            message: "Login failed",
            originError: error
          })
    }
})

export default userRouter;
