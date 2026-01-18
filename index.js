import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import cors from "cors";

//configure dotenv
dotenv.config();

const app = express();
app.use(bodyParser.json());

//config cors
app.use(cors());

//Get Request
app.get('/', (req,res) => {
    res.send('Successfully send message')
})

//Routes configuration
app.use("/api/users", userRoutes)
app.use("/api/notes", noteRouter)

//database connection
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl).then(()=> {
    console.log('Database connected successfully')
}).catch(() => {
    console.log('Database connection failure')
})

//port configure
app.listen(5000, () => {
    console.log('Server is run on PORT 5000')
})