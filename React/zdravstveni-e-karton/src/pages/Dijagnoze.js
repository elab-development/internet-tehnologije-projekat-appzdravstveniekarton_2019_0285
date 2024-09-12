import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Page, Text, View, Document, PDFDownloadLink, pdf } from '@react-pdf/renderer'; // Import za PDF
import '../styles/Dijagnoze.css';
import Button from '../components/Button';

const HomePage = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Drži redosled sortiranja
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const diagnosesPerPage = 5;
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

  const handleSort = () => {
    const sortedDiagnoses = [...filteredDiagnoses].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredDiagnoses(sortedDiagnoses);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Prebacuje redosled sortiranja
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('sr-RS', options);
  };

  const MyDocument = ({ diagnosis }) => (
    <Document>
      <Page>
        <View>
          <Text>Naziv: {diagnosis.naziv}</Text>
          <Text>Opis: {diagnosis.opis}</Text>
          <Text>Datum postavljanja dijagnoze: {formatDate(diagnosis.created_at)}</Text>
          <Text>Terapija: {diagnosis.Terapija}</Text>
        </View>
      </Page>
    </Document>
  );

  const handleDiagnosisClick = async (diagnosis) => {
    try {
      const blob = await pdf(<MyDocument diagnosis={diagnosis} />).toBlob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `${diagnosis.naziv}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating or downloading PDF:', error);
    }
  };

  const indexOfLastDiagnosis = currentPage * diagnosesPerPage;
  const indexOfFirstDiagnosis = indexOfLastDiagnosis - diagnosesPerPage;
  const currentDiagnoses = filteredDiagnoses.slice(indexOfFirstDiagnosis, indexOfLastDiagnosis);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <h2>Moje Dijagnoze</h2>

      {/* Search and Sort Container */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Pretraži po nazivu..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sortiraj po datumu {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
      </div>

      {isLoggedIn ? (
        <ul>
          {currentDiagnoses.map((diagnosis, index) => (
            <li key={index} onClick={() => handleDiagnosisClick(diagnosis)}>
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

      {isLoggedIn ? (
        <Button label="Odjavi se" onClick={handleLogout} />
      ) : (
        <Button label="Uloguj se" onClick={handleLogin} />
      )}

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
