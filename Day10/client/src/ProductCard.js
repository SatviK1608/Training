import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Availability: {product.availability ? 'Available' : 'Not Available'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {product.color}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {product.brand}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
