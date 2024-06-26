import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/transaction', { userId, amount });
      setMessage('Transaction successful: ' + JSON.stringify(response.data));
    } catch (error) {
      setMessage('Transaction failed: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h1>ACID Properties Demonstration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Amount</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
