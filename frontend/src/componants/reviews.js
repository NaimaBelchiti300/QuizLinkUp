import '../css/reviews.css'
import icon from '../images/icons8-citation-à-gauche-30 (1).png'
export default function Reviews(){
    return(
        <>
        <div className='container-fluid row align-items-center mt-5 '>
            <div className='col-md-12'>
            <h1 className="text-center mb-4">Read What Our Teachers Say About Us</h1>
            </div>
           
        </div>
        <div className='container-fluid row justify-content-center mt-5 '>
                <div className='col-md-4 cards p-4'>
                <img width="30" height="30" src={icon} alt="quote-left"/>
                <p>QuizLinkUp has revolutionized the way I engage with my students. The platform's intuitive quiz creation tools and real-time progress tracking features have made lesson planning a breeze.</p>
                 <p className="text-center" style={{color:'#384079'}}>- Sarah Johnson, High School Teacher</p>
                </div>
                <div className='col-md-4 cards p-4'>
                <img width="30" height="30" src={icon} alt="quote-left"/>
                <p>As an instructor, I appreciate QuizLinkUp's comprehensive approach to student assessment. The ability to tailor quizzes to match my curriculum and monitor student progress in real-time has been invaluable.</p>
        <p className="text-center" style={{ color:'#384079' }}>- David Smith, University Professor</p>
                </div>
                <div className='col-md-4 cards p-4'>
                <img width="30" height="30" src={icon} alt="quote-left"/>
                <p>QuizLinkUp has transformed my classroom into an interactive learning environment. The platform's user-friendly interface and extensive quiz library have significantly enhanced student engagement and performance.</p>
        <p className="text-center" style={{ color:'#384079' }}>- Emily Thompson, Elementary School Teacher</p>
                </div>
            </div>
        </>
    )
}