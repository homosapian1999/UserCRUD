import express from "express";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/userValidator";
import { createUser, getUsers } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/create-user", validate(userSchema), createUser);

export default userRoutes;
