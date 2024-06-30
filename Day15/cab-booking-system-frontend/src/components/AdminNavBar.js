import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/view-users">View Users</Link></li>
        <li><Link to="/view-rides">View Rides</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
