import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import avatar from '../images/v2-removebg-preview.png';
import logout from '../images/icons8-sortie-24 (1).png';
import activite from '../images/icons8-temps-24 (1).png';
import '../css/student.css';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [subject, setSubject] = useState('');
  const [searchCode,setsearchCode]=useState('')
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
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
      console.log(`Searching for quizzes with matiere: ${matiere}`);
      const response = await axios.post('http://localhost:4000/api/quiz/quizes', 
        { matiere },
        authConfig
      );
      console.log('Response data:', response.data);
      setFilteredQuizzes(response.data);
      setError('');
    } catch (error) {
      console.error('Error response:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setError(error.response.data.message);
      } else {
        setError('Failed to fetch quizzes');
      }
      setFilteredQuizzes([]);
    }
  };


  const handleSearchByKey = async (matiere) => {
    try {
      const token = localStorage.getItem('token');
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      console.log(`Searching for quizzes with searchCode: ${searchCode}`);
      const response = await axios.post('http://localhost:4000/api/quiz/quizes/search', 
        { searchCode },
        authConfig
      );
      console.log('Response data:', response.data);
      setFilteredQuizzes(response.data);
      setError('');
    } catch (error) {
      console.error('Error response:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
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
  


  const handlelogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    navigate('/');
  };

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
      // Handle the error here
    }
  };
  fetchData()

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
          <button className="nav-button" onClick={handlelogout}>Logout <img src={logout} /></button>
        </div>
      </div>
      <div className="container-fluid row">
        <div className="section-hero">
          <div className="inputs">
            <div className='inputs-buttom'>
              <div className='input-student'>
                <input type='text' className='form-control' value={searchCode}
            onChange={e=>setsearchCode(e.target.value)} placeholder="Rechercher un quiz par le code fourni par l'enseignant" />
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
                  <h1 className='quiz-title1'>
                    Quiz Title: {quiz.title}
                  </h1>
                  <h4 className='quiz-title1'>Description: {quiz.description}</h4>
                  <h4 className='quiz-title1'>Matière: {quiz.matiere}</h4>
                  <div className='button-quiz1'>
                    <button className='details-button1'>
                      <NavLink to={`/student/QuizQuestion/${quiz._id}`} className='details-link1'>Pratiquer</NavLink>
                    </button>
                  </div>


                   


                </li>
              </div>
            ))}
          </ul>
          {error && <p className='error'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
