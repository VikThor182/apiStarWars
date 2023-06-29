import express from 'express';
var films = express.Router();
import Film from '../model/filmModel.js'

films.route('/')
    .get(async (req, res) => {
        const films = await Film.find();
        return res.status(200).json(films);
    })
    .post(async (req, res) => {
        const films = new Film({
            fields : {...req.body},
            model : 'resources.films',
            pk : (new Date).getTime()
        });
        console.log(films)
        films.save((err, docs) => {
            console.log(films);
            if(!err) res.send(docs);
              else console.log("Can't reach data "+ err)
          });
    })

    films.route('/:pk')
    .get(async (req, res) => {
        Film.findOne(req.params, (err, docs) => {
            if(!err)res.send(docs);
            else console.log('can\'t find film');
          });
    })
    .put(async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedFilm = await Film.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedFilm) {
                return res.status(404).json({ error: "Film not found" });
            }

            return res.status(200).json({ message: "Film updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(async (req, res) => {
        Film.deleteOne(req.params, (err, docs) => {
            if(!err) console.log('film deleted');
            else console.log('Can\'t delete film');
          });
    })
  
export { films };