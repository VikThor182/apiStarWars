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