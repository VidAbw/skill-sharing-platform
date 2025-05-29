import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

//Added items to Travel Learning Questions

const TravelLearningQuestions = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [planDetails, setPlanDetails] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateQuestions = (planData) => {
        let language = 'Local Language';
        const dest = planData.destination?.toLowerCase() || '';
        
        if (dest.includes('france') || dest.includes('paris')) language = 'French';
        else if (dest.includes('italy') || dest.includes('rome')) language = 'Italian';
        else if (dest.includes('spain') || dest.includes('madrid')) language = 'Spanish';
        else if (dest.includes('japan') || dest.includes('tokyo')) language = 'Japanese';
        else if (dest.includes('germany') || dest.includes('berlin')) language = 'German';

        const questionSet = [
            // Cultural Questions
            {
                id: 1,
                type: 'multiple_choice',
                category: 'culture',
                question: `What is the primary language spoken in ${planData.destination}?`,
                options: ['English', 'Spanish', 'French', language],
                correctAnswer: language
            },
            {
                id: 2,
                type: 'text',
                category: 'culture',
                question: `Name three important cultural customs you should respect in ${planData.destination}.`,
                correctAnswer: null // Open-ended
            },

            // Transportation Questions
            {
                id: 3,
                type: 'multiple_choice',
                category: 'transport',
                question: `What is the primary mode of public transportation in ${planData.destination}?`,
                options: ['Metro/Subway', 'Bus', 'Tram', 'Train'],
                correctAnswer: 'Metro/Subway'
            },

            // Local Knowledge
            {
                id: 4,
                type: 'multiple_choice',
                category: 'local',
                question: 'Which of these items should you always carry with you?',
                options: [
                    'Local currency and ID',
                    'Swimming gear',
                    'Formal clothing',
                    'Sports equipment'
                ],
                correctAnswer: 'Local currency and ID'
            },

            // Safety
            {
                id: 5,
                type: 'text',
                category: 'safety',
                question: `List three emergency contact numbers for ${planData.destination}.`,
                correctAnswer: null
            },

            // Accommodation
            {
                id: 6,
                type: 'multiple_choice',
                category: 'accommodation',
                question: 'What should you do upon arriving at your accommodation?',
                options: [
                    'Check all emergency exits',
                    'Go straight to sleep',
                    'Order room service',
                    'Call home'
                ],
                correctAnswer: 'Check all emergency exits'
            },

            // Food and Dining
            {
                id: 7,
                type: 'text',
                category: 'food',
                question: `Name three traditional dishes from ${planData.destination} you plan to try.`,
                correctAnswer: null
            },

            // Budget Management
            {
                id: 8,
                type: 'multiple_choice',
                category: 'budget',
                question: 'What\'s the best way to manage your travel budget?',
                options: [
                    'Track daily expenses',
                    'Spend freely',
                    'Use credit cards only',
                    'No planning needed'
                ],
                correctAnswer: 'Track daily expenses'
            },

            // Cultural Attractions
            {
                id: 9,
                type: 'text',
                category: 'attractions',
                question: `List the top three cultural sites you plan to visit in ${planData.destination} and why.`,
                correctAnswer: null
            },

            // Language
            {
                id: 10,
                type: 'multiple_choice',
                category: 'language',
                question: 'How should you prepare for language barriers?',
                options: [
                    'Learn basic local phrases',
                    'Rely only on English',
                    'Use only gestures',
                    'Avoid communication'
                ],
                correctAnswer: 'Learn basic local phrases'
            }
        ];

        // Add custom questions based on plan details
        if (planData.culturalInterests) {
            questionSet.push({
                id: 11,
                type: 'text',
                category: 'custom',
                question: `How do you plan to explore ${planData.culturalInterests}?`,
                correctAnswer: null
            });
        }

        if (planData.learningGoals) {
            questionSet.push({
                id: 12,
                type: 'text',
                category: 'goals',
                question: `Describe how you will achieve your learning goal: ${planData.learningGoals}`,
                correctAnswer: null
            });
        }

        // Randomize and limit to 10 questions
        return questionSet.sort(() => 0.5 - Math.random()).slice(0, 10);
    };

    useEffect(() => {
        const fetchPlanAndQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/plans/${id}`);
                setPlanDetails(response.data);
                const generatedQuestions = generateQuestions(response.data);
                setQuestions(generatedQuestions);
                
                // Initialize userAnswers array
                setUserAnswers(Array(generatedQuestions.length).fill(''));
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching plan details:', error);
                setError('Failed to load quiz. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchPlanAndQuestions();
    }, [id]);

    const handleSubmitAnswer = async () => {
        if (!answer && questions[currentQuestion]?.type !== 'true_false') {
            alert('Please provide an answer before continuing');
            return;
        }

        // Save the user's answer
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestion] = answer;
        setUserAnswers(updatedUserAnswers);

        const currentQ = questions[currentQuestion];
        let isCorrect = false;

        if (currentQ.type === 'multiple_choice') {
            isCorrect = answer === currentQ.correctAnswer;
            if (isCorrect) setScore(score + 1);
        } else if (currentQ.type === 'true_false') {
            isCorrect = answer === currentQ.correctAnswer;
            if (isCorrect) setScore(score + 1);
        } else {
            // For text questions, consider any thoughtful answer (>10 chars) as correct
            isCorrect = answer.length > 10;
            if (isCorrect) setScore(score + 1);
        }

        try {
            // Move to next question or finish
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setAnswer('');
            } else {
                // Quiz completed
                setShowResults(true);
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const renderAnswerInput = () => {
        const question = questions[currentQuestion];
        if (!question) return null;

        switch (question.type) {
            case 'multiple_choice':
                return (
                    <div className="list-group mb-4">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action ${
                                    answer === option ? 'active' : ''
                                }`}
                                onClick={() => setAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );
                
            case 'true_false':
                return (
                    <div className="d-flex justify-content-center gap-3 mb-4">
                        <button
                            className={`btn btn-lg ${answer === 'True' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setAnswer('True')}
                        >
                            True
                        </button>
                        <button
                            className={`btn btn-lg ${answer === 'False' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setAnswer('False')}
                        >
                            False
                        </button>
                    </div>
                );
                
            case 'text':
            default:
                return (
                    <textarea
                        className="form-control mb-4"
                        rows="4"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer here..."
                    />
                );
        }
    };

    const renderResults = () => {
        const percentage = Math.round((score / questions.length) * 100);
        
        return (
            <div className="text-center py-4">
                <div className={`score-display ${percentage >= 70 ? 'text-success' : 'text-warning'}`}>
                    <i className={`bi ${percentage >= 70 ? 'bi-trophy' : 'bi-lightbulb'}`} 
                       style={{ fontSize: '4rem' }}></i>
                    <h2 className="mt-3">Quiz Completed!</h2>
                    <h3>Your Score: {score}/{questions.length} ({percentage}%)</h3>
                </div>
                
                <div className="progress mb-4 mt-4" style={{ height: "20px" }}>
                    <div 
                        className={`progress-bar ${percentage >= 70 ? 'bg-success' : 'bg-warning'}`}
                        style={{ width: `${percentage}%` }}
                    >
                        {percentage}%
                    </div>
                </div>
                
                <div className="d-grid gap-2 col-md-6 mx-auto mt-4">
                    <Link to={`/travel-plan/${id}`} className="btn btn-primary">
                        <i className="bi bi-file-text me-2"></i>
                        Return to Plan Details
                    </Link>
                    <Link to="/travel-planlist" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to All Plans
                    </Link>
                </div>
            </div>
        );
    };

    const renderQuestion = () => {
        if (showResults) {
            return renderResults();
        }
        
        return (
            <>
                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                        <div className="d-flex justify-content-between">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span className="badge bg-light text-dark">
                                {questions[currentQuestion]?.category?.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title mb-4">{questions[currentQuestion]?.question}</h5>
                        {renderAnswerInput()}
                    </div>
                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmitAnswer}
                    disabled={!answer && questions[currentQuestion]?.type !== 'true_false'}
                >
                    {currentQuestion < questions.length - 1 ? 'Submit & Continue' : 'Complete Quiz'}
                </button>
            </>
        );
    };

    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Preparing your learning assessment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
                <Link to={`/travel-plan/${id}`} className="btn btn-primary">
                    <i className="bi bi-arrow-left me-2"></i>Return to Plan
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center"></div>
                            <h4 className="mb-0">Learning Assessment</h4>
                            <Link to={`/travel-plan/${id}`} className="btn btn-sm btn-light">
                                <i className="bi bi-x-lg"></i>
                            </Link>
                        </div>
                        <div className="card-body p-4">
                            {planDetails && (
                                <div className="mb-4">
                                    <h5>{planDetails.title}</h5>
                                    <p className="mb-0 text-muted">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        {planDetails.destination}
                                    </p>
                                </div>
                            )}
                            
                            {questions.length > 0 ? renderQuestion() : (
                                <div className="alert alert-warning">
                                    No questions available for this plan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default TravelLearningQuestions;
