import supertest from "supertest";
import products from "../../data/products";
import app from "../app";

const api = supertest(app);

describe("API can be reached", () => {
  test("GET /api responds with 200", async () => {
    await api.get("/api/ping").expect(200).expect("pong");
  });
});

describe("Products can be fetched", () => {
  test("GET /api/products responds with 200", async () => {
    await api.get("/api/products").expect(200);
  });

  test("GET /api/products responds with correct number of products", async () => {
    const response = await api.get("/api/products");
    expect(response.body).toHaveLength(products.length);
  });

  test("GET /api/products responds with correct data", async () => {
    const response = await api.get("/api/products");
    expect(response.body).toEqual(products);
  });
});
