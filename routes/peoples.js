import express from 'express';
var peoples = express.Router();
import Peoples from '../model/peoplesModel.js'

peoples.route('/')
    .get(async (req, res) => {
        const peoples = await Peoples.find();
        if(!err)res.status(200).send(peoples);
            else json({ error : "internal server error"})
    })
    .post(async (req, res) => {
        const peoples = new Peoples({
            fields : {...req.body},
            model : 'resources.peoples',
            pk : (new Date).getTime()
        });
        peoples.save((err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })

    peoples.route('/:pk')
    .get(async (req, res) => {
        Peoples.findOne(req.params, (err, docs) => {
            if(!err)res.status(200).send(docs);
            else json({ error : "internal server error"})
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPeople = await Peoples.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPeople) {
                return res.status(404).json({ error: "People not found" });
            }

            return res.status(200).json({ message: "People updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Peoples.deleteOne(req.params, (err, docs) => {
            if(!err)res.status(200).json({ message: "People deleted successfully"});
            else json({ error : "internal server error"})
          });
    })
  
export { peoples };