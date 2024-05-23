import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/educateur.css'
import { NavLink } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
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
                const response = await axios.get('http://localhost:4000/api/educator/quizesOfEducator',authConfig);
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
console.log(quizzes);
    return (
        <div>
            <h1 className='text-center '>Your Quizzes </h1>
            {quizzes.length === 0 ? (
                <div>No quizzes found</div>
            ) : (
                <ul className='card-ul mt-5'>
                    {quizzes.map((quiz) => (
                       <div className='card-quizez'>
                         <li key={quiz._id}>
                            <h3>title:{quiz.title}</h3>
                            <h5>description:{quiz.description}</h5>
                            <h5>matiere:{quiz.matiere}</h5>

                            <div className='button-quiz'>
                            <div><NavLink to='./Detailquize'>see details Quize</NavLink></div> 
                            </div>
                        </li>
                       </div>
                    ))}
                </ul>
            )}
            <Routes>
                                    <Route path='./Detailquize' element={<Detailquize/>}/>

        </Routes>
        </div>
        
    );
};

export default EducatorQuizzes;
