import express from 'express';
var films = express.Router();
import Film from '../model/filmModel.js'

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
 *                 $ref: '#/model/filmModel'
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           model:
 *             $ref: '#/model/filmModel'
 *     responses:
 *       200:
 *         description: Film created successfully
 *         content:
 *           application/json:
 *             model:
 *               $ref: '#/model/filmModel'
 *       500:
 *         description: Internal server error
 */
films.route('/')
    .get(async (req, res) => {
        const films = await Film.find();
        if (films) return res.status(200).json(films)
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