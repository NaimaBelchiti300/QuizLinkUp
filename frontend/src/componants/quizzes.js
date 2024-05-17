import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/educateur.css'; 
import Swal from 'sweetalert2';
import delteimg from '../images/icons8-supprimer-20.png'
import updateimg from '../images/icons8-boucle-20 .png'
import savebtn from '../images/icons8-checked-checkbox-20.png'
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
    const [submitted, setSubmitted] = useState(false);

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
        const token = localStorage.getItem('token');
        const authConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
      
  
        try {
            const response = await axios.post('http://localhost:4000/api/quiz/addQuiz', formData, authConfig);
            console.log('Quiz added successfully:', response.data);
            Swal.fire(
                'created!',
                'Your quiz has been created.',
                'success'
            );
            setSubmitted(true);
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
            Swal.fire(
                'Error!',
                'Veuillez remplir tous les champs.',
                'error'
            );
        }
    };

    const LastInsertedQuiz = () => {
        const [quiz, setQuiz] = useState({});
        const [editing, setEditing] = useState(false);
        const [editedQuiz, setEditedQuiz] = useState({});

        useEffect(() => {
            const fetchLastInsertedQuiz = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:4000/api/quiz/lastinserted', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setQuiz(response.data.quiz);
                    setEditedQuiz(response.data.quiz);
                } catch (error) {
                    console.error("Error fetching last inserted quiz:", error);
                }
            };
            fetchLastInsertedQuiz();
        }, []);

        const handleEditClick = () => {
            setEditing(true);
        };

        const handleSaveClick = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:4000/api/quiz/updateQuiz/${quiz._id}`, editedQuiz, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuiz(response.data);
                setEditing(false);
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
                });            } catch (error) {
                console.error("Error updating quiz:", error);
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setEditedQuiz((prevQuiz) => ({
                ...prevQuiz,
                [name]: value
            }));
        };

        const handleQuestionChange = (index, field, value) => {
            const updatedQuestions = editedQuiz.questions.map((question, i) => {
                if (i === index) {
                    return {
                        ...question,
                        [field]: value
                    };
                }
                return question;
            });
            setEditedQuiz((prevQuiz) => ({
                ...prevQuiz,
                questions: updatedQuestions
            }));
        };

        const handleOptionChange = (questionIndex, optionIndex, value) => {
            const updatedQuestions = editedQuiz.questions.map((question, i) => {
                if (i === questionIndex) {
                    return {
                        ...question,
                        options: question.options.map((option, j) => (j === optionIndex ? value : option))
                    };
                }
                return question;
            });
            setEditedQuiz((prevQuiz) => ({
                ...prevQuiz,
                questions: updatedQuestions
            }));
        };

        const handleDelete = async () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem('token');
                        await axios.delete(`http://localhost:4000/api/quiz/deleteQuiz/${quiz._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        setQuiz({});
                        setEditedQuiz({});
                        setSubmitted(false); // Hide the last quiz section after deletion
                        console.log('Quiz deleted successfully');
                        Swal.fire(
                            'Deleted!',
                            'Your quiz has been deleted.',
                            'success'
                        );
                    } catch (error) {
                        console.error('Error deleting quiz:', error);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the quiz.',
                            'error'
                        );
                    }
                }
            });
        };

        return (
            <div className="quiz-form" style={{ marginTop: '150px' }}>
                <h1 style={{ color: '#ba86e4', textAlign: 'center' }}>This is the last quiz you created</h1>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={editedQuiz.title || ''} disabled={!editing} onChange={handleChange} />

                <label htmlFor="matiere">Matiere:</label>
                <input type="text" id="matiere" name="matiere" value={editedQuiz.matiere || ''} disabled={!editing} onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={editedQuiz.description || ''} disabled={!editing} onChange={handleChange} />

                <label htmlFor="searchCode">Search Code:</label>
                <input type="text" id="searchCode" name="searchCode" value={editedQuiz.searchCode || ''} disabled={!editing} onChange={handleChange} />

                <label htmlFor="key">Key:</label>
                <input type="text" id="key" name="key" value={editedQuiz.key || ''} disabled={!editing} onChange={handleChange} />

                <h3>Questions:</h3>
                {editedQuiz.questions && editedQuiz.questions.map((question, index) => (
                    <div key={index} className="question">
                        <label htmlFor={`question-${index}`}>Question:</label>
                        <input type="text" id={`question-${index}`} name="question" value={question.question || ''} disabled={!editing} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} />
                        <label>Options:</label>
                        {question.options && question.options.map((option, idx) => (
                            <input key={idx} type="text" name={`option-${idx}`} value={option || ''} disabled={!editing} onChange={(e) => handleOptionChange(index, idx, e.target.value)} />
                        ))}
                        <label htmlFor={`correctAnswer-${index}`}>Correct Answer:</label>
                        <input type="text" id={`correctAnswer-${index}`} name="correctAnswer" value={question.correctAnswer || ''} disabled={!editing} onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} />
                    </div>
                ))}
                {editing ? (
                    <div className='buttonssubmitedit'>
                    <button onClick={handleSaveClick}>Save <img className='savebtn' src={savebtn}/></button>
                    </div>
                ) : (
                    <div className='buttonssubmitedit'>                    
                    <button onClick={handleEditClick}>Edit <img src={updateimg} className='updateimg'/></button>
                    </div>
                )}
                <div className='buttonsubmitdelete'>
                <button onClick={handleDelete}>Delete <img src={delteimg} className='deleteimg'/></button>
                </div>
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

            {submitted && <LastInsertedQuiz />}
        </>
    );
};

export default AddQuizForm;
