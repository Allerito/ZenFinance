const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.route('/:id')
    .get(userController.getUserById, userController.getUser)
    .patch(userController.getUserById, userController.updateUser)
    .delete(userController.getUserById, userController.deleteUser);

router.get('/:id/:wallet', userController.getUserById, userController.getUserWallet);

module.exports = router;