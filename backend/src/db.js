import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults'


dotenv.config();


export default{
    connent: () => {
        mongoose.connect(
            process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const db = mongoose.connection;
        db.on("error", (err) => console.log('connection error',err));
        db.once('open', function () {
            console.log('mongo connected!');
          });

     }

}