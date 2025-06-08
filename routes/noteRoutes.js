import express from 'express';
import { createNote, getNotes } from '../controllers/noteController.js';
import { authenticateToken } from '../index.js';

const noteRouter = express.Router();

noteRouter.post('/',authenticateToken, createNote);
noteRouter.get('/', getNotes);

export default noteRouter