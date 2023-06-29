import express from 'express';
var starships = express.Router();
import Starships from '../model/starshipsModel.js'

starships.route('/')
    .get(async (req, res) => {
        const starships = await Starships.find();
        return res.status(200).json(starships);
    })
    .post(async (req, res) => {
        const starships = new Starships({
            fields : {...req.body},
            model : 'resources.starships',
            pk : (new Date).getTime()
        });
        console.log(starships)
        starships.save((err, docs) => {
            console.log(starships);
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    starships.route('/:_id')
    .get(async (req, res) => {
        Starships.findById(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find starship');
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
            if(!err) console.log('starship deleted');
            else console.log('Can\'t delete starship');
          });
    })
  
export { starships };