import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import productRouter from "./routers/products";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (_req, res) => {
  res.send("ok");
});

app.use("/api/products", productRouter);

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
