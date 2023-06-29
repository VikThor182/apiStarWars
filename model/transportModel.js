import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const TransportsSchema = new Schema(
    {
    fields: {
        edited: {type: String, required: false},
        consumables: {type: String, required: false},
        name: {type: String, required: false},
        created: {type: String, required: false},
        cargo_capacity: {type: Number, required: false},
        passengers: {type: Number, required: false},
        max_atmosphering_speed: {type: Number, required: false},
        crew: {type: String, required: false},
        length: {type: Number, required: false},
        model: {type: String, required: false},
        cost_in_credits: {type: Number, required: false},
        manufacturer: {type: String, required: false},
    },
    pk: {type: Number, required: false},
    model: {type: String, required: false}
    }
);

const Transports = mongoose.model('Transports', TransportsSchema, 'transports');

export default Transports