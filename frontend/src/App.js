import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import NavBar from './componants/navbar';
import Footer from './componants/footer';
import SignUpStudent from './componants/studentRegistration/studentSignup';
import SignInStudent from './componants/studentRegistration/studentSignin';



function App() {

  const Layout = ({ children }) => {
    return (
      <div>
        <NavBar />
        <div >
          {children}
        </div>
      </div>
    );
  };
  return (
    <div className="App">
    <Router>
        <Layout/>
        <Routes>
        <Route path='/' element={<Landingpage/>}/>
          <Route path='/signup/educator'  element=''/>
          <Route path='/signin/educator'  element=''/>
          <Route path='/signup/student' element={<SignUpStudent/>}/>
          <Route path='/signin/student' element={<SignInStudent/>}/>
        </Routes>
        <Footer/>
 </Router>
    </div>
  );
}

export default App;
