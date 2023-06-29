import express from 'express';
var transports = express.Router();
import Transports from '../model/transportModel.js'

transports.route('/')
    .get(async (req, res) => {
        const transports = await Transports.find();
        return res.status(200).json(transports);
    })
    .post(async (req, res) => {
        const transports = new Transports({
            fields : {...req.body},
            model : 'resources.transports',
            pk : (new Date).getTime()
        });
        console.log(transports)
        transports.save((err, docs) => {
            console.log(transports);
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    transports.route('/:pk')
    .get(async (req, res) => {
        Transports.findById(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find transports');
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
            if(!err) console.log('transports deleted');
            else console.log('Can\'t delete transports');
          });
    })
  
export { transports };