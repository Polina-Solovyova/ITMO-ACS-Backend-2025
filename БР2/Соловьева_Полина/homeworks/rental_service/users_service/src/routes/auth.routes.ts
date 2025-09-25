import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserCreate"
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserCreate"
 *       400:
 *         description: Ошибка валидации или email уже занят
 *
 * /auth/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AuthLogin"
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       401:
 *         description: Неверные данные
 */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
