import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './componants/navbar';
import Banner from './componants/home';
import Why from './componants/why';
import Reviews from './componants/reviews';
import About from './componants/about';
import Footer from './componants/footer';
import SignUP from './componants/formateurRegister/signup';
import LoginFormatuer from './componants/formateurRegister/login';
import StudentSignup from './componants/studentRegistration/studentSignup';
import SigninStudent from './componants/studentRegistration/studentSignin';
import Formateur from './componants/formateur';
import Student from './componants/student';
import ProtectedRoute from './componants/services';
import QuizQuestion from './componants/QuizQuestion';
import Result from './componants/result';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
        <Route path='/formateure/*' element={
            <ProtectedRoute>
              <Formateur />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path='/formateurRegister/signin' element={
            <MainLayout>
              <LoginFormatuer />
            </MainLayout>
          } />
          <Route path='/formateurRegister/signup' element={<MainLayout>
            <SignUP />
          </MainLayout>} />
          <Route path='/student/signup' element={<MainLayout><StudentSignup /></MainLayout>} />
          <Route path='/student/signin' element={<MainLayout><SigninStudent /></MainLayout>} />
          <Route path='/student' element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          } />
          <Route path='/student/QuizQuestion/:id' element={
            <ProtectedRoute>
              <QuizQuestion/>
            </ProtectedRoute>
          } />
            <Route path='/student/QuizQuestion/result/:id' element={
            <ProtectedRoute>
              <Result/>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </div>
    
  );
}

function MainLayout({ children }) {
  const location = useLocation();
  const hideNavBarFooter = location.pathname.startsWith('/formateure');

  return (
    <div>
      {!hideNavBarFooter && <NavBar />}
      {children}
      {!hideNavBarFooter && <Footer />}
    </div>
  );
}

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

export default App;
