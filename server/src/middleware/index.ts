import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model";

export interface RequestWithUser extends express.Request {
  user: { _id: string };
}

export async function isValidId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout item does not exist." });
  }

  next();
}

export async function isAuthenticated(
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(_id).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
}
