import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "../../styles/gameCard.css";
import { ADD_GAME_LIKE } from "../utils/mutations";
import { useMutation } from "@apollo/client";

function GameCard({ game }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
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

  const [addGameLike] = useMutation(ADD_GAME_LIKE);


  const handleLikeGame = (game) => {
    addGameLike({
      variables: { gameId: game.id },
    })
    .then((response) => {
      console.log("Game liked:", response);
    })
    .catch((error) => {
      console.error("Error liking the game:", error);
    });
  };

  const handleLikeClick = () => {
    handleLikeGame(game.id)
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
      <button onClick={handleLikeClick}>Like</button>
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
