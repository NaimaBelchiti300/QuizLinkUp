// LeftPart.js
import { NavLink } from 'react-router-dom';
import '../css/educateur.css';
import home from '../images/icons8-accueil-24.png'
import progress from '../images/icons8-dynamique-positive-24.png'
import quiz from '../images/icons8-livre-24.png'
import logout from '../images/icons8-sortie-24.png'
import { useNavigate } from 'react-router-dom';

export default function LeftPart() {
    const navigate=useNavigate()
    const handlelogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        navigate('/');
      };
      
    
    return (
        <div className='buttons'>
            <div className='icons'><img src={home}/><NavLink to='./Accueil'> Accueil</NavLink></div>
            <div className='icons'> <img src={progress}/><NavLink to='./progress'>Progress</NavLink></div>
            <div className='icons'><img src={quiz}/><NavLink to='./Quizzes'>Add Quize</NavLink></div> 
            <div className='icons'><img src={quiz}/><NavLink to='./YourQuizzes'>Your Quizzes</NavLink></div> 
            <div className='icons'><img src={quiz}/><a onClick={handlelogout}>Logout</a></div> 

         </div>
        );}

