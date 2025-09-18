import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rental Service API",
      version: "1.0.0",
      description: "RESTful API для сервиса аренды недвижимости",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
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
            }
          },
          UserCreate: {
            type: "object",
            properties: {
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              phone_number: { type: "string", nullable: true },
            },
            required: ["first_name", "last_name", "email", "password"]
          },
          Property: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              owner: { $ref: "#/components/schemas/User" },
              title: { type: "string" },
              description: { type: "string" },
              type: { type: "string" },
              location: { type: "string" },
              price_per_month: { type: "number" },
            }
          },
          PropertyCreate: {
            type: "object",
            properties: {
              owner_id: { type: "string", format: "uuid" },
              title: { type: "string" },
              description: { type: "string" },
              type: { type: "string" },
              location: { type: "string" },
              price_per_month: { type: "number" },
            },
            required: ["owner_id", "title", "description", "type", "location", "price_per_month"]
          },
          Rental: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              property: { $ref: "#/components/schemas/Property" },
              tenant: { $ref: "#/components/schemas/User" },
              start_date: { type: "string", format: "date" },
              end_date: { type: "string", format: "date" },
              status: { type: "string" }
            }
          },
          RentalCreate: {
            type: "object",
            properties: {
              property_id: { type: "string", format: "uuid" },
              tenant_id: { type: "string", format: "uuid" },
              start_date: { type: "string", format: "date" },
              end_date: { type: "string", format: "date" },
              status: { type: "string" }
            },
            required: ["property_id", "tenant_id", "start_date", "end_date", "status"]
          },
          MessageCreate: {
            type: "object",
            properties: {
              sender_id: { type: "string", format: "uuid" },
              receiver_id: { type: "string", format: "uuid" },
              rental_id: { type: "string", format: "uuid" },
              content: { type: "string" }
            },
            required: ["sender_id", "receiver_id", "rental_id", "content"]
          },
          ReviewCreate: {
            type: "object",
            properties: {
              rental_id: { type: "string", format: "uuid" },
              reviewer_id: { type: "string", format: "uuid" },
              rating: { type: "integer" },
              comment: { type: "string" }
            },
            required: ["rental_id", "reviewer_id", "rating", "comment"]
          },
          AmenityCreate: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" }
            },
            required: ["name"]
          },
          PropertyAmenityCreate: {
            type: "object",
            properties: {
              property_id: { type: "string", format: "uuid" },
              amenity_id: { type: "string", format: "uuid" }
            },
            required: ["property_id", "amenity_id"]
          }
        }
      }
  },
  apis: ["./src/routes/*.ts"]
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
