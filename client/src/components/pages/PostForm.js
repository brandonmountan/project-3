import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useMutation } from "@apollo/client";
// import { useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

const PostForm = () => {
  const [postText, setPostText] = useState('');

  // const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update( cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [ addPost, ...posts] },
        });
      } catch (e) {
        console.error(e)
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText('')
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'postText' && value.length <= 280) {
      setPostText(value);
      // setCharacterCount(value.length)
    }
  }
  // const { postId } = useParams();

  // const { loading, data } = useMutation(ADD_POST, {
  //   // pass URL parameter
  //   variables: { postId: postId },
  // });

  // const post = data?.post || {};

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post Here</Form.Label>
        <Form.Control as="textarea" onChange={handleChange} rows={3} />
      </Form.Group>
      <Button as="input" type="submit" value="Submit" />{' '}
    </Form>
  );
}

export default PostForm;
