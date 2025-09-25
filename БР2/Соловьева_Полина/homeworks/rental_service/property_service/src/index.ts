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
dotenv.config();

const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 5002;

AppDataSource.initialize()
  .then(async () => {
    console.log("Property Service Data Source initialized");

    // Подключение RabbitMQ
    await connectRabbitMQ();

    app.listen(PORT, () => console.log(`Property Service running on port ${PORT}`));
  })
  .catch(err =>
    console.error("Error during Property Service Data Source initialization", err)
  );
