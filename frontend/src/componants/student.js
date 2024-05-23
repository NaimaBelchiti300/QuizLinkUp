
import avatar from '../images/v2-removebg-preview.png'
import '../css/student.css'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Student(){
    return(
        <div className="container-fluid row">
            <div className='col-md-12 nav-student' >
            <Navbar.Brand className="mr-5 fw-large px-3 " style={{fontWeight:'bold',fontSize:'55px',color:"blueviolet"}} as={Link}  to="/">QuizLinkUp</Navbar.Brand>
            <button>Logout</button>
            <button>Activite</button>
            <button>serchbutton</button>

            </div>
            <div className="section-hero">
                <div className="inputs">
                    <div className='inputs-buttom'>
                        <div className='input-student'>
                        <input type='text' className='form-control'/> 

                        </div>
<div className='bt-student'>
<button>Ajouter</button>
</div>
                    </div>
                </div>
                <div className="avatar">
<div className="student-name">
<h1>Welcom,</h1>
<h3>Naima Belchiti</h3>
</div>
<div className='img-avatar'>
<img src={avatar}/>
</div>
                </div>
            </div>

        </div>
    )
}