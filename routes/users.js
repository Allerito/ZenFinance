const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.route('/:username')
    .get(userController.getUserByUsername, userController.getUser)
    .patch(userController.getUserByUsername, userController.updateUser)
    .delete(userController.getUserByUsername, userController.deleteUser);

module.exports = router;