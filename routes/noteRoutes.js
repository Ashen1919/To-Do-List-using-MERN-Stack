import express from 'express';
import { createNote, getNotes, getNotesByEmail } from '../controllers/noteController.js';
import { authenticateToken } from '../index.js';

const noteRouter = express.Router();

noteRouter.post('/',authenticateToken, createNote);
noteRouter.get('/', getNotes);
noteRouter.get('/:email', getNotesByEmail);

export default noteRouter