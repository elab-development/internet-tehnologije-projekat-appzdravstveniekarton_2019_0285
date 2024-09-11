import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/Dijagnoze.css';

const HomePage = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const token = localStorage.getItem('access_token');
    
    if (loggedIn === 'true' && token) {
      setIsLoggedIn(true);
      
      console.log(`Bearer ${token}`);  // Provera tokena pre slanja zahteva
  
      // Fetch podataka o trenutno ulogovanom korisniku
      axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const userId = response.data.id;
        // Zatim dohvati dijagnoze za tog korisnika
        return axios.get(`http://127.0.0.1:8000/api/v1/users/${userId}/dijagnozas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then(response => {
        setDiagnoses(response.data); // Setuj dijagnoze iz odgovora
      })
      .catch(error => {
        console.error('Error fetching diagnoses:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('sr-RS', options);
  };


  return (
    <div className="home-page">
      <h2>Moje Dijagnoze</h2>
      {isLoggedIn ? (
        <ul>
          {diagnoses.map((diagnosis, index) => (
            <li key={index}>
              <strong>Naziv:</strong> {diagnosis.naziv}<br />
              <strong>Opis:</strong> {diagnosis.opis}<br />
              <strong>Datum postavljanja dijagnoze:</strong> {formatDate(diagnosis.created_at)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Niste ulogovani. Molimo ulogujte se da vidite svoje dijagnoze.</p>
      )}
      <Button label="Odjavi se" onClick={handleLogout} />

      {/* Link u donjem levom uglu */}
      <a
        href="https://www.rfzo.rs/index.php/osiguranalica/provera-overe-zdrisp"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Provera overenosti zdravstvene knjižice
      </a>

    </div>
  );
};

export default HomePage;
