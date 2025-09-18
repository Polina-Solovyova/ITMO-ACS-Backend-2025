import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Управление сообщениями
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Создать новое сообщение
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 format: uuid
 *               receiverId:
 *                 type: string
 *                 format: uuid
 *               rentalId:
 *                 type: string
 *                 format: uuid
 *               content:
 *                 type: string
 *             required:
 *               - senderId
 *               - receiverId
 *               - rentalId
 *               - content
 *     responses:
 *       201:
 *         description: Сообщение создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post("/", MessageController.create);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Получить список сообщений
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Список сообщений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.get("/", MessageController.findAll);

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Получить сообщение по ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Сообщение найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Сообщение не найдено
 */
router.get("/:id", MessageController.findById);

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Обновить сообщение
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Сообщение обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Сообщение не найдено
 */
router.put("/:id", MessageController.update);

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Удалить сообщение
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Сообщение удалено
 *       404:
 *         description: Сообщение не найдено
 */
router.delete("/:id", MessageController.delete);

export default router;
