import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminViewRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rides');
      setRides(response.data);
    } catch (error) {
      toast.error('Failed to fetch rides');
    }
  };

  return (
    <div>
      <h2>View Rides</h2>
      <div>
        {rides.map((ride) => (
          <div key={ride.ride_id}>
            <h3>{ride.car_name}</h3>
            <p>Source: {ride.source}</p>
            <p>Destination: {ride.destination}</p>
            <p>Price: {ride.fair}</p>
            <p>Capacity: {ride.capacity}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewRides;
