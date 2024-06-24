import React, { useState } from 'react';
import FilterForm from './FilterForm';
import ProductList from './ProductList';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [products, setProducts] = useState([]);

  const handleFilterSubmit = (filters) => {
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Filter
      </Typography>
      <FilterForm onFilterSubmit={handleFilterSubmit} />
      <ProductList products={products} />
    </Container>
  );
};

export default App;
