import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import GameCard from "./GameCard";
import "../../styles/gamePage.css";
import { useMutation } from "@apollo/client"; 
import { ADD_NEW_GAME } from "../utils/mutations"

function GamePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResultsFor, setDisplayedResultsFor] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); 

  const [addNewGame] = useMutation(ADD_NEW_GAME);

  useEffect(() => {
   
    async function fetchGameSuggestions() {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]); 
          return;
        }

        const response = await axios.get(
          "https://api.rawg.io/api/games",
          {
            params: {
              key: process.env.REACT_APP_RAWG_API_KEY,
              search: searchTerm,
              page_size: 10, // Limit the number of results
            },
          }
        );

        console.log(response.data);

        setSearchResults(response.data.results);

        if (formSubmitted) {
          setFormSubmitted(false);
        } else {
          // If there are search results, set the first result's name as displayedResultsFor
          setDisplayedResultsFor(
            response.data.results.length > 0
              ? response.data.results[0].name
              : searchTerm
          );
        }
      } catch (error) {
        console.error("Error fetching game suggestions", error);
      }
    }

    fetchGameSuggestions();
  }, [searchTerm, formSubmitted]);



  const handleItemClick = (clickedItem) => {
    setSearchTerm(clickedItem.name);
    setSearchResults([]); 
    setDisplayedResultsFor(clickedItem.name); 
    setSelectedGame(clickedItem); 
    
    console.log("Clicked Item Name: " + clickedItem.name);
    console.log("Clicked Item ID: " + clickedItem.id);

    const externalGameId = clickedItem.id.toString();
    console.log("THIS IS STRING ID: " + externalGameId)

    // Trigger the addNewGame mutation when a game is selected
    addNewGame({
      variables: {
        name: clickedItem.name,
        externalGameId: externalGameId,
      },
    })
      .then((response) => {
        console.log("Game added to the server database:", response.data.addNewGame);
      })
      .catch((error) => {
        console.error("Error adding the game:", error);
      });

    handleFormSubmit(); 
  };

  const handleFormSubmit = () => {
    if (searchTerm.trim() === "") {
      return;
    }

    setFormSubmitted(true);
    setSearchTerm(""); 
  };

  return (
    <div className="game-page">
      <div className="game-search">
        <h2>Game Search</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search for a game"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                if (searchTerm.trim() !== "") {
                  // Only show the dropdown if there is text in the input field
                  setSearchResults([]);
                }
              }}
            />
          </Form.Group>
        </Form>
        {formSubmitted && (
          <p>Displaying results for: {displayedResultsFor}</p>
        )}
        {searchResults.length > 0 && (
          <ListGroup>
            {searchResults.map((game) => (
              <ListGroup.Item
                key={game.id}
                onClick={() => handleItemClick(game)}
              >
                {game.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
      {selectedGame && <GameCard game={selectedGame} />}
    </div>
  );
}

export default GamePage;



