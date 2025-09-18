import express from "express";
import { AppDataSource } from "./config/data-source";

import userRoutes from "./routes/user.routes";
import propertyRoutes from "./routes/property.routes";
import rentalRoutes from "./routes/rental.routes";
import messageRoutes from "./routes/message.routes";
import reviewRoutes from "./routes/review.routes";
import amenityRoutes from "./routes/amenity.routes";
import propertyAmenityRoutes from "./routes/propertyAmenity.routes";

import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

// Логирование всех запросов
app.use(loggerMiddleware);


// Роуты
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/property-amenities", propertyAmenityRoutes);

// Swagger
setupSwagger(app);

// Глобальная обработка ошибок
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("Error during Data Source initialization", err));
