const express = require('express');
const { loginUser, signupUser, getUserDetails, updateUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/:id', getUserDetails);
router.put('/:id', updateUser);

module.exports = router;
