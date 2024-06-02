import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import avatar from '../images/v2-removebg-preview.png';
import logout from '../images/icons8-sortie-24 (1).png';
import activite from '../images/icons8-temps-24 (1).png';
import '../css/student.css';
import Swal from 'sweetalert2';

export default function Student() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [subject, setSubject] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [keycodes, setKeycodes] = useState({});

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
        setFilteredQuizzes(response.data);
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
      const response = await axios.post('http://localhost:4000/api/quiz/quizes', { matiere }, authConfig);
      setFilteredQuizzes(response.data);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to fetch quizzes');
      }
      setFilteredQuizzes([]);
    }
  };

  const handleSearchByKey = async () => {
    try {
      const token = localStorage.getItem('token');
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.post('http://localhost:4000/api/quiz/quizes/search', { searchCode }, authConfig);
      setFilteredQuizzes(response.data);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to fetch quizzes');
      }
      setFilteredQuizzes([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSubject(value);
    if (value) {
      handleSearch(value);
    } else {
      setFilteredQuizzes(quizzes);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/student/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFullname(response.data.fullname);
      } catch (error) {
        console.error('Error fetching full name:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleKeycodeChange = (id, value) => {
    setKeycodes(prev => ({ ...prev, [id]: value }));
  };

  const gotoquestion = (idquize) => {
    const findquize = quizzes.find((q) => q._id === idquize);
    const enteredKeycode = keycodes[idquize];
    if (findquize.key === enteredKeycode) {
      navigate(`/student/QuizQuestion/${findquize._id}`);
    } else {
      Swal.fire({
        title: "The key provided is not correct",
        text: "Please check the key and try again",
        icon: 'warning',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className='student-nav'>
      <div className='col-md-12 nav-student'>
        <Navbar.Brand className="mr-5 fw-large px-3 brand">QuizLinkUp</Navbar.Brand>
        <div className="nav-buttons">
        <NavLink to='/student/completedactivite'><button className="nav-button">Activite <img src={activite} style={{ marginBottom: '6px' }} /></button></NavLink> 
          <input
            type='text'
            placeholder='Trouver Un Quiz Par Matière'
            className='form-control'
            value={subject}
            onChange={handleInputChange}
          />
          <button className="nav-button" onClick={handleLogout}>Logout <img src={logout} /></button>
        </div>
      </div>
      <div className="container-fluid row">
        <div className="section-hero">
          <div className="inputs">
            <div className='inputs-buttom'>
              <div className='input-student'>
                <input type='text' className='form-control' value={searchCode}
                  onChange={e => setSearchCode(e.target.value)} placeholder="Rechercher un quiz par le code fourni par l'enseignant" />
              </div>
              <div className='bt-student'>
                <button onClick={handleSearchByKey}>Rechercher</button>
              </div>
            </div>
          </div>
          <div className="avatar">
            <div className="student-name">
              <h1>Welcome,</h1>
              <h3>{fullname}</h3>
            </div>
            <div className='img-avatar'>
              <img src={avatar} />
            </div>
          </div>
        </div>
        <div className='cards-quize1'>
          <ul className='card-ul1 mt-4'>
            {filteredQuizzes.map((quiz) => (
              <div className='card-quizez1' key={quiz._id}>
                <li className='card-item1'>
                  <h1 className='quiz-title1'>Quiz Title: {quiz.title}</h1>
                  <h4 className='quiz-title1'>Description: {quiz.description}</h4>
                  <h4 className='quiz-title1'>Matière: {quiz.matiere}</h4>
                  <div className='button-quiz1'>
                    <button className='details-button1' type='button' data-bs-toggle="modal" data-bs-target={`#modal-${quiz._id}`}>
                      <NavLink className='details-link1'>Pratiquer</NavLink>
                    </button>
                  </div>
                </li>
                <div className="modal fade" id={`modal-${quiz._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Keycode</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <input 
                        className='form-control'
                          type='text' 
                          value={keycodes[quiz._id] || ''} 
                          onChange={e => handleKeycodeChange(quiz._id, e.target.value)} 
                          placeholder="Enter the quiz keycode" 
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => gotoquestion(quiz._id)}>Go To Practise</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          {error && <p className='error'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
