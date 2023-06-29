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