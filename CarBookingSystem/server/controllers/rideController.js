const { error } = require('console');
const Ride = require('../models/Ride');
const User = require('../models/User');
const { create } = require('domain');

const createRide=async (req,res)=>{
    const {car_name,capacity,source,destination,fair,owner_user_id}=req.body;
    console.log("h")
    try{
        const user=await User.findOne({where:{user_id:owner_user_id}});
        if(await user.getRide()){
            console.log("error")
            return res.status(400).json({message:"Ride Already Exists"});
        }
        const ride = await Ride.create({ car_name, capacity, source, destination, fair, owner_user_id });
        await user.setRide(ride);
        res.json(ride)
    }catch(err){
        res.status(500).json({ error: error.message });
    }
}
const getRides=async(req,res)=>{
    try {
        const rides = await Ride.findAll({ include: User });
        res.json(rides);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
const bookRide=async(req,res)=>{
    const { ride_id,user_id } = req.body;

  try {
    const ride = await Ride.findByPk(ride_id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.capacity <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const user=await User.findOne({where:{user_id}});
    const otherRide=await user.getRide()
    if(otherRide){
        console.log("booked")
        return res.status(400).json({ message: 'You have already booked some ride' });
    }
    await ride.addUser(user);
    ride.capacity -= 1;
    await ride.save();

    res.status(200).json({ message: 'Ride booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking ride', error });
  }
};
const deleteRide=async(req,res)=>{
    const { ride_id } = req.body;
    try {
        await User.update({ ride_id: null }, { where: { ride_id } });
        await Ride.destroy({ where: { ride_id } });
        res.json({ message: 'Ride deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateRide=async(req,res)=>{
    const {id, car_name, capacity, source, destination, fair } = req.body;
  try {
    const ride = await Ride.update({ car_name, capacity, source, destination, fair }, { where: { ride_id: id } });
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const yourRide=async(req,res)=>{
    const {user_id}=req.params;
    try{
        const user=await User.findOne({where:{user_id}})
        const ride=await user.getRide() || [];   //if empty means no ride display no rides on frontend
        res.json(ride)
    }catch(err){
        res.status(500).json({ error: error.message });
    }
}

const yourCar=async (req,res)=>{
  const {user_id}=req.params;
  try{
  const ride=await Ride.findOne({where:{owner_user_id:user_id}})
  if(ride==null){
    res.json({message:"No car found"})
  }
  res.json(ride);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const cancelRide=async (req,res)=>{
    const {ride_id,user_id}=req.body;
    try{
    const ride=await Ride.findOne({where:{ride_id,owner_user_id:user_id}})
    await User.update({ ride_id: null }, { where: { user_id } });
    if(ride){
        await User.update({ ride_id: null }, { where: { ride_id } });
        ride.destroy();
    }
    res.json({message:"Ride cancelled successfully"})
    }catch(err){
        res.status(500).json({ error: error.message });
    }
}

module.exports={createRide,getRides,updateRide,deleteRide,bookRide,yourRide,cancelRide,yourCar}