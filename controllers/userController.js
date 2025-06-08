import brcypt from "bcrypt";
import User from '../models/user.js';

//Create an user
export function signupUser(req,res){
    const {email, firstName, lastName, password} = req.body

    //Hash the password
    const saltRounds = 10;
    const hashedPassword = brcypt.hashSync(password, saltRounds);

    //create new user
    const newUser = new User({
        email,
        firstName,
        lastName,
        password : hashedPassword
    });

    newUser.save().then(() => {
        res.status(200).json({
            message: "User created successfully"
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Fail to create an user",
            error: error.message
        })
    })
}