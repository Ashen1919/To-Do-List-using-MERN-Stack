import express from 'express';
import { createNote } from '../controllers/noteController.js';
import { authenticateToken } from '../index.js';

const noteRouter = express.Router();

noteRouter.post('/',authenticateToken, createNote);

export default noteRouter