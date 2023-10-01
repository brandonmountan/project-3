import React from "react";
// import { Container, Button, Row, Col, Card } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
<<<<<<< HEAD
// import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { QUERY_POSTS } from "../utils/queries";

// import { Navigate } from "react-router-dom";
// import Auth from "../utils/auth";
import PostList from "./PostList";
import PostForm from "./PostForm";

function Home() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

=======
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";

function Home() {
  const navigate = useNavigate();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  if (Auth.loggedIn()) {
    // Check if the user is logged in
    if (Auth.getProfile().data.username === userParam) {
      // Redirect to the user's profile if it matches the logged-in user
      navigate('/profile/me');
      return null; // Return null to prevent rendering the default content
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>Please login or signup to view content.</h4>;
  }
>>>>>>> ad406854c3613ebcfb31f9d5353c8123462c0770
  return (
    <main>
    <PostForm />
    <br />
    <PostList
      posts={posts}
      title="Posts!"
    />
    </main>
  )
  //   const { username: userParam } = useParams();

<<<<<<< HEAD
  //   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //     variables: { username: userParam },
  //   });
  
  //   const user = data?.me || data?.user || {};
  //   // navigate to personal profile page if username is yours
  //   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //     return <Navigate to="/me" />;
  //   }
  
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  
  //   if (!user?.username) {
  //     return (
  //       <h4>
  //         Please login or signup to view content.
  //       </h4>
  //     );
  //   }
  // return (
  //   <>
  //     <Container fluid className="text-center bg-primary py-5">
  //       <h1>Welcome to PostGame</h1>
  //       <p>The ultimate platform for game enthusiasts!</p>
  //     </Container>

  //     {/* Sample Blog Card */}  
  //     <Container className="my-5 primary">
  //       <h2>Recent Blogs</h2>
  //       <Row className="mt-4">    
  //         <Col md={4}>
  //           <Card className="mb-4">
  //             <Card.Img variant="top" />
  //             <Card.Body>
  //               <Card.Title>Blog Title</Card.Title>
  //               <Card.Text>Short blog description...</Card.Text>
  //               <Button variant="primary" href="#blog-link">Read More</Button>
  //             </Card.Body>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>
  //     {/* if we intend to incorporate blogs into the home page we can map through
  //     an array of our blogs here */}


  //     <Container className="my-5">
  //       <h2>Key Features</h2>
  //       <Row className="mt-4">
  //         <Col md={4}>
  //           <h4>Authentic Blogs</h4>
  //           <p>Discover game blogs written by experienced players.</p>
  //         </Col>
  //         <Col md={4}>
  //           <h4>Create Profiles</h4>
  //           <p>Join the community and start your gaming journey.</p>
  //         </Col>
  //         <Col md={4}>
  //           <h4>Categorized Games</h4>
  //           <p>Navigate through different game categories effortlessly.</p>
  //         </Col>
  //       </Row>
  //     </Container>

  //     <Container fluid className="text-center bg-secondary py-5">
  //       <h2>Join the Community!</h2>
  //       <p>Ready to dive deeper into the world of gaming? Sign up now!</p>
  //       <Button variant="light" href="#login">Sign Up</Button>
  //     </Container>
  //   </>
  // );
=======
      {/* Sample Blog Card */}
      <Container className="my-5 primary">
        <h2>Recent Blogs</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title>Blog Title</Card.Title>
                <Card.Text>Short blog description...</Card.Text>
                <Button variant="primary" href="#blog-link">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* if we intend to incorporate blogs into the home page we can map through
      an array of our blogs here */}

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
>>>>>>> ad406854c3613ebcfb31f9d5353c8123462c0770
}

export default Home;
