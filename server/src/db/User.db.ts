import { UserModel } from "../models/User.model";

export const createUser = (email: string, password: string) =>
  UserModel.create({ email, password });
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
