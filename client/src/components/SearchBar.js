import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-1 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-1.5'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
