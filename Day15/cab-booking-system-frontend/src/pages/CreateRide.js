import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateRide = () => {
  const [formData, setFormData] = useState({
    car_name: '',
    capacity: '',
    source: '',
    destination: '',
    fair: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem('userid')));
    try {
      await axios.post('http://localhost:5000/api/rides', {...formData,owner_user_id:JSON.parse(localStorage.getItem('userid'))});
      toast.success('Ride created successfully');
    } catch (error) {
      toast.error('Failed to create ride');
    }
  };

  return (
    <div>
      <h2>Create Ride</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          name="car_name"
          placeholder="Car Name"
          value={formData.car_name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          type="number"
          name="fair"
          placeholder="Fair"
          value={formData.fair}
          onChange={handleChange}
        />
        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
};

export default CreateRide;
