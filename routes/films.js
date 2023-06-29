import express from 'express';
var films = express.Router();
import Film from '../model/filmModel.js'

films.route('/')
    .get(async (req, res) => {
        const films = await Film.find();
        if (films) res.status(200).json(films)
        else return res.status(500)
    })
    .post(async (req, res) => {
        const films = new Film({
            fields : {...req.body},
            model : 'resources.films',
            pk : (new Date).getTime()
        });
        films.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    films.route('/:pk')
    .get(async (req, res) => {
        Film.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedFilm = await Film.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedFilm) {
                return res.status(404).json({ error: "Film not found" });
            }

            return res.status(200).json({ message: "Film updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Film.deleteOne(req.params, (err, docs) => {
            if(!err) return res.status(200).json({message : "Film deleted successfully"});
            else return res.status(500).json({ error : "internal server error"});
          });
    })
  
export { films };

/**
 * @swagger
 * tags:
 *   name: Films
 *   description: API endpoints for managing films
 */

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Successful response with the list of films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       500:
 *         description: Internal server error
 */
 /**
     * @swagger
     * /films:
     *   post:
     *     summary: Create a new film
     *     tags: [Films]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Film'
     *     responses:
     *       200:
     *         description: Film created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Film'
     *       500:
     *         description: Internal server error
     */
 /**
     * @swagger
     * /films/{pk}:
     *   get:
     *     summary: Get a film by primary key
     *     tags: [Films]
     *     parameters:
     *       - in: path
     *         name: pk
     *         schema:
     *           type: string
     *         required: true
     *         description: The primary key of the film
     *     responses:
     *       200:
     *         description: Successful response with the film details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Film'
     *       500:
     *         description: Internal server error
     */
    /**
 * @swagger
 * /films/{pk}:
 *   put:
 *     summary: Update a film by primary key
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: string
 *         required: true
 *         description: The primary key of the film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Film updated successfully
 *       404:
 *         description: Film not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
 /**
     * @swagger
     * /films/{pk}:
     *   delete:
     *     summary: Delete a film by primary key
     *     tags: [Films]
     *     parameters:
     *       - in: path
     *         name: pk
     *         schema:
     *           type: string
     *         required: true
     *         description: The primary key of the film
     *     responses:
     *       200:
     *         description: Film deleted successfully
     *       500:
     *         description: Internal server error
     */
/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             starships:
 *               type: array
 *               items:
 *                 type: string
 *             edited:
 *               type: string
 *             vehicles:
 *               type: array
 *               items:
 *                 type: string
 *             planets:
 *               type: array
 *               items:
 *                 type: string
 *             producer:
 *               type: string
 *             title:
 *               type: string
 *             created:
 *               type: string
 *             episode_id:
 *               type: number
 *             director:
 *               type: string
 *             release_date:
 *               type: string
 *             opening_crawl:
 *               type: string
 *             characters:
 *               type: array
 *               items:
 *                 type: string
 *             species:
 *               type: array
 *               items:
 *                 type: string
 *         pk:
 *           type: number
 *         model:
 *           type: string
 */


