import User from "../models/User";
import { Request, Response } from "express";
import { AddUserRequestType } from "../types/userTypes";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, mobile } = req.body as AddUserRequestType;
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existingUser) {
      let errorMessage = "";
      if (existingUser.email === email && existingUser.mobile === mobile) {
        errorMessage = "Email and Mobile already exists";
      } else if (existingUser.email === email) {
        errorMessage = "Email already exists";
      } else {
        errorMessage = "Mobile already exists";
      }
      res.status(400).json({ message: errorMessage });
      return;
    }
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
