import React from 'react';
import { Link } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';

const UserDashboard = () => {
  return (
    <div>
      <UserNavBar />
      <h2>User Dashboard</h2>
      {/* Add other user dashboard components here */}
    </div>
  );
};

export default UserDashboard;
