import  React  from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Card from 'react-bootstrap/Card';
import { QUERY_ME, QUERY_POSTS } from '../utils/queries';

function Profile() {
  const { username: userParam } = useParams();
  
  // Use the useQuery hook to fetch the 'me' and 'posts' queries
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
  const { loading: loadingPosts, data: dataPosts } = useQuery(QUERY_POSTS, {
    variables: { username: userParam }, // Pass the 'username' variable to the query
  });

  console.log(dataMe)
  const user = dataMe?.me || {};
  const userPosts = dataPosts?.posts || [];

  let message = '';

  //this assigns profile to "me" properly now
  if (Auth.loggedIn()) {
    if (dataMe) {
      console.log(dataMe)

      // User is viewing their own profile
      message = `Welcome to your profile, ${user.username}!`;

      // Display the user's personal introduction if available
      if (user.personalIntroduction) {
        message += ` ${user.personalIntroduction}`;
      }
      
      if (userParam === 'me' && userPosts.length > 0) {
        message += ` You have ${userPosts.length} posts.`
      }
    } else {
      // User is viewing someone else's profile
      message = `You're viewing another user's profile, ${userParam}.`;
    }
  } else {
    // User is not logged in
    message = `You're viewing another user's profile, ${userParam}.`;
  }

  if (loadingMe || loadingPosts) {
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
          <h3>User Posts</h3>
          {userPosts.map((post) => (
            <div key={post._id}>
            </div>
          ))}
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
    </>
  );
}

export default Profile;
