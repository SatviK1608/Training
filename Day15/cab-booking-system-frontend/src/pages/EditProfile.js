import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    phone_no: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me');
      setFormData(response.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/me', formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="user_name"
          placeholder="Username"
          value={formData.user_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          value={formData.phone_no}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
