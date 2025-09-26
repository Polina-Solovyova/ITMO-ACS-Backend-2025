import { Router } from "express";
import { RentalController } from "../controllers/rental.controller";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Управление арендами
 */

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Создать аренду
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *               tenantId:
 *                 type: string
 *                 format: uuid
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *             required:
 *               - propertyId
 *               - tenantId
 *               - start_date
 *               - end_date
 *               - status
 *     responses:
 *       201:
 *         description: Аренда создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 */
router.post("/", authMiddleware, RentalController.create);

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Получить список аренд
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список аренд
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 */
router.get("/", authMiddleware, RentalController.findAll);

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Получить аренду по ID
 *     tags: [Rentals]
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
 *         description: Аренда найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Аренда не найдена
 */
router.get("/:id", authMiddleware, RentalController.findById);

/**
 * @swagger
 * /rentals/{id}:
 *   put:
 *     summary: Обновить аренду
 *     tags: [Rentals]
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
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Аренда обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Аренда не найдена
 */
router.put("/:id", authMiddleware, RentalController.update);

router.delete("/:id", authMiddleware, RentalController.delete);

export default router;
