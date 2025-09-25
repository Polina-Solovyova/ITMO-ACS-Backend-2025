import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Работа с пользователями
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список пользователей (только авторизованные)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Пропустить N пользователей
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Количество пользователей для выборки
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Фильтр по email
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, UserController.findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID (только авторизованные)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Пользователь не найден
 */
router.get("/:id", authMiddleware, UserController.findById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Обновить свои данные пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *                 nullable: true
 *               password_hash:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [owner, tenant, admin]
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (пользователь пытается изменить чужие данные)
 *       404:
 *         description: Пользователь не найден
 */
router.put("/:id", authMiddleware, UserController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить своего пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удалён
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (пользователь пытается удалить чужие данные)
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/:id", authMiddleware, UserController.delete);

export default router;
