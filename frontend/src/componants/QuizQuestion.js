import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
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
    
        console.log('Submitting answers:', answers);
    
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.post(`http://localhost:4000/api/quiz/quizes/${id}/submitAndcomplete`, {
                answers
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json' // Ensure the content type is set to JSON
                }
            });
    
            console.log('Quiz submitted successfully:', response.data);
            navigate(`/student/QuizQuestion/result/${id}`);
        } catch (error) {
            console.error('Error submitting quiz:', error.response ? error.response.data : error.message);
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
    <ul className='options-list'>
      {question.options.map((option, optionIndex) => (
        <li key={optionIndex} className="option-item">
          <label className="option-label">
            <input 
              type='radio'
              name={`question-${questionIndex}`}
              value={option}
              onChange={(e) => handleRadioChange(e, questionIndex, optionIndex)}
            />
            <span className="option-text">{option}</span>
          </label>
        </li>
      ))}
    </ul>
  </li>
))}
                    
                                <NavLink to='/student'><button className='finish-quiz'>Back</button></NavLink>

                    <button className='finish-quiz' onClick={handleSubmit}>Finish</button>
                </ul>
            </div>
        </div>
    );
};

export default QuizQuestion;
