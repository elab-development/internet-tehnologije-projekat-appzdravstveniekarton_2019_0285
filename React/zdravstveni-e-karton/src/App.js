import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Dijagnoze from './pages/Dijagnoze';
import KontaktDoktori from './pages/KontaktDoktori';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dijagnoze" element={<Dijagnoze />} />
        <Route path="/kontakt" element={<KontaktDoktori />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
