import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getSingleProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productTypes';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [priceFile, setPriceFile] = useState(0);
  const [priceProduct, setPriceProduct] = useState(0);
  const [image, setImage] = useState('');
  const [productionAmount, setProductionAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productStates = useSelector((state) => state.productStates);
  const {
    productLoading,
    productError,
    product,
    ProductUpdated,
  } = productStates;

  const userStates = useSelector((state) => state.userStates);
  const { userCurrent } = userStates;

  useEffect(() => {
    if (userCurrent && userCurrent.isAdmin) {
      if (productUpdated) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        history.push('/admin/productlist');
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(getSingleProduct(productId));
        } else {
          setName(product.name);
          setPriceFile(product.priceFile);
          setPriceProduct(product.priceProduct);
          setImage(product.image);
          setProductionAmount(product.productionAmount);
          setCategory(product.category);
          setDescription(product.description);
        }
      }
    } else {
      history.push(`/login`);
    }
  }, [dispatch, productId, product, productUpdated, history, userCurrent]);

  const uploadFileHander = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        priceFile,
        priceProduct,
        image,
        productionAmount,
        category,
        description,
      })
    );
  };

  return (
    <Fragment>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHander}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default ProductEditScreen;
