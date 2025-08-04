import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => {
    console.log("Connection failed:", err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", profileRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`listening at the port ${port}.`);
});
