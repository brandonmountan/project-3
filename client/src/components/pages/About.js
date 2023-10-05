import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col lg={12}>
          <h1 className="mb-5 text-center">About Us</h1>
          
          <Card className="mb-5 shadow">
            <Card.Body className="p-4">
              <Card.Text className="mb-0">
                We identified a gap in the gaming community: the difficulty of finding trustworthy game insights and connecting with fellow gamers. Our platform bridges this gap. Here, gamers not only get in-depth blogs on various games but also a space to discuss and bond over shared interests.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-5 shadow">
            <Card.Header as="h5" className="p-4">Key Features</Card.Header>
            <Card.Body className="p-4">
              <ul className="list-unstyled">
                <li className="mb-2">Authentic game blogs by experienced players</li>
                <li className="mb-2">Profile creation to join the community</li>
                <li className="mb-2">Game categories for tailored navigation</li>
              </ul>
              <Card.Text className="mt-4">
                Stay tuned for enhanced features in our upcoming releases!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="shadow">
            <Card.Body className="p-4">
              <Card.Text className="mb-0">
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
