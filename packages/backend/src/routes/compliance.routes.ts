import { Router } from "express";
import { checkCompliance } from "../controllers/compliance.controller";

const router: Router = Router();

/**
 * @openapi
 * /api/compliance/check:
 *   post:
 *     summary: Generate a compliance report
 *     description: Generates a compliance report based on business parameters and relevant regulations.
 *     tags:
 *       - Compliance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessSize
 *               - seatingCapacity
 *               - customFields
 *             properties:
 *               businessSize:
 *                 type: number
 *                 example: 120
 *                 description: Size of the business in square meters.
 *               seatingCapacity:
 *                 type: number
 *                 example: 40
 *                 description: Number of seats in the business.
 *               customFields:
 *                 type: object
 *                 additionalProperties:
 *                   oneOf:
 *                     - type: string
 *                     - type: number
 *                 example:
 *                   "openingHours": "08:00-22:00"
 *     responses:
 *       200:
 *         description: Compliance report generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *       500:
 *         description: Failed to generate compliance report.
 */
router.post("/check", checkCompliance);

export default router;
