const { Router } = require('express');
const router = Router();

const { checkLogin, createUser, deleteUser} = require('../controllers/users.controller');

router.post('/:username', checkLogin);

router.post('/',createUser);

router.delete('/:id',deleteUser);


module.exports = router;