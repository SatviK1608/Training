import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const YourRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchYourRides();
  }, []);

  const fetchYourRides = async () => {
    try {
      const response = await axios.get('/api/rides/your-rides');
      setRides(response.data);
    } catch (error) {
      toast.error('Failed to fetch your rides');
    }
  };

  const cancelRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:5000/api/rides/cancel`, { rideId });
      toast.success('Ride canceled successfully');
      fetchYourRides();
    } catch (error) {
      toast.error('Failed to cancel ride');
    }
  };

  return (
    <div>
      <h2>Your Rides</h2>
      <div>
        {rides.map((ride) => (
          <div key={ride.ride_id}>
            <h3>{ride.car_name}</h3>
            <p>Source: {ride.source}</p>
            <p>Destination: {ride.destination}</p>
            <p>Price: {ride.fair}</p>
            <button onClick={() => cancelRide(ride.ride_id)}>Cancel Ride</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourRides;
