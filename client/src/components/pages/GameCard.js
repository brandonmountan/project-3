import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_GAME_LIKE, REMOVE_GAME_LIKE } from "../utils/mutations";
import { GET_SINGLE_GAME } from "../utils/queries";
import "../../styles/gameCard.css";

function GameCard({ gameId, game }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Define a loading state to track the query loading status
  const { loading, data, error } = useQuery(GET_SINGLE_GAME, {
    variables: { gameId }, // Pass the received gameId as a variable
  });

  // Log the gameId to the console
  console.log("GAME CARD gameId (value):", gameId);
  console.log("GAME CARD gameId (type):", typeof gameId);

  // Log the object ID of the game from the database
  if (!loading && data && data.game) {
    console.log("GAME CARD game (database object ID):", data.game._id);
  }

  // Handle the "Like" button click
  const [addGameLike] = useMutation(ADD_GAME_LIKE, {
    onCompleted: () => setIsLiked(true),
  });

  const [removeGameLike] = useMutation(REMOVE_GAME_LIKE, {
    onCompleted: () => setIsLiked(false),
  });

  const handleLikeClick = () => {
    if (!loading && data && data.game) {
      const gameId = data.game._id;

      if (isLiked) {
        // If already liked, remove the like
        removeGameLike({ variables: { gameId } })
          .then((response) => {
            console.log("Game removed from liked games:", response);
            setIsLiked(false);
          })
          .catch((removeError) => {
            console.error("Error removing game like:", removeError);
          });
      } else {
        // If not liked, add the like
        addGameLike({ variables: { gameId } })
          .then((response) => {
            console.log("Game added to liked games:", response);
            setIsLiked(true);
          })
          .catch((addError) => {
            console.error("Error adding game like:", addError);
          });
      }
    }
  }
  
  const filteredScreenshots = game.short_screenshots.filter(
    (screenshot) => screenshot.id !== -1
  );

  const openImagePopup = (image) => {
    setSelectedImage(image);
    // timeout to let state change on display property so image click works properly
    setTimeout(() => {
      const popup = document.querySelector(".image-popup");
      if (popup) {
        popup.style.display = "block";
      }
    }, 0); 
  };
  
  // close the image popup
  const closeImagePopup = () => {
    setSelectedImage(null);
    // change display property back
    const popup = document.querySelector(".image-popup");
    if (popup) {
      popup.style.display = "none";
    }
  };

  return (
    <Card style={{ backgroundColor: '#3a506b' }}>
      <Card.Img src={game.background_image} alt={game.name} />
      <Card.Body className="card-body">
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
          <strong>Release Date:</strong> {game.released}
        </Card.Text>
        <Card.Text>
          <strong>Platforms:</strong>{" "}
          {game.platforms.map((platform) => platform.platform.name).join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Metacritic Score:</strong> {game.metacritic}
        </Card.Text>
      </Card.Body>
      <Button
        variant={isLiked ? "danger" : "primary"}
        onClick={handleLikeClick}
      >
        {isLiked ? "Unlike" : "Like"}
      </Button>
      <Card.Footer className="card-footer">
        {filteredScreenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="thumbnail-image"
            onClick={() => openImagePopup(screenshot.image)}>
            <img src={screenshot.image} alt={game.name} />
          </div>
        ))}
      </Card.Footer>

      {/* Image Popup */}
      {selectedImage && (
        <div className="image-popup" onClick={closeImagePopup}>
    <div className="image-popup-container">
      <img src={selectedImage} alt={game.name} />
      <div className="close-button" onClick={closeImagePopup}>
        &#x2715;
      </div>
    </div>
        </div>
        )}
    </Card>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;

