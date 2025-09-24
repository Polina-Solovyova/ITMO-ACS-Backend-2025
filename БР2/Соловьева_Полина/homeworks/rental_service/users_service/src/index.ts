import express from "express";
import { AppDataSource } from "./config/data-source";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

// Логирование всех запросов
app.use(loggerMiddleware);

// Роуты Users Service
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Swagger
setupSwagger(app, "Users Service API", 5001);

// Глобальная обработка ошибок
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

AppDataSource.initialize()
  .then(() => {
    console.log("Users Service Data Source initialized");
    app.listen(PORT, () => console.log(`Users Service running on port ${PORT}`));
  })
  .catch(err => console.error("Error during Users Service Data Source initialization", err));
