import brcypt from "bcrypt";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

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

//get all users
export function getUsers(req,res){
    User.find().then((userList) => {
        res.status(200).json({
            message: "Users found successful",
            users: userList
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message
        })
    })
}

//get one user
export function findByEmail(req,res){
    const email = req.params.email
    User.findOne({email:email}).then((result) => {
        if(result == null){
            res.status(404).json({
                message: "User Not Found"
            })
        } else{
            res.status(200).json({
                message: "User Found",
                user: result
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: "Fail to retrieve users",
            error: error.message
        })
    })
}

//Log-in user
export function loginUser(req,res){
    const credential = req.body
    User.findOne({email: credential.email}).then((user) => {
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
        } else{
            const isValidPassword = brcypt.compareSync(credential.password, user.password)
            if(!isValidPassword){
                res.status(403).json({
                    message: "Invalid password"
                })
            } else{
                try{
                    const payload = {
                    id: user.__id,
                    email: user.email,
                    firstName : user.firstName,
                    lastName : user.lastName
                    };
                    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "48h"});
                    res.status(200).json({
                        message: "Successfully Loged In",
                        user: user,
                        token: token
                    })
                } catch(error){
                    res.status(500).json({
                        error: error.message
                    })
                }
            }
        }
    })
}