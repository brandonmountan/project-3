import React from "react";
import Card from "react-bootstrap/Card";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_SINGLE_POST } from "../utils/queries";

function ProfilePost() {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card class="m-5">
      <Card.Body class="p-5">{post.postTitle}</Card.Body>
      <Card.Body class="p-5">{post.postText}</Card.Body>
      <Card.Body class="p-5">{post.postAuthor}</Card.Body>
      <Card.Body class="p-5">{post.createdAt}</Card.Body>
      <Card.Body class="p-5">{post.comments}</Card.Body>
    </Card>
  );
}

export default ProfilePost;
