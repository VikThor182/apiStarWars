import mongoose from "mongoose";

const url = 'mongodb+srv://vikthor182:5wyPO4FPZd8@cluster0.8ckqtbw.mongodb.net/?retryWrites=true&w=majority';


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    })