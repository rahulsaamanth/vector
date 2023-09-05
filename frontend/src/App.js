import React, { useState } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Data from './data';
import Mdata from './mdata';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userLoggedIn') === 'true');

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('userLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('userLoggedIn', 'false');
  };

  return (
    <BrowserRouter>
      <Nav loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path='/Data' element={<Data/>}/>
        <Route path="/mdata" element={<Mdata/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
