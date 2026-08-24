import express from "express";
import {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    patchNote,
    deleteNote,
} from "../controllers/notesController.js";
const router = express.Router();

router.get('/', getNotes);

router.post('/', createNote);

router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.patch('/:id', patchNote);
router.delete('/:id', deleteNote);

export default router;