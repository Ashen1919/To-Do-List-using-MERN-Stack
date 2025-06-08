import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import jwt from 'jsonwebtoken';
import noteRouter from "./routes/noteRoutes.js";

//Authenticating
export function authenticateToken(req,res,next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Token is required"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err){
            return res.status(403).json({
                message: "Invalid or expired Token"
            })
        }
        req.body.user = user;
        next();
    })
}

//configure dotenv
dotenv.config();

const app = express();
app.use(bodyParser.json());

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
app.listen(5000, (req,res) => {
    console.log('Server is run on PORT 5000')
})