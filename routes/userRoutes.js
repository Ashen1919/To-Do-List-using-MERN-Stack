import express from "express"
import { findByEmail, getUsers, loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/signup', signupUser)
router.get('/', getUsers)
router.get('/:email', findByEmail)
router.post('/login', loginUser)

export default router;