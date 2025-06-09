import express from 'express';
import { createNote, deleteNotes, getNotes, getNotesByEmail, updateNotes } from '../controllers/noteController.js';
import { authenticateToken } from '../index.js';

const noteRouter = express.Router();

noteRouter.post('/',authenticateToken, createNote);
noteRouter.get('/', getNotes);
noteRouter.get('/:email',authenticateToken, getNotesByEmail);
noteRouter.put('/:noteID',authenticateToken, updateNotes);
noteRouter.delete('/:noteID',authenticateToken, deleteNotes);

export default noteRouter