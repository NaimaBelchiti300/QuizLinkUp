import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useParams, NavLink } from 'react-router-dom';
import '../css/student.css';

export default function Result() {
    const { id } = useParams();
    const [score, setScore] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await axios.get(`http://localhost:4000/api/quiz/quizes/${id}/result`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setScore(response.data.score);
            } catch (error) {
                console.error('Erreur lors de la récupération du résultat :', error);
                setError('Impossible de récupérer le résultat');
            }
        };

        fetchResult();
    }, [id]);

    if (error) {
        return <p className='error'>{error}</p>;
    }

    if (score === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className='resultsection'>
            <Confetti />
            <div className='felicitation'>
                <h1>Félicitations ! Vous avez obtenu un score de {score} sur 100.</h1>
            </div>
            <NavLink to='/student'><button className='finish-quizresult'>Back</button></NavLink>
        </div>
    );
}
