import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/Dijagnoze.css';

const HomePage = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Dodato stanje za trenutnu stranicu
  const diagnosesPerPage = 5; // Broj dijagnoza po stranici
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const token = localStorage.getItem('access_token');
    
    if (loggedIn === 'true' && token) {
      setIsLoggedIn(true);
  
      axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const userId = response.data.id;
        return axios.get(`http://127.0.0.1:8000/api/v1/users/${userId}/dijagnozas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then(response => {
        setDiagnoses(response.data);
        setFilteredDiagnoses(response.data);
      })
      .catch(error => {
        console.error('Error fetching diagnoses:', error);
      });
    }
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = diagnoses.filter(diagnosis =>
      diagnosis.naziv.toLowerCase().includes(searchValue)
    );
    setFilteredDiagnoses(filtered);
  };

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

  // Računanje dijagnoza za trenutnu stranicu
  const indexOfLastDiagnosis = currentPage * diagnosesPerPage;
  const indexOfFirstDiagnosis = indexOfLastDiagnosis - diagnosesPerPage;
  const currentDiagnoses = filteredDiagnoses.slice(indexOfFirstDiagnosis, indexOfLastDiagnosis);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <h2>Moje Dijagnoze</h2>
      
      <input
        type="text"
        placeholder="Pretraži po nazivu..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {isLoggedIn ? (
        <ul>
          {currentDiagnoses.map((diagnosis, index) => (
            <li key={index}>
              <strong>Naziv:</strong> {diagnosis.naziv}<br />
              <strong>Opis:</strong> {diagnosis.opis}<br />
              <strong>Datum postavljanja dijagnoze:</strong> {formatDate(diagnosis.created_at)}<br />
              <strong>Terapija:</strong> {diagnosis.Terapija}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>Niste ulogovani. Molimo ulogujte se da vidite svoje dijagnoze.</p>
      )}

      <Button label="Odjavi se" onClick={handleLogout} />

      {/* Navigacija za stranice */}
      <div className="pagination">
        {[...Array(Math.ceil(filteredDiagnoses.length / diagnosesPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>

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
