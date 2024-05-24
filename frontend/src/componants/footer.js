import '../css/footer.css'

export default function Footer(){
    return(
        <div className='footer-global mt-5 pt-5'>
        <div className='container-fluid row align-items-center  mt-5 footer'>
<div className='col-md-6 foter1'>
<p className="footer-paragraph">
QuizLinkUp: Your premier destination for interactive learning! Our platform empowers both students and instructors with customizable quizzes and live progress tracking. Start your journey of discovery and growth with us today!
      </p>
</div>
<div className='col-md-3 footer2'>
    <h3>Helpful Links</h3>
    <li>Why QuizLinkUp</li>
    <li>How QuizLinkUp Helps Teachers</li>
    <li>As Students</li>
</div>
<div className='col-md-3 footer3'>
<h3>Contact Us</h3>
    <li>support@QuizLinkUp.com</li>

    </div>

        </div>
        <div className='container-fluid  row align-items-center mt-5' style={{backgroundColor:'#6C6BF9'}}>

            <div className='col-md-12 text-center p-4'>
                <h4 style={{color:'white'}}>© 2024, QuizLinkUp All Rights Reserved</h4>
            </div>

        </div>
        </div>
    )
}