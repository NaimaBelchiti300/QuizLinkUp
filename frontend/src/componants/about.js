
import '../css/about.css'
import imgeducation from "../images/University-Life-Illustration-1-removebg-preview.png"
import quize from "../images/quize3.png"
import education from '../images/education.png'
export default function About(){
    return(
        <div id='about'>
        <div className='container-fluid row align-items-center mt-5 pt-5' >
   <div className='col-md-7' >
    <div className='headings'>
    <h1 className='mt-5'><span style={{color:'#6A6A98'}}> Create Your First Quiz</span> <span style={{color:'#384079'}}>And</span>    </h1>
   <h1><span style={{color:'#6C6BF9'}}> Personalize Learning !</span></h1>
    </div>
  
   <p  class='para1'>
   Dive into our intuitive platform to create interactive quizzes that resonate with your students, while seamlessly tracking their performance to ensure a dynamic learning experience.
   </p>
   <button class='btn1'>Get Started For Free</button>
   </div>
   <div className="col-md-5">
    <img src={imgeducation} class="img-fluid" />
   </div>

        </div>


        <div className='row container-fluid align-items-center mt-5'>
            
        <h1 style={{color:'#6C6BF9',textAlign:'center'}}>How QuizLinkUp Helps Teachers </h1>
       
        <div className='col-md-7 section  mt-5' >
<div class='card'>
<span style={{color:'#384079',fontWeight:'bold',textAlign:'center'}}> Enhanced Teaching Methods:</span>
    <p> <span style={{color:'#384079'}}>QuizLinkUp</span> provides instructors with a powerful platform to enrich their teaching methodologies.</p>
</div>
<div class='card'>
<span style={{color:'#384079',fontWeight:'bold',textAlign:'center'}}> Easy Quiz Creation:</span>
    <p> Our intuitive quiz creation tools simplify the process for instructorsteachers can design engaging and interactive quizzes that resonate with their students</p>
</div><div class='card'>
<span style={{color:'#384079',fontWeight:'bold',textAlign:'center'}}> Progress Tracking: </span>
    <p>  <span style={{color:'#384079'}}>QuizLinkUp</span> offers comprehensive features for tracking student progress over time. </p>
</div>
</div>
        <div className='col-md-5'>
        <img src={quize} class="img-fluid" />
        </div>
 </div>
 <div className='col-md-12 d-flex justify-content-center mt-5'>
    <button class='btn btn-outline-primary' style={{fontWeight:'bold',width:'500px'}}>Create Your First Quiz</button>
</div>
<div className=' container-fluid row align-items-center mt-5 '>
    <div className='col-md-6'>
    <img src={education}/>

    </div>
    <div className='col-md-6'>
    <h1 style={{color:'#6C6BF9',textAlign:'center'}}> As Students   </h1>
        <p class='para1'>Experience the freedom to learn at your own pace, explore new subjects, and challenge yourself with engaging quizzes designed to stimulate critical thinking and foster a deeper comprehension of concepts. With intuitive navigation and user-friendly features, QuizLinkUp offers a seamless learning experience that adapts to your individual preferences and learning style.</p>    
    <button className='btn  text-white btn33 '>Start Learning</button>
    <button className='btn btn-outline-primary'>Create Account</button>
    </div>
</div>
 </div>
    );

}