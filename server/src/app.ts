import cors from "cors";
import express from "express";
import productRouter from "./routers/products";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (_req, res) => {
  res.send("ok");
});

app.use("/api/products", productRouter);

export default app;
