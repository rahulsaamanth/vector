import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Nav.css';

function Nav({ loggedIn, onLogout }) {
  const navigate = useNavigate(); 


  const handleLogout = () => {
    // Call the logout function passed as a prop
    onLogout();

    // Navigate to the login page
    navigate('/login') 
  };
  return (
    <nav>
      {loggedIn && (
        <>
          <Link to="/Home">Entry for Laptop</Link>
          <Link to="/About">Entry for Mobiles</Link>
          <Link to="/Data">Update Laptop data</Link>
          <Link to="/mdata">Update Mobile data</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Nav;
