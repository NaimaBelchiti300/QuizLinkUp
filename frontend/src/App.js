import NavBar from './componants/navbar';
import Banner from './componants/home';
import Why from './componants/why';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* routage */}
      <Router>
      <NavBar/>
      <Banner/>
      <Why/>
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
