import express from "express";
import { AppDataSource } from "./config/data-source";
import { connectRabbitMQ } from "./config/rabbit";

// Роуты
import amenityRoutes from "./routes/amenity.routes";
import propertyAmenityRoutes from "./routes/propertyAmenity.routes";
import propertyRoutes from "./routes/property.routes";

// Middleware
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { setupSwagger } from "./swagger";

// Subscribers
import "./subscribers/rental.subscriber";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

// Логирование всех запросов
app.use(loggerMiddleware);

// Роуты Property Service
app.use("/api/amenities", amenityRoutes);
app.use("/api/property-amenities", propertyAmenityRoutes);
app.use("/api/properties", propertyRoutes);

// Swagger
setupSwagger(app, "Property Service API", 5002);

// Глобальная обработка ошибок
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 5002;
const HOST = process.env.HOST || "0.0.0.0";

AppDataSource.initialize()
  .then(() => {
    console.log("Users Service Data Source initialized");
    app.listen(PORT, HOST, () =>
      console.log(`Users Service running on http://${HOST}:${PORT}`)
    );
  })
  .catch(err => console.error("Error during Users Service Data Source initialization", err));
