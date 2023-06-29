import express from 'express';
var planets = express.Router();
import Planets from '../model/planetsModel.js'

planets.route('/')
    .get(async (req, res) => {
        const planets = await Planets.find();
        return res.status(200).json(planets);
    })
    .post(async (req, res) => {
        const planets = new Planets({
            fields : {...req.body},
            model : 'resources.planets',
            pk : (new Date).getTime()
        });
        console.log(planets)
        planets.save((err, docs) => {
            console.log(planets);
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    planets.route('/:pk')
    .get(async (req, res) => {
        Planets.findOne(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find planet');
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
            if(!err) console.log('planet deleted');
            else console.log('Can\'t delete planet');
          });
    })
  
export { planets };