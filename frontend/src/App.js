import NavBar from './componants/navbar';
import Banner from './componants/home';
import Why from './componants/why';
import Reviews from './componants/reviews';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './componants/about';
import Footer from './componants/footer';

function App() {
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
