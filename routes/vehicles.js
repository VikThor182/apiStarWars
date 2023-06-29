import express from 'express';
var vehicles = express.Router();
import Vehicles from '../model/vehiclesModel.js'

vehicles.route('/')
    .get(async (req, res) => {
        const vehicles = await Vehicles.find();
        if(!err) return res.status(200).send(vehicles);
            else return res.status(500).json({ error : "internal server error"});
    })
    .post(async (req, res) => {
        const vehicles = new Vehicles({
            fields : {...req.body},
            model : 'resources.vehicles',
            pk : (new Date).getTime()
        });
        vehicles.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    vehicles.route('/:pk')
    .get(async (req, res) => {
        Vehicles.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedVehicle = await Vehicles.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedVehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            return res.status(200).json({ message: "Vehicle updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Vehicles.deleteOne(req.params, (err, docs) => {
            if(!err) return res.status(200).json({message: "Vehicle deleted successfully"})
            else return res.status(500).json({ error : "internal server error"});
          });
    })
  
export { vehicles };

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Routes for managing vehicles
 */
/**
/**
     * @swagger
     * /vehicles:
     *   get:
     *     tags: [Vehicles]
     *     summary: Récupère tous les véhicules.
     *     responses:
     *       200:
     *         description: Succès de la requête avec les véhicules récupérés.
     *       500:
     *         description: Erreur interne du serveur.
     *   post:
     *     tags: [Vehicles]
     *     summary: Crée un nouveau véhicule.
     *     requestBody:
     *       description: Données du véhicule à créer.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Vehicle'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le véhicule créé.
     *       500:
     *         description: Erreur interne du serveur.
     */
    /**
     * @swagger
     * /vehicles/{pk}:
     *   get:
     *     tags: [Vehicles]
     *     summary: Récupère un véhicule par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du véhicule à récupérer.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Succès de la requête avec le véhicule récupéré.
     *       500:
     *         description: Erreur interne du serveur.
     *   put:
     *     tags: [Vehicles]
     *     summary: Met à jour un véhicule par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du véhicule à mettre à jour.
     *         schema:
     *           type: string
     *     requestBody:
     *       description: Données mises à jour du véhicule.
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Vehicle'
     *     responses:
     *       200:
     *         description: Succès de la requête avec le véhicule mis à jour.
     *       404:
     *         description: Véhicule non trouvé.
     *       500:
     *         description: Erreur interne du serveur.
     *   delete:
     *     tags: [Vehicles]
     *     summary: Supprime un véhicule par sa clé primaire.
     *     parameters:
     *       - in: path
     *         name: pk
     *         required: true
     *         description: Clé primaire du véhicule à supprimer.
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
 *     Vehicles:
 *       type: object
 *       properties:
 *         fields:
 *           type: object
 *           properties:
 *             vehicle_class:
 *               type: string
 *               description: Classe du véhicule.
 *             pilots:
 *               type: array
 *               items:
 *                 type: string
 *               description: Liste des pilotes associés au véhicule.
 *         pk:
 *           type: number
 *           description: Clé primaire du véhicule.
 *         model:
 *           type: string
 *           description: Modèle du véhicule.
 */