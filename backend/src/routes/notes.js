const { Router } = require('express');
const router = Router();

const { getNotes, createNote, getNote, deleteNote, updateNote} = require('../controllers/notes.controller');

router.get('/', getNotes);

router.post('/',createNote);

router.get('/:id',getNote);

router.delete('/:id',deleteNote);

router.put('/:id',updateNote);

module.exports = router;