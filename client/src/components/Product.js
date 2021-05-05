import React from 'react';

// bootstrap
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import Rating from '../components/Rating';

// redux
import { useDispatch } from 'react-redux';
import { PRODUCT_REQUEST } from '../constants/productTypes';

const Product = ({ product }) => {
  // redux
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch({ type: PRODUCT_REQUEST });
  };

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`} onClick={onClick}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} onClick={onClick}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
