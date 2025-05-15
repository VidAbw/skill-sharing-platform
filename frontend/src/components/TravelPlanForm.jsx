import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

//Added items in Travel Plan Form

const TravelPlanForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        startDate: '',
        endDate: '',
        travelType: 'SOLO',
        budget: '',
        currency: 'USD',
        accommodation: 'HOTEL',
        transportationType: 'FLIGHT',
        goals: '',
        experience: '',
        culturalInterests: '',
        destinations: [],
        activities: [],
        difficulty: 'MEDIUM', // Default value
        estimatedHours: '',
        prerequisites: '',
        learningGoals: '',
        topics: [],
        resources: [],
        imageUrl: '',
        imageFile: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 5; // Change from 4 to 5
    const [currentDestination, setCurrentDestination] = useState('');
    const [currentActivity, setCurrentActivity] = useState({ name: '', description: '', date: '', booked: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleActivityChange = (e) => {
        const { name, value } = e.target;
        setCurrentActivity(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB = 10 * 1024 * 1024 bytes)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds 10MB. Please choose a smaller file.');
                e.target.value = ''; // Reset file input
                return;
            }
            
            // Check file type
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPEG, PNG, etc.)');
                e.target.value = ''; // Reset file input
                return;
            }
            
            // Store the file object for later upload
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imageUrl: URL.createObjectURL(file)
            }));
            
            console.log("Image selected:", file.name, file.type, file.size);
        }
    };

    const addDestination = () => {
        if (currentDestination.trim()) {
            setFormData(prevState => ({
                ...prevState,
                destinations: [...prevState.destinations, currentDestination]
            }));
            setCurrentDestination('');
        }
    };

    const removeDestination = (index) => {
        setFormData(prevState => ({
            ...prevState,
            destinations: prevState.destinations.filter((_, i) => i !== index)
        }));
    };

    const addActivity = () => {
        if (currentActivity.name.trim()) {
            setFormData(prevState => ({
                ...prevState,
                activities: [...prevState.activities, { ...currentActivity, id: Date.now() }]
            }));
            setCurrentActivity({ name: '', description: '', date: '', booked: false });
        }
    };

    const removeActivity = (id) => {
        setFormData(prevState => ({
            ...prevState,
            activities: prevState.activities.filter(activity => activity.id !== id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const submissionData = new FormData();
            if (formData.imageFile) {
                submissionData.append('imageFile', formData.imageFile);
            }
            submissionData.append('title', formData.title);
            submissionData.append('description', formData.description);
            submissionData.append('destination', formData.destination);
            submissionData.append('travel_type', formData.travelType);
            submissionData.append('accommodation', formData.accommodation);
            submissionData.append('transportationType', formData.transportationType);
            submissionData.append('difficulty', formData.difficulty);
            if (formData.budget) submissionData.append('budget', formData.budget);
            if (formData.estimatedHours) submissionData.append('estimatedHours', formData.estimatedHours);
            submissionData.append('currency', formData.currency);
            submissionData.append('prerequisites', formData.prerequisites || '');
            submissionData.append('travelGoals', formData.goals || '');
            submissionData.append('learningGoals', formData.learningGoals || '');
            submissionData.append('culturalInterests', formData.culturalInterests || '');
            if (formData.startDate) {
                submissionData.append('startDate', new Date(formData.startDate).toISOString());
            }
            if (formData.endDate) {
                submissionData.append('endDate', new Date(formData.endDate).toISOString());
            }

            // Make sure activities are properly structured before sending
            if (formData.activities && formData.activities.length > 0) {
                // Convert dates to ISO string format if they exist
                const processedActivities = formData.activities.map(activity => ({
                    ...activity,
                    date: activity.date ? new Date(activity.date).toISOString() : null,
                    // Remove client-side only fields if any
                    id: undefined  // Remove temporary IDs used for React keys
                }));
                
                submissionData.append('activities', JSON.stringify(processedActivities));
                console.log('Activities being sent:', processedActivities);
            }

            console.log("Form submission data:");
            for (let [key, value] of submissionData.entries()) {
                console.log(key, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value);
            }
            const response = await axios.post(
                'http://localhost:8000/api/plans',
                submissionData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            console.log("Plan created successfully:", response.data);
            setIsLoading(false);
            setStep(totalSteps + 1);
            setTimeout(() => navigate('/travel-planlist'), 3000);
        } catch (error) {
            console.error('Error creating travel plan:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            setIsLoading(false);
            console.log('Error creating travel plan. Please try again.');
        }
    };

    const nextStep = (e) => {
        if (e) e.preventDefault();
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const renderProgressBar = () => {
        return (
            <div className="progress mb-4" style={{ height: "8px" }}>
                <progress 
                    className="progress-bar bg-info" 
                    value={(step / totalSteps) * 100} 
                    max="100"
                    style={{ width: "100%" }}
                ></progress>
            </div>
        );
    };

    const renderImageUpload = () => {
        return (
            <div className="mb-4">
                <label className="form-label">Cover Image</label>
                <div className="d-flex gap-3 align-items-center">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {formData.imageUrl && (
                        <div className="position-relative" style={{ width: '100px', height: '100px' }}>
                            <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0"
                                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '', imageFile: null }))}
                                aria-label="Remove image"
                            ></button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Step 5: Learning and Educational Details (modified step)
    const renderLearningDetails = () => {
        return (
            <>
                <h3 className="text-center mb-4 text-primary">Learning Plan</h3>
                <div className="mb-4">
                    <label className="form-label">Expected Difficulty Level</label>
                    <select
                        className="form-select"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="BEGINNER">Beginner</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="EXPERT">Expert</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Estimated Learning Time (hours)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="estimatedHours"
                        value={formData.estimatedHours}
                        onChange={handleChange}
                        placeholder="How many hours do you plan to dedicate to learning?"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Prerequisites</label>
                    <textarea
                        className="form-control"
                        name="prerequisites"
                        value={formData.prerequisites}
                        onChange={handleChange}
                        rows="2"
                        placeholder="What should you know before starting this learning journey?"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Learning Goals</label>
                    <textarea
                        className="form-control"
                        name="learningGoals"
                        value={formData.learningGoals}
                        onChange={handleChange}
                        rows="3"
                        placeholder="What specific things do you want to learn during this trip?"
                    />
                </div>
            </>
        );
    };

    // Step 1: Basic Information
    const renderStepOne = () => {
        return (
            <>
                <h3 className="text-center mb-4 text-primary">Basic Information</h3>
                {renderImageUpload()}
                <div className="mb-4">
                    <label className="form-label">Travel Plan Title</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="E.g. Summer in Italy"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Main Destination</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                            placeholder="E.g. Rome, Italy"
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Travel Type</label>
                    <select
                        className="form-select"
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleChange}
                    >
                        <option value="SOLO">Solo</option>
                        <option value="COUPLE">Couple</option>
                        <option value="FAMILY">Family</option>
                        <option value="FRIENDS">With Friends</option>
                        <option value="BUSINESS">Business</option>
                    </select>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <label className="form-label">Budget</label>
                        <input
                            type="number"
                            className="form-control"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="Enter your budget"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Currency</label>
                        <select
                            className="form-select"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="CAD">CAD</option>
                        </select>
                    </div>
                </div>
            </>
        );
    };

    // Step 2: Plan Details
    const renderStepTwo = () => {
        return (
            <>
                <h3 className="text-center mb-4 text-primary">Plan Details</h3>
                <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Describe your travel plan"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Travel Goals</label>
                    <textarea
                        className="form-control"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        rows="2"
                        placeholder="What do you want to achieve on this trip?"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Accommodation Type</label>
                    <select
                        className="form-select"
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                    >
                        <option value="HOTEL">Hotel</option>
                        <option value="HOSTEL">Hostel</option>
                        <option value="APARTMENT">Apartment/Airbnb</option>
                        <option value="RESORT">Resort</option>
                        <option value="CAMPING">Camping</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Primary Transportation</label>
                    <select
                        className="form-select"
                        name="transportationType"
                        value={formData.transportationType}
                        onChange={handleChange}
                    >
                        <option value="FLIGHT">Flight</option>
                        <option value="TRAIN">Train</option>
                        <option value="BUS">Bus</option>
                        <option value="CAR">Car/Rental</option>
                        <option value="CRUISE">Cruise</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Cultural Interests</label>
                    <textarea
                        className="form-control"
                        name="culturalInterests"
                        value={formData.culturalInterests}
                        onChange={handleChange}
                        rows="2"
                        placeholder="What cultural aspects are you interested in exploring?"
                    />
                </div>
            </>
        );
    };

    // Step 3: Additional Destinations
    const renderAdditionalDestinations = () => {
        return (
            <>
                <h3 className="text-center mb-4 text-primary">Additional Destinations</h3>
                <div className="mb-4">
                    <div className="card mb-3">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Add Destination</h5>
                        </div>
                        <div className="card-body">
                            <p className="text-muted">Add additional cities or places you plan to visit during your trip.</p>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentDestination}
                                    onChange={(e) => setCurrentDestination(e.target.value)}
                                    placeholder="E.g. Florence, Italy"
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={addDestination}
                                >
                                    <i className="bi bi-plus-circle me-1"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <h5 className="mt-4 mb-3">Added Destinations</h5>
                    {formData.destinations.length > 0 ? (
                        <div className="list-group">
                            {formData.destinations.map((destination, index) => (
                                <div key={index} className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <div>
                                            <i className="bi bi-pin-map-fill me-2 text-primary"></i>
                                            {destination}
                                        </div>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeDestination(index)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-light text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            No additional destinations added yet
                        </div>
                    )}
                </div>
            </>
        );
    };

    // Step 4: Activities
    const renderActivities = () => {
        return (
            <>
                <h3 className="text-center mb-4 text-primary">Travel Activities</h3>
                <div className="mb-4">
                    <div className="card mb-3">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Add Activity</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Activity Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={currentActivity.name}
                                    onChange={handleActivityChange}
                                    placeholder="E.g. Visit Colosseum, Food Tour"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={currentActivity.description}
                                    onChange={handleActivityChange}
                                    rows="2"
                                    placeholder="Brief description of this activity"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Planned Date (Optional)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={currentActivity.date}
                                    onChange={handleActivityChange}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="booked"
                                    id="activityBooked"
                                    checked={currentActivity.booked}
                                    onChange={(e) => setCurrentActivity({...currentActivity, booked: e.target.checked})}
                                />
                                <label className="form-check-label" htmlFor="activityBooked">
                                    Already booked/purchased tickets
                                </label>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={addActivity}
                            >
                                <i className="bi bi-plus-circle me-1"></i> Add Activity
                            </button>
                        </div>
                    </div>
                    
                    <h5 className="mt-4 mb-3">Added Activities</h5>
                    {formData.activities.length > 0 ? (
                        <div className="list-group">
                            {formData.activities.map((activity) => (
                                <div key={activity.id} className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            {activity.booked && <i className="bi bi-check-circle-fill text-success me-2"></i>}
                                            {activity.name}
                                        </h5>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeActivity(activity.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <p className="mb-1">{activity.description}</p>
                                    {activity.date && (
                                        <small className="text-muted">
                                            <i className="bi bi-calendar-event me-1"></i> 
                                            Planned for: {new Date(activity.date).toLocaleDateString()}
                                        </small>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-light text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            No activities added yet
                        </div>
                    )}
                </div>
            </>
        );
    };

    // Success step
    const renderSuccess = () => {
        return (
            <div className="text-center py-5">
                <div className="success-animation">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
                </div>
                <h3 className="mt-4 mb-3">Your travel plan has been created!</h3>
                <p className="text-muted">Redirecting you to your travel plans...</p>
            </div>
        );
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return renderStepOne();
            case 2:
                return renderStepTwo();
            case 3:
                return renderAdditionalDestinations();
            case 4:
                return renderActivities();
            case 5:
                return renderLearningDetails(); // Modified step
            case 6:
                return renderSuccess();
            default:
                return renderStepOne();
        }
    };

    const renderNavButtons = () => {
        if (step === totalSteps + 1) return null; // Success step
        
        return (
            <div className="d-flex justify-content-between mt-4">
                {step > 1 && (
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary" 
                        onClick={prevStep}
                    >
                        <i className="bi bi-arrow-left me-2"></i>Back
                    </button>
                )}
                {step < totalSteps ? (
                    <button 
                        type="button" 
                        className="btn btn-primary ms-auto" 
                        onClick={nextStep}
                    >
                        Next<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                ) : (
                    <button 
                        type="submit" 
                        className="btn btn-success ms-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating...
                            </>
                        ) : (
                            <>
                                Create Travel Plan<i className="bi bi-send ms-2"></i>
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        {step <= totalSteps && (
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Create Travel Plan</h4>
                                <div className="step-indicator mt-2">
                                    <span>Step {step} of {totalSteps}</span>
                                </div>
                            </div>
                        )}
                        <div className="card-body p-4">
                            {step !== 5 && renderProgressBar()}
                            <form onSubmit={handleSubmit}>
                                {renderStepContent()}
                                {renderNavButtons()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanForm;