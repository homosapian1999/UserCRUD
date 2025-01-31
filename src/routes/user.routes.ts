import express from "express";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/userValidator";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/user/:id", getUser);
userRoutes.post("/create-user", validate(userSchema), createUser);
userRoutes.post("/update-user/:id", validate(userSchema), updateUser);
userRoutes.post("/delete-user/:id", deleteUser);

export default userRoutes;
