import supertest from "supertest";
import app from "../app";

const api = supertest(app);

describe("API can be reached", () => {
  test("GET /api responds with 200", async () => {
    await api.get("/api/ping").expect(200).expect("pong");
  });
});
