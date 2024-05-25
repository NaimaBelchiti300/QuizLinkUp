// LeftPart.js
import { NavLink } from 'react-router-dom';
import '../css/educateur.css';
import { useState } from 'react';
import home from '../images/icons8-accueil-24.png'
import progress from '../images/icons8-dynamique-positive-24.png'
import quiz from '../images/icons8-livre-24.png'
import logout from '../images/icons8-sortie-24.png'
import { useNavigate } from 'react-router-dom';
import detail from '../images/icons8-tester-24.png'
import axios from 'axios';
import user from '../images/icons8-utilisateur-sexe-neutre-30 (1).png';

export default function LeftPart() {
    const navigate=useNavigate()
    const [fullname, setFullname] = useState('');

    const handlelogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        navigate('/');
      };
          
    const fetchData = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:4000/api/educator/me', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setFullname(response.data.fullname);
      } catch (error) {
          if (error.response) {
              console.error('Server responded with status:', error.response.status);
              console.error('Response data:', error.response.data);
          } else if (error.request) {
              console.error('No response received:', error.request);
          } else {
              console.error('Error setting up the request:', error.message);
          }
      }
  };
  
  fetchData()
  
    
    return (
  <div className='d-block'>
      <div className='profile1'>
                <img src={user} alt="user" />
                <h2> {fullname}</h2>

            </div>
        <div className='buttons'>
           
            <div className='icons'><img src={home}/><NavLink to='./Accueil'> Accueil</NavLink></div>
            <div className='icons'> <img src={progress}/><NavLink to='./progress'>Progress</NavLink></div>
            <div className='icons'><img src={quiz}/><NavLink to='./Quizzes'>Add Quize</NavLink></div> 
            <div className='icons'><img src={detail}/><NavLink to='./YourQuizzes'>Your Quizzes</NavLink></div> 
            <div className='icons'><img src={logout}/><a onClick={handlelogout}>Logout</a></div> 
         </div>
  </div>
        );}

