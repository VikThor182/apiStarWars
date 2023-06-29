import express from 'express';
var species = express.Router();
import Species from '../model/speciesModel.js'

species.route('/')
    .get(async (req, res) => {
        const species = await Species.find();
        if(!err)res.status(200).send(docs);
        else json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const species = new Species({
            fields : {...req.body},
            model : 'resources.species',
            pk : (new Date).getTime()
        });
        species.save((err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })

    species.route('/:pk')
    .get(async (req, res) => {
        Species.findOne(req.params, (err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedSpecie = await Species.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedSpecie) {
                return res.status(404).json({ error: "Specie not found" });
            }

            return res.status(200).json({ message: "Specie updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Species.deleteOne(req.params, (err, docs) => {
            if(!err)res.status(200).json({message: "Specie successfully deleted."})
            else json({ error : "internal server error"})
          });
    })
  
export { species };

/**
 * @swagger
 * tags:
 *   name: Species
 *   description: Routes for managing species
 */

/**
 * @swagger
 * /species:
 *   get:
 *     summary: Get all species
 *     tags: [Species]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SpeciesResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     summary: Create a new species
 *     tags: [Species]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpeciesResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /species/{pk}:
 *   get:
 *     summary: Get a species by its primary key
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: integer
 *         required: true
 *         description: Primary key of the species
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpeciesResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Update a species by its primary key
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: integer
 *         required: true
 *         description: Primary key of the species
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Specie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete a species by its primary key
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: pk
 *         schema:
 *           type: integer
 *         required: true
 *         description: Primary key of the species
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Species:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             edited:
 *               type: string
 *               description: Date de la dernière édition de l'espèce.
 *             classification:
 *               type: string
 *               description: Classification de l'espèce.
 *             name:
 *               type: string
 *               description: Nom de l'espèce.
 *             designation:
 *               type: string
 *               description: Désignation de l'espèce.
 *             created:
 *               type: string
 *               description: Date de création de l'espèce.
 *             eye_colors:
 *               type: string
 *               description: Couleurs des yeux de l'espèce.
 *             people:
 *               type: array
 *               items:
 *                 type: string
 *               description: Liste des personnages associés à l'espèce.
 *             skin_colors:
 *               type: string
 *               description: Couleurs de peau de l'espèce.
 *             language:
 *               type: string
 *               description: Langue parlée par l'espèce.
 *             hair_colors:
 *               type: string
 *               description: Couleurs de cheveux de l'espèce.
 *             homeworld:
 *               type: number
 *               description: Identifiant du monde d'origine de l'espèce.
 *             average_lifespan:
 *               type: string
 *               description: Espérance de vie moyenne de l'espèce.
 *             average_height:
 *               type: string
 *               description: Hauteur moyenne de l'espèce.
 *           required:
 *             - edited
 *             - classification
 *             - name
 *             - designation
 *             - created
 *             - eye_colors
 *             - skin_colors
 *             - language
 *             - hair_colors
 *             - homeworld
 *             - average_lifespan
 *             - average_height
 *         model:
 *           type: string
 *           description: Modèle de l'espèce.
 *         pk:
 *           type: number
 *           description: Clé primaire de l'espèce.
 */