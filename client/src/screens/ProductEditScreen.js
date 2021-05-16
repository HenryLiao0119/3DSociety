import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

// router import
import { Link } from 'react-router-dom';

// bootstrap import
import { Form, Button } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// components import
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

// actions import
import { getSingleProduct, updateProduct } from '../actions/productActions';

// constant import
import { PRODUCT_UPDATE_RESET } from '../constants/productTypes';

const ProductEditScreen = ({ match, history }) => {
  // pull id
  const productId = match.params.id;

  const [name, setName] = useState('');
  // const [priceFile, setPriceFile] = useState(0);
  const [priceProduct, setPriceProduct] = useState(0);
  const [image, setImage] = useState('');
  const [productionAmount, setProductionAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // redux
  const dispatch = useDispatch();

  const productStates = useSelector((state) => state.productStates);
  const { productLoading, productError, product, productUpdated } =
    productStates;

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
          // setPriceFile(product.priceFile);
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

  // upload file function api
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
        // priceFile,
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
      <Meta title='Edit Product' />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {productUpdated && <Loader />}
        {productError && <Message variant='danger'>{productError}</Message>}

        {productLoading ? (
          <Loader />
        ) : productError ? (
          <Message variant='danger'>{productError}</Message>
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

            {/* <Form.Group controlId='priceFile'>
              <Form.Label>File Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={priceFile}
                onChange={(e) => setPriceFile(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='priceProduct'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={priceProduct}
                onChange={(e) => setPriceProduct(e.target.value)}
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

            <Form.Group controlId='productionAmount'>
              <Form.Label>Production Amount</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Production Amount'
                value={productionAmount}
                onChange={(e) => setProductionAmount(e.target.value)}
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
                as='textarea'
                rows={10}
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
