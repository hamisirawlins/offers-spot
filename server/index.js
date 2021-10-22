import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';

const app = express();


app.use(cors());
app.use('/posts',postRoutes);
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));

const CONNECTION_URL = 'mongodb+srv://javascript125:javascript125@cluster0.pjtof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5678;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is up on Port: ${PORT}`)))
    .catch((error)=>console.log(error.message));
 