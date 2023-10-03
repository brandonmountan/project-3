import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import gql from 'graphql-tag';

const GET_POSTS = gql`
  query {
    posts {
      _id
      postTitle
      postText
      postAuthor {
        username
      }
      createdAt
      game {
        name
      }
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const { username: userParam } = useParams();

  const { loading: userLoading, data: userData } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: postsLoading, data: postsData } = useQuery(GET_POSTS);
  
  const user = userData?.me || userData?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    navigate('/profile/me');
    return null;
  }

  if (userLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>Please login or signup to view content.</h4>;
  }

  return (
    <>
      <Container fluid className="text-center bg-primary py-5">
        <h1>Welcome to PostGame</h1>
        <p>The ultimate platform for game enthusiasts!</p>
      </Container>

      <Container className="my-5">
        <h2>Latest Posts</h2>
        {postsData.posts.map(post => (
          <Card key={post._id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.postTitle}</Card.Title>
              <Card.Text>{post.postText}</Card.Text>
              <Card.Footer>Author: {post.postAuthor.username} | Game: {post.game?.name || 'N/A'}</Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </Container>

      <Container className="my-5">
        <h2>Key Features</h2>
        <Row className="mt-4">
          <Col md={4}>
            <h4>Authentic Blogs</h4>
            <p>Discover game blogs written by experienced players.</p>
          </Col>
          <Col md={4}>
            <h4>Create Profiles</h4>
            <p>Join the community and start your gaming journey.</p>
          </Col>
          <Col md={4}>
            <h4>Categorized Games</h4>
            <p>Navigate through different game categories effortlessly.</p>
          </Col>
        </Row>
      </Container>

      <Container fluid className="text-center bg-secondary py-5">
        <h2>Join the Community!</h2>
        <p>Ready to dive deeper into the world of gaming? Sign up now!</p>
        <Button variant="light" href="#login">
          Sign Up
        </Button>
      </Container>
    </>
  );
}

export default Home;