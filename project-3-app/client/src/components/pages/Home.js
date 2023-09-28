import React from 'react';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';


function Home() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <Card class="m-5">
      <Card.Body class="p-5">Hello</Card.Body>
    </Card>
  );
}

export default Home;
