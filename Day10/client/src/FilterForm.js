import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';

const FilterForm = ({ onFilterSubmit, onClearFilters }) => {
  const [filters, setFilters] = useState({
    sort: 'low-to-high',
    category: '',
    availability: 'available',
    color: '',
    brand: '',
  });

  const categories = ['Electronics', 'Books', 'Clothing', 'Toys', 'Furniture'];
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E', 'Brand F', 'Brand G', 'Brand H', 'Brand I', 'Brand J'];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      sort: 'low-to-high',
      category: '',
      availability: 'available',
      color: '',
      brand: '',
    };
    setFilters(clearedFilters);
    onClearFilters(clearedFilters);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl>
        <InputLabel>Sort</InputLabel>
        <Select name="sort" value={filters.sort} onChange={handleChange} label="Sort">
          <MenuItem value="low-to-high">Low to High</MenuItem>
          <MenuItem value="high-to-low">High to Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={filters.category} onChange={handleChange} label="Category">
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Availability</InputLabel>
        <Select name="availability" value={filters.availability} onChange={handleChange} label="Availability">
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="not-available">Not Available</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="color"
        label="Color"
        value={filters.color}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>Brand</InputLabel>
        <Select name="brand" value={filters.brand} onChange={handleChange} label="Brand">
          <MenuItem value="">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
      <Button variant="outlined" color="secondary" onClick={handleClearFilters}>Clear Filters</Button>
    </Box>
  );
};

export default FilterForm;
