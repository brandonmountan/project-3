import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,
}) => {
    if (!posts.length) {
        return <h2>No Posts Yet</h2>
    }

    return (
        <div>
            {showTitle}
        </div>
    )
}