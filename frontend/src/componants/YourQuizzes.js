import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/educateur.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Detailquize from './Detailquize';


const EducatorQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const authConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };
                const response = await axios.get('http://localhost:4000/api/educator/quizesOfEducator', authConfig);
                setQuizzes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                setError('Failed to fetch quizzes');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className='text-center text-dark'>Your Quizzes</h1>
            {quizzes.length === 0 ? (
                <div>No quizzes found</div>
            ) : (
                <ul className='card-ul mt-4'>
                    {quizzes.map((quiz) => (
                        <div className='card-quizez' key={quiz._id}>
                            <li>
                                <h3 style={{color:"#8854C0",fontWeight:"bold",fontSize:'35px',fontFamily:'serif',marginBottom:'25px'}}>
                                    {quiz.title}
                                </h3>
                                <h4>description: {quiz.description}</h4>
                                <h4>matiere: {quiz.matiere}</h4>
                                <div className='button-quiz' style={{marginBottom:"25px"}}>
<button>
  <NavLink to={`Detailquize/${quiz._id}`}>See details Quiz</NavLink>
</button>

                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            )}
           

        </div>
    );
};

export default EducatorQuizzes;
