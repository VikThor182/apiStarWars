import express from 'express';
var planets = express.Router();
import Planets from '../model/planetsModel.js'

planets.route('/')
    .get(async (req, res) => {
        const planets = await Planets.find();
        if(!err) return res.status(200).send(planets);
        else return res.status.json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const planets = new Planets({
            fields : {...req.body},
            model : 'resources.planets',
            pk : (new Date).getTime()
        });
        planets.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    planets.route('/:pk')
    .get(async (req, res) => {
        Planets.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPlanet = await Planets.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPlanet) {
                return res.status(404).json({ error: "Planet not found" });
            }

            return res.status(200).json({ message: "Planet updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Planets.deleteOne(req.params, (err, docs) => {
            if(!err)res.status(200).json({message: "Planet deleted successfully"});
            else return res.status(500).json({ error : "internal server error"})
          });
    })
  
export { planets };

/**
 * @swagger
 * tags:
 *   name: Planets
 *   description: API endpoints for managing planets
 */

/**
 * @swagger
 * /planets:
 *   get:
 *     summary: Get all planets
 *     tags: [Planets]
 *     responses:
 *       200:
 *         description: Successful response with the list of planets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Planet'
 *       500:
 *         description: Internal server error
 */
 /**
     * @swagger
     * /planets:
     *   post:
     *     summary: Create a new planet
     *     tags: [Planets]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Planet'
     *     responses:
     *       200:
     *         description: Planet created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Planet'
     *       500:
     *         description: Internal server error
     */
 /**
     * @swagger
     * /planets/{pk}:
     *   get:
     *     summary: Get a planet by primary key
     *     tags: [Planets]
     *     parameters:
     *       - in: path
     *         name: pk
     *         schema:
     *           type: string
     *         required: true
     *         description: The primary key of the planet
     *     responses:
     *       200:
     *         description: Successful response with the planet details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Planet'
     *       500:
     *         description: Internal server error
     */
    /**
 * @swagger
 * /planets/{pk}:
 *   put:
 *     summary: Update a planet by primary key
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: string
 *         required: true
 *         description: The primary key of the planet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: Planet updated successfully
 *       404:
 *         description: Planet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
 /**
     * @swagger
     * /planets/{pk}:
     *   delete:
     *     summary: Delete a planet by primary key
     *     tags: [Planets]
     *     parameters:
     *       - in: path
     *         name: pk
     *         schema:
     *           type: string
     *         required: true
     *         description: The primary key of the planet
     *     responses:
     *       200:
     *         description: Planet deleted successfully
     *       500:
     *         description: Internal server error
     */
    /**
 * @swagger
 * components:
 *   schemas:
 *     Planets:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             edited:
 *               type: string
 *             climate:
 *               type: string
 *             surface_water:
 *               type: string
 *             name:
 *               type: string
 *             diameter:
 *               type: number
 *             rotation_period:
 *               type: number
 *             created:
 *               type: string
 *             terrain:
 *               type: string
 *             gravity:
 *               type: string
 *             orbital_period:
 *               type: number
 *             population:
 *               type: string
 *         pk:
 *           type: number
 *         model:
 *           type: string
 *       required:
 *         - fields
 *         - pk
 *         - model
 */