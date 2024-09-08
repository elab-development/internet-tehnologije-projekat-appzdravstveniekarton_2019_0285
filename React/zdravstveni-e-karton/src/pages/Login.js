import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dijagnoze'); // Preusmeravanje na stranicu sa dijagnozama
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // Pravi zahtev ka Laravel API-u za login
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
        email: username, // Laravel koristi email polje
        password: password,
      });

      // Ako je login uspešan, sačuvaj token u lokalnoj memoriji
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('access_token', response.data.access_token); // Sačuvaj JWT token
      
      alert(`Ulogovan kao ${username}`);
      navigate('/dijagnoze');
    } catch (err) {
      // Prikaz greške ako autentifikacija nije uspešna
      setError('Neispravno korisničko ime ili lozinka!');
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Preusmeravanje na stranicu za registraciju
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Korisničko ime (email)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lozinka"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Uloguj se</button>

      {/* Dodaj dugme za registraciju */}
      <p>Nemate nalog?</p>
      <button onClick={handleRegister}>Registrujte se</button>
    </div>
  );
};

export default Login;
