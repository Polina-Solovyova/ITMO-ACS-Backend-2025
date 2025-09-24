import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express, title: string, port: number) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title,
        version: "1.0.0",
        description: `${title} - RESTful API`,
      },
      servers: [
        {
          url: `http://localhost:${port}/api`,
        },
      ],
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string", format: "email" },
              phone_number: { type: "string", nullable: true },
              role: { type: "string", enum: ["owner", "tenant", "admin"] },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" },
            },
          },
          UserCreate: {
            type: "object",
            properties: {
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              phone_number: { type: "string", nullable: true },
              role: { type: "string", enum: ["owner", "tenant", "admin"] },
            },
            required: ["first_name", "last_name", "email", "password"],
          },
          AuthLogin: {
            type: "object",
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string" },
            },
            required: ["email", "password"],
          },
          AuthResponse: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
