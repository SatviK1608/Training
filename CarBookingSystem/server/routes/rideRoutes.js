const express = require('express');
const { createRide, getRides, updateRide, deleteRide,bookRide ,yourRide,cancelRide,yourCar} = require('../controllers/rideController');
const router = express.Router();
// const { authenticateUser } = require('../middleware/authMiddleware');


router.post('/', createRide);
router.get('/', getRides);
router.get('/yourRide/:user_id',yourRide)
router.put('/updateRide', updateRide); 
router.delete('/deleteRide', deleteRide);
router.post('/book', bookRide);
router.delete('/cancelRide',cancelRide)
router.get('/yourCar/:user_id',yourCar)
module.exports = router;
