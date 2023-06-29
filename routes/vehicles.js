import express from 'express';
var vehicles = express.Router();
import Vehicles from '../model/vehiclesModel.js'

vehicles.route('/')
    .get(async (req, res) => {
        const vehicles = await Vehicles.find();
        return res.status(200).json(vehicles);
    })
    .post(async (req, res) => {
        const vehicles = new Vehicles({
            fields : {...req.body},
            model : 'resources.vehicles',
            pk : (new Date).getTime()
        });
        vehicles.save((err, docs) => {
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    vehicles.route('/:pk')
    .get(async (req, res) => {
        Vehicles.findOne(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find Vehicles');
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
            if(!err) console.log('Vehicles deleted');
            else console.log('Can\'t delete Vehicles');
          });
    })
  
export { vehicles };