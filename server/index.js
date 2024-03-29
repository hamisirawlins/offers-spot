import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use('/user',userRoutes);
app.use('/posts',postRoutes);


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is up on Port: ${PORT}`)))
    .catch((error)=>console.log(error.message));
 