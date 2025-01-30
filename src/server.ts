import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Server is up and running");
});
