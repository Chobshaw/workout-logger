import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model";

function createToken(_id: string) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

export async function register(req: express.Request, res: express.Response) {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.register(username, email, password);
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: express.Request, res: express.Response) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.login(username, password);
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
