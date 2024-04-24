import NavBar from './componants/navbar';
import Banner from './componants/home';
import Why from './componants/why';
import Reviews from './componants/reviews';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './componants/about';
import Footer from './componants/footer';
import SignUP from './componants/formateurRegister/signup';
import LoginFormatuer from './componants/formateurRegister/login';
import StudentSignup from './componants/studentRegistration/studentSignup';
import SigninStudent from './componants/studentRegistration/studentSignin';
function App() {
  return (
    <div className="App">
      {/* routage */}
      <Router>
      <NavBar/>
<br/>
<br/>
<br/>
<br/>

      <Routes>
      <Route path="/" element={<Home />} />
          <Route path='/formateurRegister/signin' element={<LoginFormatuer/>}/>
          <Route path='/formateurRegister/signup' element={<SignUP/>}/>
          <Route path='/student/signup' element={<StudentSignup/>}/>
          <Route path='/student/signin' element={<SigninStudent/>}/>
        </Routes>
  </Router>
  <br/>
  <br/>

      <Footer/>
 
    </div>
  );
}

export default App;

function Home() {
  return (
    <div>
      <Banner />
      <Why />
      <About />
      <Reviews />
    </div>
  );
}