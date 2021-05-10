import React, { useEffect } from 'react';

// router import
import { Link } from 'react-router-dom';

// bootstrap import
import { Carousel, Image } from 'react-bootstrap';

// redux
import { useDispatch, useSelector } from 'react-redux';

// components
import Loader from './Loader';
import Message from './Message';

// actions
import { listTopProducts } from '../actions/productActions';

// types
import { PRODUCT_REQUEST } from '../constants/productTypes';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  // import states
  const productStates = useSelector((state) => state.productStates);
  const { productLoading, productError, productTop } = productStates;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  // product loading reset
  const onClick = () => {
    dispatch({ type: PRODUCT_REQUEST });
  };

  return productLoading ? (
    <Loader />
  ) : productError ? (
    <Message variant='danger'>{productError}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {productTop.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} onClick={onClick}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ($
                {product.priceProduct
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                )
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
