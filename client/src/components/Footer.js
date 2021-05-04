import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>Products</Col>
          <Col>Blog</Col>
          <Col>Contact</Col>
        </Row>
        <p className='text-center'> Copyright &copy; 3D Society</p>
      </Container>
    </footer>
  );
};

export default Footer;
