const express = require('express');
const { getTrainsController } = require('../controllers/getTrainsController'); // Adjust the path as necessary
const { getTrainByIdController } = require('../controllers/getTrainByIdController'); // Adjust the path as necessary
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The train ID
 *         name:
 *           type: string
 *           description: The name of the train
 *         destination:
 *           type: string
 *           description: The train's destination
 */

/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Get a list of all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: A list of trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 */
router.get('/trains', getTrainsController);

/**
 * @swagger
 * /api/trains/{id}:
 *   get:
 *     summary: Get a train by its ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The train ID
 *     responses:
 *       200:
 *         description: A train object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 */
router.get('/trains/:id', getTrainByIdController);
module.exports = router;
