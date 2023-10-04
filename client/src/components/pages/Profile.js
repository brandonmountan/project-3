import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME, QUERY_POSTS } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const { username: userParam } = useParams();
  const { loading, data: dataMe } = useQuery(QUERY_ME);
  const { loading: loadingPosts, data } = useQuery(QUERY_POSTS, {variables: {username: userParam}});
  const user = dataMe?.me || {};
  const userPosts = data?.posts || [];
  const likedGames = user.likedGames || [];


  const [addPost, { error }] = useMutation(ADD_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const postTitleValue = event.target.elements.postTitle.value;
    const postTextValue = event.target.elements.postText.value;
    const gameValue = event.target.elements.game.value;

    const mutationResponse = await addPost({
      variables: {
        postTitle: postTitleValue,
        postText: postTextValue,
        postAuthor: user._id,
        game: gameValue,
      },
    });

    console.log(mutationResponse);

    if (!mutationResponse.data) {
      throw new Error('something went wrong!');
    }
    alert('Post created!');
    navigate('/home')
  }



  let message = '';

  //this assigns profile to "me" properly now
  if (Auth.loggedIn()) {
    if (dataMe) {
      console.log(data)

      // User is viewing their own profile
      message = `Welcome to your profile, ${user.username}!`;

      // Display the user's personal introduction if available
      if (user.personalIntroduction) {
        message += ` ${user.personalIntroduction}`;
      }
      
      if (userPosts.length > 0) {
        message += ` You have ${userPosts.length} posts.`
      }
      if (userPosts.length < 1) {
        message += ` No posts from ${user.username} yet.`
      }
    } else {
      // User is viewing someone else's profile
      message = `You're viewing another user's profile.`;
    }
  } else {
    // User is not logged in
    message = `You're viewing another user's profile, ${userParam}.`;
  } 

  if (loading || loadingPosts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="m-5">
      <Card.Body className="p-5">
    <p>{message}</p>
    {Auth.loggedIn() ? (
      // me
      <div>
        <p>Additional content for the logged-in user.</p>
        
        {/* Display liked games if the user has liked any */}
        {likedGames.length > 0 && (
          <div>
            <h4>Liked Games:</h4>
            <ul>
              {likedGames.map((game) => (
                <li key={game._id}>{game.name}</li> 
              ))}
            </ul>
          </div>
        )}
      </div>
    ) : (
      // other user
      <p>Additional content for others viewing the profile.</p>
    )}
    {/* Placeholder content */}
    {userParam !== 'me' && !Auth.loggedIn() && (
      <p>This is a placeholder for the public profile page.</p>
    )}
  </Card.Body>
      </Card>

      {Auth.loggedIn() && (
        <div className="m-5">
          <h4>Create a New Post</h4>

          {/* This is where your form should be placed */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="postTitle" className="form-label">Post Title:</label>
              <input type="text" name="postTitle" className="form-control" id="postTitle" required />
            </div>
            <div className="mb-3">
              <label htmlFor="postText" className="form-label">Post Content:</label>
              <textarea name="postText" className="form-control" id="postText" rows="3" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="game" className="form-label">Game:</label>
              <input type="text" name="game" className="form-control" id="game" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Post</button>
          </form>

          {error && <div className="mt-3 text-danger">Error creating post!</div>}
        </div>
      )}
    </>
  );
}

export default Profile;
