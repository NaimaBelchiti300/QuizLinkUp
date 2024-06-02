import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Swal from 'sweetalert2';

import logout from '../images/icons8-sortie-24 (1).png';
import activite from '../images/icons8-temps-24 (1).png';
import back from '../images/icons8-flèche-gauche-24.png';
import done from '../images/icons8-case-cochée-24.png';
import complete from '../images/icons8-cochez-toutes-les-24.png';

import '../css/student.css';

const CompletedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('http://localhost:4000/api/student/completedQuizzes', config);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching completed quizzes:', error);
      }
    };

    fetchCompletedQuizzes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleAssociate = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token is :',token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
        ,
      };
      const response = await axios.put('http://localhost:4000/api/student/associateWithEducator', { email }, config);
      Swal.fire({
        title: 'Success!',
        text: 'You are successfully associated with your educator',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setEmail('')
    } catch (error) {
      console.error('Error associating with educator:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to associate with educator',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      <div className='col-md-12 nav-student'>
        <Navbar.Brand className="mr-5 fw-large px-3 brand">QuizLinkUp</Navbar.Brand>
        <div className="nav-buttons">
          <NavLink to='/student/completedactivite'><button className="nav-button">Activite <img src={activite} style={{ marginBottom: '6px' }} /></button></NavLink>
          <button className="nav-button" onClick={handleLogout}>Logout <img src={logout} /></button>
          <NavLink to='/student'><button className="nav-button">Back <img src={back} style={{ marginBottom: '4px' }} /></button></NavLink>
        </div>
      </div>
      <h1 style={{ fontWeight: 'bold', color: "#6F21B9", fontFamily: "'Comic Sans MS', 'Comic Sans', cursive'", textAlign: 'center' }}>Completed Quizzes <img style={{ width: '50px' }} src={complete} /></h1>

      <div className='input-associate'>
        <div className='inputs-buttom'>
          <div className='input-student'>
            <input
              type='text'
              className='form-control'
              placeholder="Enter Email Of Your Educator To Get into your classroom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='bt-student'>
            <button onClick={handleAssociate}>Done</button>
          </div>
        </div>
      </div>

      <TransitionGroup className="quiz-list">
        {quizzes.map((quiz, index) => (
          <CSSTransition
            key={index}
            timeout={500}
            classNames="quiz-transition"
          >
            <li key={index} className="quiz-card">
              <h2 style={{ fontWeight: 'bold', fontSize: '50px' }}>{quiz.title} <img style={{ width: '40px' }} src={done} /></h2>
              <p><strong>Description:</strong> {quiz.description}</p>
              <p><strong>Matière:</strong> {quiz.matiere}</p>
              <p style={{color:'red'}}><strong>Score:</strong>{quiz.score}</p>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default CompletedQuizzes;
