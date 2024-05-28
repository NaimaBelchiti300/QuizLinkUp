import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        const updatedQuiz = { ...quiz };
        const updatedQuestions = [...updatedQuiz.questions];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };
        updatedQuestion.selectedOptionIndex = optionIndex;
        updatedQuestions[questionIndex] = updatedQuestion;
        updatedQuiz.questions = updatedQuestions;
        setQuiz(updatedQuiz);
    };

    const handleSubmit = async () => {
        const answers = quiz.questions.map(question => ({
            questionId: question._id,
            answer: question.options[question.selectedOptionIndex]
        }));

        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.post(`http://localhost:4000/api/quiz/quizes/${id}/submit`, {
                answers
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Quiz submitted successfully:', response.data);
            navigate(`/student/QuizQuestion/result/${id}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setError('Error submitting quiz');
        }
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
                    <button className='finish-quiz' onClick={handleSubmit}>Finish</button>
                </ul>
            </div>
        </div>
    );
};

export default QuizQuestion;
