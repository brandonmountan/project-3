import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function GameCard({ game }) {
  return (
    <Card>
      <Card.Img src={game.background_image} alt={game.name} />
      <Card.Body>
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
      <Card.Footer>
        <Image src={game.background_image} alt={game.name} thumbnail />
        {/* image gallery can be added here */}
      </Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
