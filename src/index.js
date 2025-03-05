import dotenv from 'dotenv'; // ✅ Import dotenv first
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';

dotenv.config({ path: './.env' }); // ✅ Correct path

connectDB();



// approach --  1
// import express from 'express';


// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error", (error)=>{
//                 console.log("Error",error);
//                 throw error
//             })
//             app.listen(process.env.PORT, () => {
//                 console.log(`Server running on port ${process.env.PORT}`);
//             });

//         console.log('MongoDB connected');
//     } catch (error) {     
//         console.error("ERROR",error);
//     }
// })();