import express from 'express';
var planets = express.Router();
import Planets from '../model/planetsModel.js'

planets.route('/')
    .get(async (req, res) => {
        const planets = await Planets.find();
        if(!err) return res.status(200).send(planets);
        else return res.status.json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const planets = new Planets({
            fields : {...req.body},
            model : 'resources.planets',
            pk : (new Date).getTime()
        });
        planets.save((err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })

    planets.route('/:pk')
    .get(async (req, res) => {
        Planets.findOne(req.params, (err, docs) => {
            if(!err) return res.status(200).send(docs);
            else return res.status(500).json({ error : "internal server error"});
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPlanet = await Planets.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPlanet) {
                return res.status(404).json({ error: "Planet not found" });
            }

            return res.status(200).json({ message: "Planet updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Planets.deleteOne(req.params, (err, docs) => {
            if(!err)res.status(200).json({message: "Planet deleted successfully"});
            else return res.status(500).json({ error : "internal server error"})
          });
    })
  
export { planets };