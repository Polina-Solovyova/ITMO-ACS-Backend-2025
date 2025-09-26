import express from "express";
import { AppDataSource } from "./config/data-source";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

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

// Роуты Users Service
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Swagger
setupSwagger(app, "Users Service API", 5001);

// Глобальная обработка ошибок
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 5001;
const HOST = process.env.HOST || "0.0.0.0";

AppDataSource.initialize()
  .then(() => {
    console.log("Users Service Data Source initialized");
    app.listen(PORT, HOST, () =>
      console.log(`Users Service running on http://${HOST}:${PORT}`)
    );
  })
  .catch(err => console.error("Error during Users Service Data Source initialization", err));