import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const FilmSchema = new Schema(
    {
    fields: {
        starships: [],
        edited: {type: String, required: false},
        vehicles: [],
        planets: [],
        producer: {type: String, required: false},
        title: {type: String, required: false},
        created: {type: String, required: false},
        episode_id: {type: Number, required: false},
        director: {type: String, required: false},
        release_date: {type: String, required: false},
        opening_crawl: {type: String, required: false},
        characters: [],
        species: []
    },
    pk: {type: Number, required: false},
    model: {type: String, required: false}
    }
);

const Film = mongoose.model('Film', FilmSchema, 'films');

export default Film