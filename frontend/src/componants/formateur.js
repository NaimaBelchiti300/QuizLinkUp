// Formateur.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/educateur.css';
import LeftPart from './LeftPart';
import Accueil from './Accueil';
import Quiziss from './quizzes';
import Progress from './Progress';
import EducatorQuizzes from './YourQuizzes';

export default function Formateur() {
    return (
        <div className='container-fluid row'>
            <div className='col-md-2 left-part'>
                <LeftPart />
                
            </div>
            <div className='col-md-10 right-part'>
              
                <div className='para-texts'>
                    <Routes>
                        <Route path='Accueil' element={<Accueil />} />
                        <Route path='Quizzes' element={<Quiziss />} />
                        <Route path='Progress' element={<Progress/>} />
                        <Route path='YourQuizzes' element={<EducatorQuizzes/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
}
