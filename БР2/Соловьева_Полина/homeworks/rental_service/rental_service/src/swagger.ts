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
          Message: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              senderId: { type: "string", format: "uuid" },
              receiverId: { type: "string", format: "uuid" },
              rentalId: { type: "string", format: "uuid", nullable: true },
              content: { type: "string" },
              timestamp: { type: "string", format: "date-time" },
            },
            required: ["senderId", "receiverId", "content"],
          },
          Rental: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              propertyId: { type: "string", format: "uuid" },
              tenantId: { type: "string", format: "uuid" },
              start_date: { type: "string", format: "date" },
              end_date: { type: "string", format: "date" },
              status: { type: "string" },
              created_at: { type: "string", format: "date-time" },
            },
            required: ["propertyId", "tenantId", "start_date", "end_date", "status"],
          },
          Review: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              rentalId: { type: "string", format: "uuid" },
              reviewerId: { type: "string", format: "uuid" },
              rating: { type: "integer", minimum: 1, maximum: 5 },
              comment: { type: "string" },
              created_at: { type: "string", format: "date-time" },
            },
            required: ["rentalId", "reviewerId", "rating", "comment"],
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"], // Пути к маршрутам
  };

  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
