const express = require('express');
const { createRide, getRides, updateRide, deleteRide,bookRide } = require('../controllers/rideController');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');


router.post('/', createRide);
router.get('/', getRides);
router.put('/:id', updateRide);
router.delete('/:id', deleteRide);
router.post('/book', bookRide);
module.exports = router;
