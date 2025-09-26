import { Router } from "express";
import { AmenityController } from "../controllers/amenity.controller";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Amenities
 *   description: Управление удобствами
 */

/**
 * @swagger
 * /amenities:
 *   post:
 *     summary: Создать удобство
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Удобство создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 */
router.post("/", authMiddleware, AmenityController.create);

/**
 * @swagger
 * /amenities:
 *   get:
 *     summary: Получить список удобств
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список удобств
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Amenity'
 */
router.get("/", authMiddleware, AmenityController.findAll);

/**
 * @swagger
 * /amenities/{id}:
 *   get:
 *     summary: Получить удобство по ID
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Удобство найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 *       404:
 *         description: Удобство не найдено
 */
router.get("/:id", authMiddleware, AmenityController.findById);

/**
 * @swagger
 * /amenities/{id}:
 *   put:
 *     summary: Обновить удобство
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Удобство обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 *       404:
 *         description: Удобство не найдено
 */
router.put("/:id", authMiddleware, AmenityController.update);

/**
 * @swagger
 * /amenities/{id}:
 *   delete:
 *     summary: Удалить удобство
 *     tags: [Amenities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Удобство удалено
 *       404:
 *         description: Удобство не найдено
 */
router.delete("/:id", authMiddleware, AmenityController.delete);

export default router;
