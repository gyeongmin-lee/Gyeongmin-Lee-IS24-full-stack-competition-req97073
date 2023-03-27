import cors from "cors";
import express from "express";
import productRouter from "./routers/products";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/products", productRouter);

export default app;
