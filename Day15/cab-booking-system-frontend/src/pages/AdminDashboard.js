import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavBar />
      <h2>Admin Dashboard</h2>
      {/* Add other admin dashboard components here */}
    </div>
  );
};

export default AdminDashboard;
