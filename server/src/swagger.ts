import swaggerJSDoc from "swagger-jsdoc";

const productEntryProperties = {
  productName: {
    type: "string",
    description: "The name of the product",
    example: "My Product",
  },
  productOwnerName: {
    type: "string",
    description: "The name of the product owner",
    example: "John Doe",
  },
  Developers: {
    type: "array",
    description: "An array of developers working on the product",
    items: {
      type: "string",
    },
    example: ["Alice", "Bob"],
  },
  scrumMasterName: {
    type: "string",
    description: "The name of the Scrum Master",
    example: "Jane Smith",
  },
  startDate: {
    type: "string",
    format: "date",
    description: "The start date of the product",
    example: "2022/01/01",
  },
  methodology: {
    type: "string",
    enum: ["agile", "waterfall"],
    description: "The development methodology used for the product",
    example: "agile",
  },
};

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "IS24 Products API",
    version: "1.0.0",
    description: "REST API for IS24 Project Application",
  },
  basePath: "/",
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      NewProductEntry: {
        type: "object",
        properties: productEntryProperties,
      },
      Product: {
        type: "object",
        properties: {
          productId: {
            type: "integer",
            description: "The unique identifier for the product",
            example: 1,
          },
          ...productEntryProperties,
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
