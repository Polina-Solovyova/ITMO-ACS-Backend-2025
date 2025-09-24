import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Управление отзывами
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Создать отзыв
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rentalId:
 *                 type: string
 *                 format: uuid
 *               reviewerId:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *             required:
 *               - rentalId
 *               - reviewerId
 *               - rating
 *               - comment
 *     responses:
 *       201:
 *         description: Отзыв создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post("/", ReviewController.create);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Получить список отзывов
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Список отзывов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/", ReviewController.findAll);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Получить отзыв по ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Отзыв найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Отзыв не найден
 */
router.get("/:id", ReviewController.findById);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Обновить отзыв
 *     tags: [Reviews]
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
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Отзыв обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Отзыв не найден
 */
router.put("/:id", ReviewController.update);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Удалить отзыв
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Отзыв удален
 *       404:
 *         description: Отзыв не найден
 */
router.delete("/:id", ReviewController.delete);

export default router;
