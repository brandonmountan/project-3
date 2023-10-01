import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "../../styles/gamePage.css";

function GameSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResultsFor, setDisplayedResultsFor] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Fetch game suggestions when the search term changes
    async function fetchGameSuggestions() {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]); // Clear results if the search term is empty
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
    setSearchTerm(clickedItem.name); // Set the input value to the clicked item's name
    setSearchResults([]); // Clear the dropdown
    setDisplayedResultsFor(clickedItem.name); // Set the full game title as displayedResultsFor
    handleFormSubmit(); // Trigger form submission
  };

  const handleFormSubmit = () => {
    if (searchTerm.trim() === "") {
      // Don't submit if the search term is empty
      return;
    }

    setFormSubmitted(true);
    setSearchTerm(""); // Clear the input field
  };

  return (
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
  );
}

export default GameSearch;


