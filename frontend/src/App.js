import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import NavBar from './componants/navbar';
import Footer from './componants/footer';

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
      {/* routage */}
      <Router>
      <NavBar/>
      <Banner/>
      <Why/>
      <About/>
      <Reviews/>
      <Footer/>
        <Routes>
          <Route path='/signup/educator' element=''/>
          <Route path='/signup/student' element=''/>
          <Route path='/signin/eductor' element=''/>
          <Route path='/signin/student' element=''/>
        </Routes>
  </Router>
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