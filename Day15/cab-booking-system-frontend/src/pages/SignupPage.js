import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    phone_no: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      toast.success('Signup successful!');
      navigate('/');
    } catch (error) {
      toast.error('Signup failed');
    }
  };
  const handleSwitchToLogin = () => {
    navigate('/');
  };
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="user_name" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="phone_no" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleSwitchToLogin}>Login</button>
    </div>
  );
};

export default SignupPage;
