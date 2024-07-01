const express = require('express');
const { loginUser, signupUser, getUserDetails, updateUser ,getUsers,logOut} = require('../controllers/userController');
const router = express.Router();

router.get('/',getUsers)
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/:id', getUserDetails);
router.put('/updateUser', updateUser);
router.get('/logout',logOut)

module.exports = router;
