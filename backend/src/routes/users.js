const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser} = require('../controllers/users.controller');

router.get('/', getUsers);

router.post('/',createUser);

router.delete('/:id',deleteUser);


module.exports = router;