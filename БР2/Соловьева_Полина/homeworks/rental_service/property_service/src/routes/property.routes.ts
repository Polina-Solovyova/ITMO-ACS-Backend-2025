import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Работа с объектами недвижимости
 */

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Создать объект недвижимости
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               price_per_month:
 *                 type: number
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               available_from:
 *                 type: string
 *                 format: date
 *               available_to:
 *                 type: string
 *                 format: date
 *             required:
 *               - ownerId
 *               - title
 *               - description
 *               - type
 *               - location
 *               - price_per_month
 *     responses:
 *       201:
 *         description: Объект недвижимости создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.post("/", authMiddleware, PropertyController.create);

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Получить список объектов недвижимости
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список объектов недвижимости
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.get("/", authMiddleware, PropertyController.findAll);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Получить объект недвижимости по ID
 *     tags: [Properties]
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
 *         description: Объект найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Объект не найден
 */
router.get("/:id", authMiddleware, PropertyController.findById);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Обновить объект недвижимости
 *     tags: [Properties]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               price_per_month:
 *                 type: number
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               available_from:
 *                 type: string
 *                 format: date
 *               available_to:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Объект обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Объект не найден
 */
router.put("/:id", authMiddleware, PropertyController.update);

router.delete("/:id", authMiddleware, PropertyController.delete);

export default router;
