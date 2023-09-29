import React from "react";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { ADD_POST } from "../utils/mutations";

function ProfilePost() {
  const { postId } = useParams();

  const { loading, data } = useMutation(ADD_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
}

export default ProfilePost;
