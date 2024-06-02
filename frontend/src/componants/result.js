import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useParams, NavLink } from 'react-router-dom';
import '../css/student.css';

export default function Result() {
    const { id } = useParams();
    const [scoreData, setScoreData] = useState({ score: null, totalPossibleScore: null });
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
                setScoreData({ 
                    score: response.data.score, 
                    totalPossibleScore: response.data.totalPossibleScore 
                });
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

    if (scoreData.score === null || scoreData.totalPossibleScore === null) {
        return <p>Loading...</p>;
    }

    const passingScore = scoreData.totalPossibleScore / 2;

    return (
        <div className='resultsection'>
            {scoreData.score > passingScore ? (
                <>
                    <Confetti />
                    <div className='felicitation'>
                        <h1>Félicitations ! Vous avez obtenu un score de {scoreData.score} sur {scoreData.totalPossibleScore}.</h1>
                    </div>
                </>
            ) : (
                <div className='felicitation'>
                    <h1 style={{color:'red'}}>Oops ! Vous n'avez pas réussi... (Votre score est de {scoreData.score} sur {scoreData.totalPossibleScore}.)</h1>
                </div>
            )}
            <NavLink to='/student'><button className='finish-quizresult'>Back</button></NavLink>
        </div>
    );
}
