import React from 'react';
import { Link } from 'react-router-dom';

const UserNavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/view-rides">View Rides</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        <li><Link to="/create-ride">Create Ride</Link></li>
        <li><Link to="/your-rides">Your Rides</Link></li>
        <li><Link to="/your-car">Your Car</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavBar;
