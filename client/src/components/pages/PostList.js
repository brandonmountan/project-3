import React from 'react';
// import { Link } from 'react-router-dom';

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  return (
    <div>{showTitle && <h3>{title}</h3>}</div>
  );
};

export default PostList;


// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import Auth from '../utils/auth';

// import { QUERY_POSTS, QUERY_SINGLE_POST } from '../utils/queries';

// function PostList() {
//     const { username: userParam } = useParams();

//     const { loading, data } = useQuery(userParam ? QUERY_POSTS : QUERY_SINGLE_POST, {
//       variables: { username: userParam },
//     });
  
//     const user = data?.me || data?.user || {};
//     // navigate to personal profile page if username is yours
//     if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//       return <Navigate to="/me" />;
//     }
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     if (!user?.username) {
//       return (
//         <h4>
//           You need to be logged in to see this. Use the navigation links above to
//           sign up or log in!
//         </h4>
//       );
//     }
//   return (
//     <Card class="m-5">
//       <Card.Body class="p-5">Hello</Card.Body>
//     </Card>
//   );
// }

// export default PostList;
