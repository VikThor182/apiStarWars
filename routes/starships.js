import express from 'express';
var starships = express.Router();
import Starships from '../model/starshipsModel.js'

starships.route('/')
    .get(async (req, res) => {
        const starships = await Starships.find();
        if(!err) return res.status(200).send(starships);
        else return res.status(500).json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const starships = new Starships({
            fields : {...req.body},
            model : 'resources.starships',
            pk : (new Date).getTime()
        });
        starships.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    starships.route('/:pk')
    .get(async (req, res) => {
        Starships.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedStarship = await Starships.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedStarship) {
                return res.status(404).json({ error: "Starship not found" });
            }

            return res.status(200).json({ message: "Starship updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Starships.deleteOne(req.params, (err, docs) => {
            if(!err) return res.status(200).json({ message : "Starship deleted successfully"});
            else return res.status(500).json({ error : "internal server error"});
          });
    })
  
export { starships };

/**
 * @swagger
 * tags:
 *   name: Starships
 *   description: Routes for managing starships
 */

/**
     * @swagger
     * /starships:
     *   get:
     *     tags: [Starships]
     *     summary: Récupère tous les vaisseaux spatiaux.
     *     responses:
     *       200:
     *         description: Succès de la requête avec les vaisseaux spatiaux récupérés.
     *       500:
     *         description: Erreur interne du serveur.
     *   post:
     *     tags: [Starships]
     *     summary: Crée un nouveau vaisseau spatial.
     *     requestBody:
     *       description: Données du vaisseau spatial à créer.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Starship'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le vaisseau spatial créé.
     *       500:
     *         description: Erreur interne du serveur.
     */
    /**
     * @swagger
     * /starships/{pk}:
     *   get:
     *     tags: [Starships]
     *     summary: Récupère un vaisseau spatial par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du vaisseau spatial à récupérer.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Succès de la requête avec le vaisseau spatial récupéré.
     *       500:
     *         description: Erreur interne du serveur.
     *   put:
     *     tags: [Starships]
     *     summary: Met à jour un vaisseau spatial par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du vaisseau spatial à mettre à jour.
     *         schema:
     *           type: string
     *     requestBody:
     *       description: Données mises à jour du vaisseau spatial.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Starship'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le vaisseau spatial mis à jour.
     *       404:
     *         description: Vaisseau spatial non trouvé.
     *       500:
     *         description: Erreur interne du serveur.
     *   delete:
     *     tags: [Starships]
     *     summary: Supprime un vaisseau spatial par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du vaisseau spatial à supprimer.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Succès de la requête avec un message de suppression réussie.
     *       500:
     *         description: Erreur interne du serveur.
     */
    /**
 * @swagger
 * components:
 *   schemas:
 *     Starships:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             pilots:
 *               type: array
 *               items:
 *                 type: string
 *               description: Liste des pilotes associés au vaisseau spatial.
 *             MGLT:
 *               type: string
 *               description: Vitesse maximale de voyage dans l'espace du vaisseau.
 *             starship_class:
 *               type: string
 *               description: Classe du vaisseau spatial.
 *             hyperdrive_rating:
 *               type: number
 *               description: Cote d'hyperdrive du vaisseau spatial.
 *           required:
 *             - pilots
 *             - MGLT
 *             - starship_class
 *             - hyperdrive_rating
 *         model:
 *           type: string
 *           description: Modèle du vaisseau spatial.
 *         pk:
 *           type: number
 *           description: Clé primaire du vaisseau spatial.
 */