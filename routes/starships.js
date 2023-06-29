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