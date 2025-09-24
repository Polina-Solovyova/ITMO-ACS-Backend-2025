import express from "express";
import { AppDataSource } from "./config/data-source";
import { connectRabbitMQ } from "./config/rabbit";

// Роуты
import rentalRoutes from "./routes/rental.routes";
import messageRoutes from "./routes/message.routes";
import reviewRoutes from "./routes/review.routes";

// Middleware
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

// Логирование всех запросов
app.use(loggerMiddleware);

// Роуты Rental Service
app.use("/api/rentals", rentalRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);

// Swagger
setupSwagger(app, "Rental Service API", 5003);

// Глобальная обработка ошибок
app.use(errorMiddleware);

const PORT = process.env.PORT || 5003;

AppDataSource.initialize()
  .then(async () => {
    console.log("Rental Service Data Source initialized");

    // Подключение RabbitMQ
    await connectRabbitMQ();

    app.listen(PORT, () => console.log(`Rental Service running on port ${PORT}`));
  })
  .catch(err =>
    console.error("Error during Rental Service Data Source initialization", err)
  );
