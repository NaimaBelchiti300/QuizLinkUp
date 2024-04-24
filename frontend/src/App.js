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
    <Router>
        <Layout/>
        <Routes>
        <Route path='/' element={<Landingpage/>}/>
          <Route path='/signup/educator'  element="" />
          <Route path='/signin/educator'    element=""/>
          <Route path='/signup/student'   element=""/>
          <Route path='/signin/student'   element=""/>
        </Routes>
        <Footer/>
 </Router>
    </div>
  );
}

export default App;
