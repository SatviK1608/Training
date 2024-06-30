import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard.js';
import ViewRides from './pages/ViewRides';
import EditProfile from './pages/EditProfile';
import CreateRide from './pages/CreateRide';
import YourRides from './pages/YourRides';
import YourCar from './pages/YourCar';
import ViewUsers from './pages/ViewUsers';
import AdminViewRides from './pages/AdminViewRides';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/view-rides" element={<ViewRides />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-ride" element={<CreateRide />} />
          <Route path="/your-rides" element={<YourRides />} />
          <Route path="/your-car" element={<YourCar />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/admin-view-rides" element={<AdminViewRides />} />
        </Routes>
      </div>
  );
}

export default App;
