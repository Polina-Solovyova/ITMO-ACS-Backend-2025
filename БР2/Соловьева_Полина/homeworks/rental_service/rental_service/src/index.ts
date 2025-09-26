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

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

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

const PORT = Number(process.env.PORT) || 5003;
const HOST = process.env.HOST || "0.0.0.0";

AppDataSource.initialize()
  .then(() => {
    console.log("Users Service Data Source initialized");
    app.listen(PORT, HOST, () =>
      console.log(`Users Service running on http://${HOST}:${PORT}`)
    );
  })
  .catch(err => console.error("Error during Users Service Data Source initialization", err));
