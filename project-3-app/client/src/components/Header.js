import React from 'react';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {
  return (
    <div class='p-4'>
      <h1 class="text-center">
        PostGame <Badge bg="secondary">Welcome!</Badge>
      </h1>
    </div>
  );
}

export default Header;