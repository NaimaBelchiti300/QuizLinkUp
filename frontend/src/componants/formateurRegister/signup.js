import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/signupformateur.css'
export default function SignUP() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
});
const { fullname, email, password } = formData;
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
        const body = JSON.stringify({ fullname, email, password });
        const response = await axios.post(`http://localhost:4000/api/educator/register`, body, config);
        setSuccess('Inscription réussie! Redirection vers la page de connexion...');
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Inscription réussie! Redirection vers la page de connexion...',
        });
        setTimeout(() => navigate('/formateurRegister/signin'), 2000);
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
            text: 'Une erreur s\'est produite, Veuillez remplir tous les champs',
        });
    }
};

    return (
        <form onSubmit={onSubmit} className='pt-5 mt-5 mx-2'>
            <MDBContainer fluid className=' background-radial-gradient overflow-hidden'>
                <MDBRow>
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="display-3 fw-bold ls-tight px-3" style={{color: '#f793e9 '}}>
                            The best platform  <br />
                            <span style={{color: '#F7B7EF'}}>to create quizzes and track your students' progress</span>
                        </h1>
                    </MDBCol>
                    <MDBCol md='6' className='position-relative'>
                        <MDBCard className='my-5 bg-glass container'>
                            <MDBCardBody className='p-5'>
                                <MDBInput wrapperClass='mb-4' label='Full Name' id='fullname' name='fullname' type='text' value={fullname} onChange={onChange} />
                                <MDBInput wrapperClass='mb-4' label='Email' id='email' name='email' type='email' value={email} onChange={onChange} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password' value={password} onChange={onChange} />
                                <div className='buttonfr'>
                                <button className='btn buttonsingupformateur' type='submit' >Sign Up</button>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <span>Do you already have an account?</span>
                                    <Link className='thetext' to='/formateurRegister/signin' style={{color:'#974EB0'}}>Log in</Link>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    );
}
