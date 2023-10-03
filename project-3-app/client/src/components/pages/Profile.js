import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Card from "react-bootstrap/Card";

function Profile() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(
    userParam === "me" ? QUERY_ME : QUERY_USER,
    {
      variables: { username: userParam === "me" ? undefined : userParam },
    }
  );
  const user = data?.me || data?.user || {};

  let message = "";

  // if (Auth.loggedIn()) {
  //   if (userParam === 'me' || Auth.getProfile().data.username === userParam) {
  //     // User is viewing their own profile
  //     message = `Welcome to your profile, ${user.username}!`;

  //     // Display the user's personal introduction if available
  //     if (user.personalIntroduction) {
  //       message += ` ${user.personalIntroduction}`;
  //     }
  //   } else {
  //     // User is viewing someone else's profile
  //     message = `You're viewing another user's profile, ${user.username}.`;
  //   }
  // } else {
  //   // User is not logged in
  //   message = `You're viewing another user's profile, ${user.username}.`;
  // }

  //this assigns profile to "me" properly now
  if (Auth.loggedIn()) {
    if (userParam === "me" || Auth.getProfile().username === userParam) {
      console.log("welcome " + user); // returns UNDEFINED

      // User is viewing their own profile
      message = `Welcome to your profile, ${user.username}!`;

      // Display the user's personal introduction if available
      if (user.personalIntroduction) {
        message += ` ${user.personalIntroduction}`;
      }
    } else {
      // User is viewing someone else's profile
      message = `You're viewing another user's profile, ${userParam}.`;
    }
  } else {
    // User is not logged in
    message = `You're viewing another user's profile, ${userParam}.`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="m-5">
      <Card.Body className="p-5">
        <p>{message}</p>
        {Auth.loggedIn() ? (
          // me
          <p>Additional content for the logged-in user.</p>
        ) : (
          // other user
          <p>Additional content for others viewing the profile.</p>
        )}
        {/* Placeholder content */}
        {userParam !== "me" && !Auth.loggedIn() && (
          <p>This is a placeholder for the public profile page.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default Profile;
