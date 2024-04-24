import React from 'react';
import imgstudents from '../../images/image-removebg-preview (18).png'
import '../../css/studentregister.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function StudentSignup() {
  const [formData, setFormData] = useState({
    fullname: '',
    username:'',
    email: '',
    password: '',
});
const { fullname,username, email, password } = formData;
const navigate = useNavigate();
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({ fullname,username, email, password });
        const response = await axios.post(`http://localhost:4000/api/student/register`, body, config);
        setSuccess('Inscription réussie! Redirection vers la page de connexion...');
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Inscription réussie! Redirection vers la page de connexion...',
        });
        setTimeout(() => navigate('/student/signin'), 2000);
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data) {
            setError(err.response.data.error || 'Une erreur s\'est produite.');
        } else {
            setError('Une erreur inattendue s\'est produite.');
        }
        // Afficher une alerte SweetAlert2 pour l'erreur
        Swal.fire({
            icon: 'error',
            title: ' error !',
            text: 'Une erreur s\'est produite.',
        });
    }
};
return(
<>
  <div className='row forms mx-auto'>
  <div className='col-md-6 imgdiv position-relative'>
  <img src={imgstudents} className='mb-5 position-absolute start-0'/>
</div>

  <div className='col-md-6 formsinput'>
  <h1 className='text text-center'>Student Registration</h1>
 <p className='text text-center' >
"Embark on Your First Quiz Journey and Submit with Confidence."</p>
    <form className='form-group'onSubmit={onSubmit}>
      <label>Full Name</label>
      <input className='form-control'name='fullname' type='text'  value={fullname} onChange={onChange} />
      <label>Username</label>
      <input className='form-control' name='username' type='text' value={username}onChange={onChange} />
      <label>Email</label>
      <input className='form-control' name='email'  type='email' value={email}onChange={onChange} />
      <label>Password</label>
      <input className='form-control' name='password'  type='password' value={password} onChange={onChange} />
      <div className='btnn'>
      <button type='submit' className='btn buttonstudent'>Sign Up</button>
    
      </div>
      <div className="d-flex justify-content-center">
                                    <span>Do you already have an account?</span>
                                    <Link className='thetext' to='/student/signin' style={{color:'purple'}}>Log in</Link>
                                </div>
    </form>
  </div>
</div>

</>
)
}

export default StudentSignup;