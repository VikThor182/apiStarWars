import express from 'express';
var peoples = express.Router();
import Peoples from '../model/peoplesModel.js'

peoples.route('/')
    .get(async (req, res) => {
        const peoples = await Peoples.find();
        if(!err)res.status(200).send(peoples);
            else json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const peoples = new Peoples({
            fields : {...req.body},
            model : 'resources.peoples',
            pk : (new Date).getTime()
        });
        peoples.save((err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })

    peoples.route('/:pk')
    .get(async (req, res) => {
        Peoples.findOne(req.params, (err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPeople = await Peoples.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPeople) {
                return res.status(404).json({ error: "People not found" });
            }

            return res.status(200).json({ message: "People updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Peoples.deleteOne(req.params, (err, docs) => {
            if(!err)res.status(200).json({ message: "People deleted successfully"});
            else json({ error : "internal server error"})
          });
    })
  
export { peoples };

/**
 * @swagger
 * tags:
 *   name: Peoples
 *   description: API endpoints for managing peoples
 */

/**
 * @swagger
 * /peoples:
 *   get:
 *     summary: Get all peoples
 *     tags: [Peoples]
 *     responses:
 *       200:
 *         description: Successful response with the list of peoples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/People'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /peoples:
 *   post:
 *     summary: Create a new people
 *     tags: [Peoples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/People'
 *     responses:
 *       200:
 *         description: People created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PeopleResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /peoples/{pk}:
 *   get:
 *     summary: Get a people by primary key
 *     tags: [Peoples]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: string
 *         required: true
 *         description: The primary key of the people
 *     responses:
 *       200:
 *         description: Successful response with the people details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PeopleResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /peoples/{pk}:
 *   put:
 *     summary: Update a people by primary key
 *     tags: [Peoples]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: string
 *         required: true
 *         description: The primary key of the people
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/People'
 *     responses:
 *       200:
 *         description: People updated successfully
 *       404:
 *         description: People not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /peoples/{pk}:
 *   delete:
 *     summary: Delete a people by primary key
 *     tags: [Peoples]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: string
 *         required: true
 *         description: The primary key of the people
 *     responses:
 *       200:
 *         description: People deleted successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Peoples:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             edited:
 *               type: string
 *             name:
 *               type: string
 *             created:
 *               type: string
 *             gender:
 *               type: string
 *             skin_colors:
 *               type: string
 *             hair_colors:
 *               type: string
 *             height:
 *               type: number
 *             eye_colors:
 *               type: string
 *             mass:
 *               type: number
 *             homeworld:
 *               type: number
 *             birth_year:
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