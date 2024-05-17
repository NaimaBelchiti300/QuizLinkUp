import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EducatorQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const authConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };
                const response = await axios.get('http://localhost:4000/api/quiz/byEducator',authConfig);
                setQuizzes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                setError('Failed to fetch quizzes');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Quizzes Created by Educator</h1>
            {quizzes.length === 0 ? (
                <div>No quizzes found</div>
            ) : (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz._id}>
                            <h2>{quiz.title}</h2>
                            <p>{quiz.description}</p>
                            {/* You can add more quiz details here */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EducatorQuizzes;
