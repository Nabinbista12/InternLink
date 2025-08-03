import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

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
  await mongoose.connect("mongodb://127.0.0.1:27017/linkedin");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`listening at the port ${port}.`);
});
