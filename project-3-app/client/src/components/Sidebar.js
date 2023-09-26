import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

// const [games, setGames] = useState([]);

// useEffect(() => {}, []);

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <Button variant="primary" className="mb-2">
        Button 1
      </Button>
      <Button variant="secondary" className="mb-2">
        Button 2
      </Button>
    </div>
  );
}

export default Sidebar;
