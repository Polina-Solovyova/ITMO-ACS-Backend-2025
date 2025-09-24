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
          Property: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              owner_id: { type: "string", format: "uuid" },
              title: { type: "string" },
              description: { type: "string" },
              type: { type: "string" },
              location: { type: "string" },
              price_per_month: { type: "number" },
              photos: { type: "array", items: { type: "string" } },
              available_from: { type: "string", format: "date" },
              available_to: { type: "string", format: "date" },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" },
            },
            required: ["owner_id", "title", "description", "type", "location", "price_per_month"],
          },
          Amenity: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              description: { type: "string" },
            },
            required: ["name"],
          },
          PropertyAmenity: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              property_id: { type: "string", format: "uuid" },
              amenity_id: { type: "string", format: "uuid" },
            },
            required: ["property_id", "amenity_id"],
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"], // Пути к маршрутам
  };

  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
