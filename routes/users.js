const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.userLogin);
router.post('/', userController.createUser);


router.route('/:email')
    .get(userController.getUserByEmail, userController.getUser)
    .patch(userController.getUserByEmail, userController.updateUser)
    .delete(userController.getUserByEmail, userController.deleteUser);

router.get('/:email/:wallet', userController.getUserByEmail, userController.getUserWallet);

module.exports = router;