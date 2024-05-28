import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const QuizQuestion = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/quiz/getquize/byid/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du quiz :', error);
                setError('Impossible de récupérer le quiz');
            }
        };

        fetchQuiz();
    }, [id]);
    const handleRadioChange = (e, questionIndex, optionIndex) => {
        // Mettre à jour la réponse sélectionnée pour la question donnée
        const updatedQuiz = { ...quiz };
        const updatedQuestions = [...updatedQuiz.questions];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestion.selectedOptionIndex = optionIndex;
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuiz.questions = updatedQuestions;
        setQuiz(updatedQuiz);
    };
   

    if (error) {
        return <p className='error'>{error}</p>;
    }

    if (!quiz) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className='myquiz'>
                <ul className='myquiz2'>
                    <h1 className='quizetitlestudent'>{quiz.title}</h1>
                    <p className='quizetitlestudent'>{quiz.description}</p>
                    {quiz.questions.map((question, questionIndex) => (
                        <li key={question._id}>
                            <h3 className='quizetitlestudent22'>{question.question} ?</h3>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        <label>
                                            <input 
                                                type='radio'
                                                name={`question-${questionIndex}`}
                                                value={option}
                                                onChange={(e) => handleRadioChange(e, questionIndex, optionIndex)}
                                            />
                                            {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    <NavLink to='/student'><button className='finish-quiz'>Back</button></NavLink>
                    <NavLink to='/student/QuizQuestion/result'> <button className='finish-quiz' >Finish</button></NavLink>

                   
                </ul>
            </div>
        </div>
    );
};

export default QuizQuestion;
