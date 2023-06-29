import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StarshipsSchema = new Schema(
    {
        fields: {
            pilots: [],
            MGLT: {type: String, required: false},
            starship_class: {type: String, required: false},
            hyperdrive_rating: {type: Number, required: false}
        },
        model: {type: String, required: false},
        pk: {type: Number, required: true}
    }
);

const Starships = mongoose.model('Starships', StarshipsSchema, 'starships');

export default Starships;