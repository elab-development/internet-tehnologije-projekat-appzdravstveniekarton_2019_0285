import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Zahtev za registraciju
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register', {
        name: name,
        email: email,
        password: password,
      });

      // Ako je registracija uspešna, preusmeri korisnika na login
      alert('Uspešna registracija. Možete se sada ulogovati.');
      navigate('/login');
    } catch (err) {
      // Prikaz greške u slučaju neuspeha registracije
      setError('Došlo je do greške prilikom registracije.');
    }
  };

  return (
    <div className="container">
      <h2>Registracija</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Ime"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lozinka"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrujte se</button>
    </div>
  );
};

export default Register;
