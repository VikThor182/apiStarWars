import express from 'express';
var species = express.Router();
import Species from '../model/speciesModel.js'

species.route('/')
    .get(async (req, res) => {
        const species = await Species.find();
        return res.status(200).json(species);
    })
    .post(async (req, res) => {
        const species = new Species({
            fields : {...req.body},
            model : 'resources.species',
            pk : (new Date).getTime()
        });
        species.save((err, docs) => {
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    species.route('/:pk')
    .get(async (req, res) => {
        Species.findOne(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find specie');
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
            if(!err) console.log('specie deleted');
            else console.log('Can\'t delete specie');
          });
    })
  
export { species };