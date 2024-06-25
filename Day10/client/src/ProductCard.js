import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ color: 'primary.main', borderBottom: 2, textAlign: 'center' }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1, textAlign: 'center' }}
        >
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1, textAlign: 'center' }}
        >
          Category: {product.category}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1, textAlign: 'center' }}
        >
          Availability: {product.availability ? 'Available' : 'Not Available'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1, textAlign: 'center' }}
        >
          Color: {product.color}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1, textAlign: 'center' }}
        >
          Brand: {product.brand}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
