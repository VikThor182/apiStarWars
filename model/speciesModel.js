import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SpeciesSchema = new Schema(
    {
        fields: {
            edited: {type: String, required: false},
            classification: {type: String, required: false},
            name: {type: String, required: false},
            designation: {type: String, required: false},
            created: {type: String, required: false},
            eye_colors: {type: String, required: false},
            people: [],
            skin_colors: {type: String, required: false},
            language: {type: String, required: false},
            hair_colors: {type: String, required: false},
            homeworld: Number,
            average_lifespan: {type: String, required: false},
            average_height: {type: String, required: false}
        },
        model: {type: String, required: false},
        pk: Number
    }
);

const Species = mongoose.model('Species', SpeciesSchema, 'species');

export default Species