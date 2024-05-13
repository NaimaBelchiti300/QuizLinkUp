import React from 'react';
import '../css/educateur.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import user from '../images/icons8-utilisateur-64.png';

export default function Accueil() {
    const [contentIndex, setContentIndex] = useState(0);
    const [btn, setbtn] = useState(false);
    const contents = [
        <div>Welcome to QuizLinkup! Here, you have the power to craft tailor-made quizzes to meet the unique learning needs of your students. Dive in and create quizzes that resonate with your teaching objectives and effectively engage your students.</div>,
        <div>Remember, you can start with a maximum of 10 quizzes. If you desire more quiz questions, consider upgrading to our premium package, where you'll have the freedom to create unlimited questions and design them according to your preferences.</div>,
        <div>Let's begin by constructing your quiz! Start by entering the title of your quiz, followed by the questions and their respective options. You can include up to three options per question. Be sure to mark the correct answer. Let's create an engaging quiz experience!</div>
    ];

    const nextContent = () => {
        setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        setbtn(true);
    };

    return (
        <>
        <div className='profile'>
        <img src={user} alt="user" />
        <h1>Welcome back M.</h1>
    </div>
        <div className='para-texts'>
            <p className={btn ? 'clicked' : ''}>{contents[contentIndex]}</p>
            <div className='section-btn'>
                {contentIndex === 0 && (
                    <button onClick={nextContent} style={{ marginLeft: '500px' }}>Next</button>
                )}
                {contentIndex === 1 && (
                    <>
                        <button style={{ margin: '10px' }}>Go Premium</button>
                        <button onClick={nextContent}>Next</button>
                    </>
                )}
                {contentIndex === 2 && (
                    <Link to='/formateure/Quizzes' style={{ marginLeft: '490px' }} className='button-started'>Get Started</Link>
                )}
            </div>
        </div>
        </>

    );
}
