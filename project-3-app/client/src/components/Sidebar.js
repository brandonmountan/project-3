import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function Sidebar() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function fetchGames() {
      try {
        const year = 2023;
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        const response = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: process.env.REACT_APP_RAWG_API_KEY,
            dates: `${startDate},${endDate}`,
            ordering: "-rating",
            page_size: 10,
          },
        });

        console.log(response.data)

        setGames(response.data.results);
      } catch (error) {
        console.error("error fetching games");
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="sidebar">
      <h2>Top Rated Games of 2023</h2>
      <ListGroup>
        {games.map((game) => (
          <ListGroup.Item key={game.id}>
            <h3>{game.name}</h3>
            <p>Released: {game.released}</p>
            <p>Genre: {game.genres.map((genre) => genre.name).join(", ")}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
