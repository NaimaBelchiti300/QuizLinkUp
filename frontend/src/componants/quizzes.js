import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/educateur.css'; 

const AddQuizForm = () => {
    const [quiz, setQuiz] = useState([]);
    const [editing, setEditing] = useState(false);

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
    const [submitted, setSubmitted] = useState(false); // État pour contrôler l'affichage du dernier quiz

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
        const token = localStorage.getItem('token')
        const authConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const response = await axios.post('http://localhost:4000/api/quiz/addQuiz', formData, authConfig);
            console.log('Quiz added successfully:', response.data);
            setSubmitted(true); // Définir submitted sur true après la soumission
            // Réinitialiser le formulaire
            setFormData({
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
        } catch (error) {
            console.error('Error adding quiz:', error.message);
        }
    };

    const LastInsertedQuiz = () => {
        useEffect(() => {
            const fetchLastInsertedQuiz = async () => {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get('http://localhost:4000/api/quiz/lastInsertedQuiz', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setQuiz(response.data.quiz);
                } catch (error) {
                    console.error("Error fetching last inserted quiz:", error);
                }
            };
            fetchLastInsertedQuiz();
        }, []);
      
          const handleEditClick = () => {
              setEditing(true);
          };
      
          const handleSaveClick = () => {
              setEditing(false);
              // Ajoutez ici la logique pour enregistrer les modifications sur le backend si nécessaire
          };
      

        
        return (
          <div className="quiz-form" style={{marginTop:'150px'}}>
            <h1 style={{color:'#ba86e4',textAlign:'center'}}>this is the last quize you create</h1>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={quiz.title} disabled={!editing} />
  
              <label htmlFor="matiere">Matiere:</label>
              <input type="text" id="matiere" value={quiz.matiere} disabled={!editing} />
  
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" value={quiz.description} disabled={!editing} />
  
              <label htmlFor="searchCode">Search Code:</label>
              <input type="text" id="searchCode" value={quiz.searchCode} disabled={!editing} />
  
              <label htmlFor="key">Key:</label>
              <input type="text" id="key" value={quiz.key} disabled={!editing} />
  
              <h3>Questions:</h3>
              {quiz.questions && quiz.questions.map((question, index) => (
                  <div key={index} className="question">
                      <label htmlFor={`question-${index}`}>Question:</label>
                      <input type="text" id={`question-${index}`} value={question.question} disabled={!editing} />
                      {question.options && question.options.map((option, idx) => (
                          <input key={idx} type="text" value={option} disabled={!editing} />
                      ))}
                      <label htmlFor={`correctAnswer-${index}`}>Correct Answer:</label>
                      <input type="text" id={`correctAnswer-${index}`} value={question.correctAnswer} disabled={!editing} />
                  </div>
              ))}
              {editing ? (
                  <button onClick={handleSaveClick}>Save</button>
              ) : (
                  <button onClick={handleEditClick}>Edit</button>
              )}
              <button>delete</button>
          </div>
      );
      
      
    };

    return (
        <>
            <h2 className='text-center' style={{ fontSize: '45px', color: '#ba86e4', fontWeight: 'bold' }}>Add New Quiz</h2>

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

            {/* Afficher le dernier quiz inséré seulement après la soumission */}
            {submitted && <LastInsertedQuiz />}

        </>
    );
};

export default AddQuizForm;
