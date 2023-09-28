<<<<<<< HEAD
// import React from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";

// // import { QUERY_USER, QUERY_ME } from "../utils/queries";

// // import Auth from "../utils/auth";

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });
// }
// //   const user = data?.me || data?.user || {};
// //   // navigate to personal profile page if username is yours
// //   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
// //     return <Navigate to="/me" />;
// //   }

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (!user?.username) {
// //     return (
// //       <h4>
// //         You need to be logged in to see this. Use the navigation links above to
// //         sign up or log in!
// //       </h4>
// //     );
// //   }

// //   return (
// //     <div>
// //       <p>hello</p>
// //     </div>
// //   );
// // };

// export default Profile;
=======
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/client';


function Profile() {
  return (
    <Card class="m-5">
      <Card.Body class="p-5">Hello</Card.Body>
    </Card>
  );
}

export default Profile;
>>>>>>> 07d0db4942ee507c7cb6bd193e74517e7d2a5f9d
