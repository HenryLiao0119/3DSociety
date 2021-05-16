import React, { useState } from 'react';

// bootstrap import
import { Form, Button, Col } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// actions import
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  // redux
  const dispatch = useDispatch();
  const cartStates = useSelector((state) => state.cartStates);
  const { shippingAddress } = cartStates;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            {/* <Form.Check
              type='radio'
              label='Credit Card'
              id='Stripe'
              name='paymentMethod'
              value='Credit Card'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
