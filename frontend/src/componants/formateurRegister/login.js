import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../../css/loginformature.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
function LoginFormatuer() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
});
const { email, password } = formData;
const navigate = useNavigate();
const [error, setError] = useState('');

const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const loginResponse = await axios.post(
        `http://localhost:4000/api/educator/login`,
        body,
        config
      );
      console.log("Token:", loginResponse.data.token);
      localStorage.setItem("token", loginResponse.data.token);
      const authConfig = {
        headers: {
          Authorization: `Bearer ${loginResponse.data.token}`,
        },
      };
      const meResponse = await axios.get(
        `http://localhost:4000/api/educator/me`,
        authConfig
      );
      console.log("User Data:", meResponse.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'login réussie! your welcom !...',
    });      navigate("/formateure/Accueil"); 
    } catch (err) {
      console.error(err.response.data);
    
      setError("Invalid email or password. Please try again.");
      Swal.fire({
        icon: 'error',
        title: ' error !',
        text: 'Invalid email or password. Please try again.',
    });
    }
  };
  return (
    
    <form onSubmit={onSubmit}>
 <MDBContainer fluid className="pt-3 mt-3">

<MDBRow className="pt-5 mt-5">

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
  </MDBCol>

  <MDBCol col='4' md='6' >
  <h1 className='text11 text-center'>Educator Login</h1>

  <MDBInput
    wrapperClass='mt-5'
    label='Email address'
    id='email'
    name='email' // Assurez-vous que chaque champ a un attribut 'name' correspondant
    type='email'
    size="lg"
    value={email}
    onChange={onChange}
/>
<MDBInput
    wrapperClass='mt-4'
    label='Password'
    id='password'
    name='password' // Assurez-vous que chaque champ a un attribut 'name' correspondant
    type='password'
    size="lg"
    value={password}
    onChange={onChange}
/>



    <div className='button1'>
                          <button className='btn button' type='submit'>Sign In</button>
                          </div>
    {/* <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div> */}
    <div className="d-flex justify-content-center mt-3">
    <span>Don't Have an Account ? </span>
<Link className='thetext' to='/formateurRegister/signup' > Create it</Link>


    </div>
    

  </MDBCol>

</MDBRow>

</MDBContainer>

    </form>
 

  );
}

export default LoginFormatuer;