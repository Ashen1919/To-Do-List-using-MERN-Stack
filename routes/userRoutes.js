import express from "express"
import { findByEmail, getUsers, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/signup', signupUser)
router.get('/', getUsers)
router.get('/:email', findByEmail)

export default router;