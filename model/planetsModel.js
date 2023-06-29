import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const PlanetsSchema = new Schema(
    {
    fields: {
        edited: {type: String, required: false},
        climate: {type: String, required: false},
        surface_water: {type: String, required: false},
        name: {type: String, required: false},
        diameter: {type: Number, required: false},
        rotation_period:{type: Number, required: false},
        created: {type: String, required: false},
        terrain: {type: String, required: false},
        gravity: {type: String, required: false},
        orbital_period: {type: Number, required: false},
        population: {type: String, required: false}
    },
    pk: {type: Number, required: false},
    model: {type: String, required: false}
    }
);

const Planets = mongoose.model('Planets', PlanetsSchema, 'planets');

export default Planets