import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import avatar from '../images/v2-removebg-preview.png';
import logout from '../images/icons8-sortie-24 (1).png';
import activite from '../images/icons8-temps-24 (1).png';
import '../css/student.css';

export default function Student() {
  const [quizzes, setQuizzes] = useState([]);
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const authConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        const response = await axios.get('http://localhost:4000/api/quiz', authConfig);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSearch = async (matiere) => {
    try {
      const token = localStorage.getItem('token');
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.post('http://localhost:4000/api/quiz/quizes', {
        matiere,
      }, authConfig);
      setQuizzes(response.data);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to fetch quizzes');
      }
      setQuizzes([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSubject(value);
    if (value) {
      handleSearch(value);
    } else {
      setQuizzes([]);
    }
  };

  return (
    <div className='student-nav'>
      <div className='col-md-12 nav-student'>
        <Navbar.Brand className="mr-5 fw-large px-3 brand">
          QuizLinkUp
        </Navbar.Brand>
        <div className="nav-buttons">
          <button className="nav-button">Activite <img src={activite} style={{ marginBottom: '6px' }} /></button>
          <input
            type='text'
            placeholder='Trouver Un Quiz Par Matière'
            className='form-control'
            value={subject}
            onChange={handleInputChange}
          />
          <button className="nav-button">Logout <img src={logout} /></button>
        </div>
      </div>
      <div className="container-fluid row">
        <div className="section-hero">
          <div className="inputs">
            <div className='inputs-buttom'>
              <div className='input-student'>
                <input type='text' className='form-control' placeholder="Rechercher un quiz par le code fourni par l'enseignant" />
              </div>
              <div className='bt-student'>
                <button>Rechercher</button>
              </div>
            </div>
          </div>
          <div className="avatar">
            <div className="student-name">
              <h1>Welcome,</h1>
              <h3>Naima Belchiti</h3>
            </div>
            <div className='img-avatar'>
              <img src={avatar} />
            </div>
          </div>
        </div>
        <div className='cards-quize'>
          <ul className='card-ul mt-4'>
            {quizzes.map((quiz) => (
              <div className='card-quizez' key={quiz._id}>
                <li className='card-item'>
                  <h1 className='quiz-title'>
                    Quiz Title: {quiz.title}
                  </h1>
                  <h4 className='quiz-title1'>Description: {quiz.description}</h4>
                  <h4 className='quiz-title1'>Matière: {quiz.matiere}</h4>
                  <div className='button-quiz'>
                    <button className='details-button'>
                      <NavLink to={`Detailquize/${quiz._id}`} className='details-link'>Pratiquer</NavLink>
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
