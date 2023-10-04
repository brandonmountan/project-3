import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import gql from 'graphql-tag';
import { QUERY_POSTS } from "../utils/queries";

const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      commentText
      createdAt
      commentAuthor 
      post {
        _id
      }
    }
  }
`;

function CommentForm({ postId }) {
    const [commentText, setCommentText] = useState("");
    const [addComment] = useMutation(ADD_COMMENT, {
        update(cache, { data: { addComment } }) {
            // Read the existing posts from the cache
            const { posts } = cache.readQuery({ query: QUERY_POSTS });

            // Find the post you commented on in the cached data
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    // Update the comments array with the new comment
                    return {
                        ...post,
                        comments: [...post.comments, addComment],
                    };
                }
                return post;
            });

            // Write the updated data back to the cache
            cache.writeQuery({
                query: QUERY_POSTS,
                data: { posts: updatedPosts },
            });
        },
    });

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("postId:", postId);
            console.log("commentText:", commentText);

            const commentAuthor = localStorage.getItem('username');
            const { data } = await addComment({
                variables: {
                    postId,
                    commentText,
                    commentAuthor
                },
            });
            console.log("Mutation response data:", data);

            // Clear the comment input field after submission
            setCommentText("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId={`commentText_${postId}`}>
                    <Form.Control
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </Form.Group>
                <div className="mt-2"> {/* Add margin-top class for spacing */}
                    <Button type="submit" variant="primary" disabled={!commentText}>
                        Add Comment
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CommentForm;
