import { Router } from "express";
import { PropertyAmenityController } from "../controllers/propertyAmenity.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PropertyAmenities
 *   description: Связь объектов недвижимости с удобствами
 */

/**
 * @swagger
 * /property-amenities:
 *   post:
 *     summary: Создать объект удобств для недвижимости
 *     tags: [PropertyAmenities]
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
 *               amenityId:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - propertyId
 *               - amenityId
 *     responses:
 *       201:
 *         description: Объект удобств для недвижимости создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyAmenity'
 */
router.post("/", PropertyAmenityController.create);

/**
 * @swagger
 * /property-amenities:
 *   get:
 *     summary: Получить список объектов удобств для недвижимости
 *     tags: [PropertyAmenities]
 *     responses:
 *       200:
 *         description: Список объектов удобств для недвижимости
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyAmenity'
 */
router.get("/", PropertyAmenityController.findAll);

/**
 * @swagger
 * /property-amenities/{id}:
 *   get:
 *     summary: Получить объект удобств для недвижимости по ID
 *     tags: [PropertyAmenities]
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
 *               $ref: '#/components/schemas/PropertyAmenity'
 *       404:
 *         description: Объект не найден
 */
router.get("/:id", PropertyAmenityController.findById);

/**
 * @swagger
 * /property-amenities/{id}:
 *   put:
 *     summary: Обновить объект удобств для недвижимости
 *     tags: [PropertyAmenities]
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
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *               amenityId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Объект обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyAmenity'
 *       404:
 *         description: Объект не найден
 */
router.put("/:id", PropertyAmenityController.update);

/**
 * @swagger
 * /property-amenities/{id}:
 *   delete:
 *     summary: Удалить объект удобств для недвижимости
 *     tags: [PropertyAmenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Объект удален
 *       404:
 *         description: Объект не найден
 */
router.delete("/:id", PropertyAmenityController.delete);

export default router;
