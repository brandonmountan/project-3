import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="mb-4 text-center">About Us</h1>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Text>
                We identified a gap in the gaming community: the difficulty of finding trustworthy game insights and connecting with fellow gamers. Our platform bridges this gap. Here, gamers not only get in-depth blogs on various games but also a space to discuss and bond over shared interests.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h5">Key Features</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Authentic game blogs by experienced players</ListGroup.Item>
              <ListGroup.Item>Profile creation to join the community</ListGroup.Item>
              <ListGroup.Item>Game categories for tailored navigation</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Text>
                Stay tuned for enhanced features in our upcoming releases!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Text>
                Unlike many platforms that majorly focus on news and reviews, our commitment lies in fostering a community where every gamer feels at home.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
