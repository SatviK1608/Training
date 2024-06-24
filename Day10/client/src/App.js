import React, { useState } from 'react';
import FilterForm from './FilterForm';
import ProductList from './ProductList';
import { Container, Typography, Pagination } from '@mui/material';

const App = () => {
  const [filters, setFilters] = useState({
    sort: 'low-to-high',
    category: '',
    availability: 'available',
    color: '',
    brand: '',
  });
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters);
    fetchProducts(newFilters, 1);
  };

  const fetchProducts = (filters, page) => {
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...filters, page }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(page);
      })
      .catch((error) => console.error('Error fetching products:', error));
  };

  const handlePageChange = (event, value) => {
    fetchProducts(filters, value);
  };

  const handleClearFilters = (clearedFilters) => {
    setFilters(clearedFilters);
    fetchProducts(clearedFilters, 1);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Filter
      </Typography>
      <FilterForm onFilterSubmit={handleFilterSubmit} onClearFilters={handleClearFilters} />
      <ProductList products={products} />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </Container>
  );
};

export default App;
