import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/educateur.css';
import { NavLink, Route, Routes } from 'react-router-dom';

import quizimage from '../images/icons8-quiz-50.png'
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
                setError('No quizzes Yet');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
        <div style={{width:'100%',justifyContent:'center',alignItems:'center',display:"flex",marginTop:'200px'}}>
            <div className='text-danger' style={{fontSize:'50px',fontWeight:'bold',textAlign:'center',margin:'auto'}}>{error}</div>;
        </div>)
    }

    return (
        <div>
<div className='imgheading'>
<h1 className='text-center' style={{color:'#40396E'}}>Your Quizzes </h1><img src={quizimage}/>
</div>            {quizzes.length === 0 ? (
                <div>No quizzes found</div>
            ) : (
                <ul className='card-ul mt-4'>
                {quizzes.map((quiz) => (
                  <div className='card-quizez' key={quiz._id}>
                    <li className='card-item'>
                      <h3 className='quiz-title'>
                        {quiz.title}
                      </h3>
                      <h4>description: {quiz.description}</h4>
                      <h4>matiere: {quiz.matiere}</h4>
                      <div className='button-quiz'>
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
