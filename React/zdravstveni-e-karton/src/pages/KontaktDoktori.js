import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/KontaktDoktori.css';

const ContactPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 5; // Broj doktora po stranici
    const navigate = useNavigate();

    useEffect(() => {
        // Napraviti GET zahtev ka Laravel API-ju koristeći Axios
        axios.get('http://127.0.0.1:8000/lekars')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        navigate('/login');
    };

    // Logika za paginaciju
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="home-page">
            <h2>Kontakt Informacije Doktora</h2>
            <ul>
                {currentDoctors.map(doctor => (
                    <li key={doctor.id}>
                        <strong>Ime i Prezime:</strong> {doctor.Ime_Prezime}<br />
                        <strong>Specijalizacija:</strong> {doctor.specijalizacija}
                    </li>
                ))}
            </ul>
            <Button label="Odjavi se" onClick={handleLogout} />

            {/* Paginacija */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

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

export default ContactPage;
