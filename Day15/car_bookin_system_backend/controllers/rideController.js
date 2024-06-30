const Ride = require('../models/Ride');
const User = require('../models/User');

const createRide = async (req, res) => {
  const { car_name, capacity, source, destination, fair, owner_user_id } = req.body;
  try {
    const ride = await Ride.create({ car_name, capacity, source, destination, fair, owner_user_id });
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRides = async (req, res) => {
  try {
    const rides = await Ride.findAll({ include: User });
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRide = async (req, res) => {
  const { id } = req.params;
  const { car_name, capacity, source, destination, fair } = req.body;
  try {
    const ride = await Ride.update({ car_name, capacity, source, destination, fair }, { where: { ride_id: id } });
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRide = async (req, res) => {
  const { id } = req.params;
  try {
    await User.update({ ride_id: null }, { where: { ride_id: id } });
    await Ride.destroy({ where: { ride_id: id } });
    res.json({ message: 'Ride deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const bookRide = async (req, res) => {
  const { rideId,userId } = req.body;

  try {
    const ride = await Rides.findByPk(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.capacity <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Check if user already booked a ride
    const existingRide = await ride.getUsers({ where: { id: userId } });
    if (existingRide.length > 0) {
      return res.status(400).json({ message: 'You have already booked this ride' });
    }

    await ride.addUser(userId);
    ride.capacity -= 1;
    await ride.save();

    res.status(200).json({ message: 'Ride booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking ride', error });
  }
};


module.exports = { createRide, getRides, updateRide, deleteRide,bookRide };
