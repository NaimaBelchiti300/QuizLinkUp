
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import imgstudents from '../../images/image-removebg-preview (21).png'
import '../../css/studentsignin.css'
export default function SigninStudent(){
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
        `http://localhost:4000/api/student/login`,
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
        `http://localhost:4000/api/student/me`,
        authConfig
      );
      console.log("User Data:", meResponse.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'login réussie! your welcom !...',
    });      navigate("/student"); 
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
    return(
        <>
        
        <div className='row forms1 mx-auto'>

        <div className='col-md-6 imgdiv1 position-relative'>
  <img src={imgstudents} className='position-absolute start-0'/>
</div>
  <div className='col-md-6 formsinput1'>
 
  <h1 className='text11 text-center'>Student Login</h1>

    <form className='form-group' onSubmit={onSubmit}>
      <label>Email</label>
      <input className='form-control' name='email'  type='email' value={email}  onChange={onChange}/>
      <label>Password</label>
      <input className='form-control' name='password'  type='password'  value={password} onChange={onChange}/>
      <div className='btnn11'>
      <button type='submit' className='btn buttonstudent11'>Sign in</button>
    
      </div>
      <div className="d-flex justify-content-center">
      <span>Don't Have an Account ? </span>
<Link className='thetext' to='/student/signup'style={{color:'#974EB0'}} > Create it</Link>
                                </div>
    </form>
  </div>

</div>

        
        
        </>
    )
}