import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory()

  const submitHandler = (e) => {
      e.preventDefault()
      //check for search term and trim whitespacce
      if(searchTerm.trim()) {
          history.push(`/search/${searchTerm}`)
      } else {
          history.push('/')
      }
  }

  return (
    <Form onSubmit={submitHandler} className='search-bar py-3' sm={3}>
      <Form.Control
        type="text"
        name="query"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      ></Form.Control>
      <Button type='submit' variant='outline-info'>Search</Button>
    </Form>
  );
}

export default Search;
