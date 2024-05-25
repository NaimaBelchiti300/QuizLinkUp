import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import deleteimg from '../images/icons8-supprimer-20.png';
import savebtn from '../images/icons8-checked-checkbox-20.png';
import updateimg from '../images/icons8-boucle-20 .png';

const Detailquize = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedQuiz, setEditedQuiz] = useState({});

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/api/quiz/getquize/byid/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setQuiz(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz details:', error);
                setError('Failed to fetch quiz details');
                setLoading(false);
            }
        };

        fetchQuizDetails();
    }, [id]);

    const handleEditClick = () => {
        setEditing(true);
        setEditedQuiz(quiz); // Copier les données du quiz dans l'état editedQuiz
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
        } catch (error) {
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
                    console.log('Quiz deleted successfully');
                    Swal.fire(
                        'Deleted!',
                        'Your quiz has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = '/formateure/YourQuizzes';
                    });
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!quiz) {
        return <div>No quiz found</div>;
    }

    return (<>
        <h1 style={{ color: '#ba86e4', textAlign: 'center' }}>Quiz Details</h1>
        <div className="quiz-form" style={{ marginTop: '30px' }}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={editing ? editedQuiz.title : quiz.title || ''} disabled={!editing} onChange={handleChange} />

            <label htmlFor="matiere">Matiere:</label>
            <input type="text" id="matiere" name="matiere" value={editing ? editedQuiz.matiere : quiz.matiere || ''} disabled={!editing} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <input id="description" type="text" name="description" value={editing ? editedQuiz.description : quiz.description || ''} disabled={!editing} onChange={handleChange} />

            <label htmlFor="searchCode">Search Code:</label>
            <input type="text" id="searchCode" name="searchCode" value={editing ? editedQuiz.searchCode : quiz.searchCode || ''} disabled={!editing} onChange={handleChange} />

            <label htmlFor="key">Key:</label>
            <input type="text" id="key" name="key" value={editing ? editedQuiz.key : quiz.key || ''} disabled={!editing} onChange={handleChange} />

            <h3>Questions:</h3>
            {quiz.questions && quiz.questions.map((question, index) => (
                <div key={index} className="question">
                    <label htmlFor={`question-${index}`}>Question:</label>
                    <input type="text" id={`question-${index}`} name="question" value={editing ? editedQuiz.questions[index].question : question.question || ''} disabled={!editing} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} />

                    <label>Options:</label>
                    {question.options && question.options.map((option, idx) => (
                        <input key={idx} type="text" name={`option-${idx}`} value={editing ? editedQuiz.questions[index].options[idx] : option || ''} disabled={!editing} onChange={(e) => handleOptionChange(index, idx, e.target.value)} />
                    ))}

                    <label htmlFor={`correctAnswer-${index}`}>Correct Answer:</label>
                    <input type="text" id={`correctAnswer-${index}`} name="correctAnswer" value={editing ? editedQuiz.questions[index].correctAnswer : question.correctAnswer || ''} disabled={!editing} onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} />
                </div>
            ))}

            {editing ? (
                <div className='buttonssubmitedit'>
                    <button onClick={handleSaveClick}>Save <img className='savebtn' src={savebtn} /></button>
                </div>
            ) : (
                <div className='buttonssubmitedit'>
                    <button onClick={handleEditClick}>Edit <img src={updateimg} className='updateimg' /></button>
                </div>
            )}
            <div className='buttonsubmitdelete'>
                <button onClick={handleDelete}>Delete <img src={deleteimg} className='deleteimg' alt="delete button" /></button>
            </div>
        </div>
        </>
    );
}

export default Detailquize;
 