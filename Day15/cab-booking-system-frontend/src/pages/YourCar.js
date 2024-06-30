import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const YourCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchYourCars();
  }, []);

  const fetchYourCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rides/your-cars');
      setCars(response.data);
    } catch (error) {
      toast.error('Failed to fetch your cars');
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/rides/${carId}`);
      toast.success('Car deleted successfully');
      fetchYourCars();
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };

  const viewBookers = async (carId) => {
    // Implement view bookers logic
  };

  return (
    <div>
      <h2>Your Cars</h2>
      <div>
        {cars.map((car) => (
          <div key={car.ride_id}>
            <h3>{car.car_name}</h3>
            <p>Source: {car.source}</p>
            <p>Destination: {car.destination}</p>
            <p>Price: {car.fair}</p>
            <p>Capacity: {car.capacity}</p>
            <button onClick={() => deleteCar(car.ride_id)}>Delete Car</button>
            <button onClick={() => viewBookers(car.ride_id)}>View Bookers</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourCar;
