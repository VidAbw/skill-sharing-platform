import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

//this is consist of TravelLearning Progress

const TravelLearningProgress = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [learningNotes, setLearningNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [planDetails, setPlanDetails] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [learningInsights, setLearningInsights] = useState('');
    const [quizProgress, setQuizProgress] = useState(0);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                // Fetch both regular progress and quiz progress
                const [planResponse, quizResponse] = await Promise.all([
                    axios.get(`http://localhost:8000/api/plans/${id}`),
                    axios.get(`http://localhost:8000/api/plans/${id}/quiz-progress`)
                ]);
                
                setPlanDetails(planResponse.data);
                setProgress(planResponse.data.completionPercentage || 0);
                setQuizProgress(quizResponse.data.quizProgress || 0);
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        fetchProgress();
    }, [id]);

    const handleProgressUpdate = async () => {
        setIsSubmitting(true);
        try {
            await axios.patch(`http://localhost:8000/api/plans/${id}/progress`, {
                completionPercentage: progress,
                learningNotes: learningNotes
            });
            setLearningNotes('');
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error updating progress:', error);
            setIsSubmitting(false);
        }
    };

    const handleShareExperience = async () => {
        setIsSubmitting(true);
        try {
            await axios.post(`http://localhost:8000/api/plans/${id}/share`, {
                isPublic,
                learningInsights,
                completionPercentage: progress
            });
            alert('Your learning experience has been shared successfully!');
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error sharing experience:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        {planDetails?.imageUrl && (
                            <img 
                                src={planDetails.imageUrl} 
                                alt={planDetails.title}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                        )}
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Learning Progress</h4>
                            <Link to="/travel-plans" className="btn btn-light btn-sm">
                                <i className="bi bi-arrow-left me-2"></i>Back to Plans
                            </Link>
                        </div>
                        <div className="card-body">
                            {planDetails && (
                                <div className="mb-4">
                                    <h5>{planDetails.title}</h5>
                                    <p className="text-muted">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        {planDetails.destination}
                                    </p>
                                </div>
                            )}

                            {/* Combined Progress */}
                            <div className="mb-4">
                                <h5>Overall Learning Progress</h5>
                                <div className="progress mb-2" style={{ height: "25px" }}>
                                    <div 
                                        className="progress-bar bg-success" 
                                        style={{ width: `${progress}%` }}
                                    >
                                        <small>{progress}% Complete</small>
                                    </div>
                                </div>
                            </div>

                            {/* Quiz Progress */}
                            <div className="mb-4">
                                <h5>Assessment Progress</h5>
                                <div className="progress mb-2" style={{ height: "25px" }}>
                                    <div 
                                        className="progress-bar bg-info" 
                                        style={{ width: `${quizProgress}%` }}
                                    >
                                        <small>{quizProgress}% Quiz Progress</small>
                                    </div>
                                </div>
                                <Link to={`/travel-quiz/${id}`} className="btn btn-outline-primary mt-2">
                                    <i className="bi bi-question-circle me-2"></i>
                                    Continue Assessment
                                </Link>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Completion Progress</label>
                                <div className="d-flex align-items-center gap-2">
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onChange={(e) => setProgress(parseInt(e.target.value))}
                                    />
                                    <span className="badge bg-primary">{progress}%</span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Learning Notes</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={learningNotes}
                                    onChange={(e) => setLearningNotes(e.target.value)}
                                    placeholder="Share what you've learned..."
                                />
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleProgressUpdate}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm me-2" />
                                ) : (
                                    <i className="bi bi-check-circle me-2" />
                                )}
                                Update Progress
                            </button>
                        </div>
                    </div>

                    <div className="card shadow-lg mt-4">
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0">Share Your Learning Experience</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Learning Insights</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={learningInsights}
                                    onChange={(e) => setLearningInsights(e.target.value)}
                                    placeholder="Share what you've learned with the community..."
                                />
                            </div>
                            
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="makePublic"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="makePublic">
                                    Make this experience public for others to learn from
                                </label>
                            </div>

                            <button
                                className="btn btn-success w-100"
                                onClick={handleShareExperience}
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-share me-2"></i>
                                Share Learning Experience
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelLearningProgress;
