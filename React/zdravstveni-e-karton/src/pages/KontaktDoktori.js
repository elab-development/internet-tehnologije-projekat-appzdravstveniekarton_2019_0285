import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/KontaktDoktori.css';

const ContactPage = () => {
    const [doctors, setDoctors] = useState([]);
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

    return (
        <div className="contact-page">
            <h2>Kontakt Informacije Doktora</h2>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>
                        <strong>Ime i Prezime:</strong> {doctor.Ime_Prezime}<br />
                        <strong>Specijalizacija:</strong> {doctor.specijalizacija}
                    </li>
                ))}
            </ul>
            <Button label="Odjavi se" onClick={handleLogout} />
        </div>
    );
};

export default ContactPage;
