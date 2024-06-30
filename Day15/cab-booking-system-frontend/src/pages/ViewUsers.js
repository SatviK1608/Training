import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>View Users</h2>
      <div>
        {users.map((user) => (
          <div key={user.user_id}>
            <h3>{user.user_name}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => deleteUser(user.user_id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
