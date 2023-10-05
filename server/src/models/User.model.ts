import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  register(
    username: string,
    email: string,
    password: string
  ): Promise<UserDocument>;
  login(username: string, password: string): Promise<UserDocument>;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.register = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("Please fill in all fields.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  const userExists = await this.findOne({ username });
  if (userExists) {
    throw Error("Email already in use.");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({ username, email, password: hash });
};

UserSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("Please fill in all fields.");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error(`User with username, ${username}, does not exist.`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

export const UserModel = mongoose.model<UserDocument, UserModel>(
  "UserModel",
  UserSchema
);
