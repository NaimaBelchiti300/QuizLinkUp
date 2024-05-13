import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../css/educateur.css'; 

const AddQuizForm = () => {
    const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    matiere: '',
    description: '',
    searchCode: '',
    key: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ],
    educator: '',
    completed: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/quiz/addQuiz', formData);
      console.log('Quiz added successfully:', response.data);
    } catch (error) {
      console.error('Error adding quiz:', error.message);
    }
  };





//   get quizez

useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };

    fetchQuizzes();
  }, []);


  return (
    <>
    <h2 className='text-center' style={{fontSize:'45px' ,color:'#ba86e4',fontWeight:'bold'}}>Add New Quiz</h2>

    <div className="quiz-form mt-5">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

        <label>Matiere:</label>
        <input type="text" name="matiere" value={formData.matiere} onChange={handleInputChange} />

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />

        <label>Search Code:</label>
        <input type="text" name="searchCode" value={formData.searchCode} onChange={handleInputChange} />

        <label>Key:</label>
        <input type="text" name="key" value={formData.key} onChange={handleInputChange} />

        <h3>Questions</h3>
        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>{`Question ${questionIndex + 1}:`}</label>
            <input type="text" value={question.question} onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)} />
            <label>Options:</label>
            {question.options.map((option, optionIndex) => (
              <input key={optionIndex} type="text" value={option} onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)} />
            ))}
            <label>Correct Answer:</label>
            <input type="text" value={question.correctAnswer} onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)} />
          </div>
        ))}
        <div className='buttonssubmit mt-4'>
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <button type="submit">Submit</button>

        </div>

      </form>
    </div>




{/* get */}
<div className="quizzes-container">
      <h2 className='text-center' style={{ fontSize: '45px', color: '#ba86e4', fontWeight: 'bold' }}>Quizzes</h2>
      <div className="quiz-list mt-5">
        {quizzes.map((quiz, index) => (
          <div key={index} className="quiz">
            <h3>{quiz.title}</h3>
            <p>Matiere: {quiz.matiere}</p>
            <p>Description: {quiz.description}</p>
            <p>Search Code: {quiz.searchCode}</p>
            <p>Key: {quiz.key}</p>
            <h4>Questions:</h4>
            <ul>
              {quiz.questions.map((question, qIndex) => (
                <li key={qIndex}>
                  <p>{question.question}</p>
                  <ul>
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex}>{option}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>

  );
};

export default AddQuizForm;
