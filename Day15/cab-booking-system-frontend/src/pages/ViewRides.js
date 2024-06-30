import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewRides = () => {
  const [rides, setRides] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);

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

  const handleFilter = () => {
    const filteredRides = rides.filter(
      (ride) =>
        (!source || ride.source.includes(source)) &&
        (!destination || ride.destination.includes(destination))
    );
    setRides(filteredRides);
  };

  const bookRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:5000/api/rides/book`, { rideId,userId:JSON.parse(localStorage.getItem('userid')) });
      toast.success('Ride booked successfully');
      fetchRides();
    } catch (error) {
      toast.error('Failed to book ride');
    }
  };

  return (
    <div>
      <h2>Available Rides</h2>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <div>
        {rides.map((ride) => (
          <div key={ride.ride_id}>
            <h3>{ride.car_name}</h3>
            <p>Source: {ride.source}</p>
            <p>Destination: {ride.destination}</p>
            <p>Price: {ride.fair}</p>
            <p>Seats Left: {ride.capacity}</p>
            <button onClick={() => bookRide(ride.ride_id)}>Book This Ride</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRides;
