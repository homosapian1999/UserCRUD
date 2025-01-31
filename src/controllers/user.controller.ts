import User from "../models/User";
import { Request, Response } from "express";
import { AddUserRequestType } from "../types/userTypes";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id, isDeleted: false });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, mobile } = req.body as AddUserRequestType;
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
      isDeleted: false,
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id, isDeleted: false });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { email, mobile } = req.body as AddUserRequestType;

    if (
      (user.email === email || user.mobile === mobile) &&
      user._id.toString() != id
    ) {
      let errorMessage = "";
      if (user.email === email && user.mobile === mobile) {
        errorMessage = "Email and Mobile already exists";
      } else if (user.email === email) {
        errorMessage = "Email already exists";
      } else {
        errorMessage = "Mobile already exists";
      }
      res.status(400).json({ message: errorMessage });
      return;
    }
    await User.findByIdAndUpdate(id, req.body);
    // const updatedUser = { ...user.toObject(), ...req.body };
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id, isDeleted: false });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await User.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
