import bodyParser from "body-parser";
import express from "express"

const app = express();
app.use(bodyParser.json());

//Get Request
app.get('/', (req,res) => {
    res.send('Successfully send message')
})

//port configure
app.listen(5000, (req,res) => {
    console.log('Server is run on PORT 5000')
})