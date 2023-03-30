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

describe("Product can be added", () => {
  const testProduct = {
    productName: "BC Test App",
    productOwnerName: "Jasmine Lee",
    Developers: ["John Doe", "Jane Doe", "Jack Doe", "Jill Doe", "Joe Doe"],
    scrumMasterName: "Karen Lee",
    startDate: "2023/02/13",
    methodology: "agile",
  };

  test("POST /api/products responds with 201", async () => {
    await api.post("/api/products").send(testProduct).expect(201);
  });

  test("POST /api/products responds with correct data", async () => {
    const response = await api.post("/api/products").send(testProduct);
    expect(response.body).toMatchObject(testProduct);
  });

  test("POST /api/products returns error 400 if required field is missing", async () => {
    const testProductWithoutName = {
      ...testProduct,
      productName: undefined,
    };
    const response = await api
      .post("/api/products")
      .send(testProductWithoutName)
      .expect(400);

    expect(response.body.message).toContain("some fields are missing");
  });

  test("POST /api/products returns error 400 if date is invalid", async () => {
    const testProductWithInvalidDate = {
      ...testProduct,
      startDate: "2023/02/32",
    };
    const response = await api
      .post("/api/products")
      .send(testProductWithInvalidDate)
      .expect(400);

    expect(response.body.message).toContain("Incorrect or missing date");
  });

  test("POST /api/products returns error 400 if methodology is invalid", async () => {
    const testProductWithInvalidMethodology = {
      ...testProduct,
      methodology: "invalid",
    };
    const response = await api
      .post("/api/products")
      .send(testProductWithInvalidMethodology)
      .expect(400);

    expect(response.body.message).toContain("Incorrect or missing methodology");
  });

  test("POST /api/products returns error 400 if number of devs are incorrect", async () => {
    const testProductWithInvalidDevCount = {
      ...testProduct,
      Developers: [
        "John Doe",
        "Jane Doe",
        "Jack Doe",
        "Jill Doe",
        "Jen Doe",
        "Joe Doe",
      ],
    };
    const response = await api
      .post("/api/products")
      .send(testProductWithInvalidDevCount)
      .expect(400);

    expect(response.body.message).toContain("Error: Too many developers: 6");

    const testProductWithNoDev = {
      ...testProduct,
      Developers: [],
    };

    const response2 = await api

      .post("/api/products")
      .send(testProductWithNoDev)
      .expect(400);

    expect(response2.body.message).toContain("Error: No developers");
  });
});
