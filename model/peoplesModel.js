import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const PeoplesSchema = new Schema(
    {
    fields: {
        edited: {type: String, required: false},
        name: {type: String, required: false},
        created: {type: String, required: false},
        gender: {type: String, required: false},
        skin_colors: {type: String, required: false},
        hair_colors: {type: String, required: false},
        height: {type: Number, required: false},
        eye_colors: {type: String, required: false},
        mass: {type: Number, required: false},
        homeworld: Number,
        birth_year: {type: String, required: false}
    },
    pk: {type: Number, required: false},
    model: {type: String, required: false}
    }
);

const Peoples = mongoose.model('Peoples', PeoplesSchema, 'peoples');

export default Peoples