import express from 'express';
var transports = express.Router();
import Transports from '../model/transportModel.js'

transports.route('/')
    .get(async (req, res) => {
        const transports = await Transports.find();
        if(!err) return res.status(200).send(transports);
            else return res.status(500).json({ error : "internal server error"});
    })
    .post(async (req, res) => {
        const transports = new Transports({
            fields : {...req.body},
            model : 'resources.transports',
            pk : (new Date).getTime()
        });
        transports.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    transports.route('/:pk')
    .get(async (req, res) => {
        Transports.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedTransport = await Transports.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedTransport) {
                return res.status(404).json({ error: "Transport not found" });
            }

            return res.status(200).json({ message: "Transport updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Transports.deleteOne(req.params, (err, docs) => {
            if(!err) return res.status(200).json({message : "Transport delete successfully"});
            else return res.status(500).json({ error : "internal server error"});
          });
    })
  
export { transports };

/**
 * @swagger
 * tags:
 *   name: Transports
 *   description: Routes for managing transports
 */
/**
     * @swagger
     * /transports:
     *   get:
     *     tags: [Transports]
     *     summary: Récupère tous les transports.
     *     responses:
     *       200:
     *         description: Succès de la requête avec les transports récupérés.
     *       500:
     *         description: Erreur interne du serveur.
     *   post:
     *     tags: [Transports]
     *     summary: Crée un nouveau transport.
     *     requestBody:
     *       description: Données du transport à créer.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Transport'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le transport créé.
     *       500:
     *         description: Erreur interne du serveur.
     */
    /**
     * @swagger
     * /transports/{pk}:
     *   get:
     *     tags: [Transports]
     *     summary: Récupère un transport par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du transport à récupérer.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Succès de la requête avec le transport récupéré.
     *       500:
     *         description: Erreur interne du serveur.
     *   put:
     *     tags: [Transports]
     *     summary: Met à jour un transport par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du transport à mettre à jour.
     *         schema:
     *           type: string
     *     requestBody:
     *       description: Données mises à jour du transport.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Transport'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le transport mis à jour.
     *       404:
     *         description: Transport non trouvé.
     *       500:
     *         description: Erreur interne du serveur.
     *   delete:
     *     tags: [Transports]
     *     summary: Supprime un transport par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du transport à supprimer.
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
 *     Transports:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             edited:
 *               type: string
 *               description: Date de la dernière édition du transport.
 *             consumables:
 *               type: string
 *               description: Durée d'autonomie des consommables du transport.
 *             name:
 *               type: string
 *               description: Nom du transport.
 *             created:
 *               type: string
 *               description: Date de création du transport.
 *             cargo_capacity:
 *               type: number
 *               description: Capacité de cargaison du transport.
 *             passengers:
 *               type: number
 *               description: Nombre de passagers pouvant être transportés.
 *             max_atmosphering_speed:
 *               type: number
 *               description: Vitesse maximale en atmosphère du transport.
 *             crew:
 *               type: string
 *               description: Équipage du transport.
 *             length:
 *               type: number
 *               description: Longueur du transport.
 *             model:
 *               type: string
 *               description: Modèle du transport.
 *             cost_in_credits:
 *               type: number
 *               description: Coût en crédits du transport.
 *             manufacturer:
 *               type: string
 *               description: Fabricant du transport.
 *           required:
 *             - edited
 *             - consumables
 *             - name
 *             - created
 *             - cargo_capacity
 *             - passengers
 *             - max_atmosphering_speed
 *             - crew
 *             - length
 *             - model
 *             - cost_in_credits
 *             - manufacturer
 *         pk:
 *           type: number
 *           description: Clé primaire du transport.
 *         model:
 *           type: string
 *           description: Modèle du transport.
 */