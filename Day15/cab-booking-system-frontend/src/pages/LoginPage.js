import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { user_name, password, adminKey });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userid', response.data.userId);
      toast.success('Login successful!');
      navigate(response.data.isAdmin ? '/admin-dashboard' : '/user-dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };
  const handleSwitchToSignup = () => {
    navigate('/signup');
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={user_name} onChange={(e) => setUserName(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Admin Key (Optional)" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSwitchToSignup}>Signup</button>
      
    </div>
  );
};

export default LoginPage;
