import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const VehiclesSchema = new Schema(
    {
        fields: {
            vehicle_class: {type: String, required: false},
            pilots: []
        },
        pk: {type: Number, required: false},
        model: {type: String, required: false}
    }
);

const Vehicles = mongoose.model('Vehicles', VehiclesSchema, 'vehicles');

export default Vehicles