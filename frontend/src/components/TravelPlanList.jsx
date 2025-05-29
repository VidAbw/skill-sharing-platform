import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

//Added items to Travel Plan List

const failedImages = new Set();

const TravelPlanList = () => {
    const [travelPlans, setTravelPlans] = useState([]);
    const [communityPlans, setCommunityPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('myplans');
    const [searchParams, setSearchParams] = useState({
        subject: '',
        difficulty: '',
        destination: '',
        startDate: '',
        endDate: '',
        maxHours: ''
    });
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);
                const [myPlansResponse, communityResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/plans'),
                    axios.get('http://localhost:8000/api/plans/shared')
                ]);
                setTravelPlans(myPlansResponse.data);
                setCommunityPlans(communityResponse.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching plans:', err);
                setError('Failed to load plans. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const refreshCommunityPlans = async () => {
        try {
            setIsLoading(true);
            const communityResponse = await axios.get('http://localhost:8000/api/plans/shared');
            setCommunityPlans(communityResponse.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching community plans:', err);
            setError('Failed to load community plans. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this travel plan?')) {
            try {
                await axios.delete(`http://localhost:8000/api/plans/${id}`);
                setTravelPlans(travelPlans.filter(plan => plan.id !== id));
            } catch (err) {
                console.error('Error deleting travel plan:', err);
                setError('Failed to delete travel plan. Please try again.');
            }
        }
    };

    const handleShare = async (id) => {
        try {
            await axios.post(`http://localhost:8000/api/plans/${id}/share`, {
                isPublic: true
            });
            setTravelPlans(plans =>
                plans.map(plan =>
                    plan.id === id ? { ...plan, isPublic: true } : plan
                )
            );
            refreshCommunityPlans();
            console.log('Plan is now shared with the community!');
        } catch (error) {
            console.error('Error sharing plan:', error);
            console.log('Failed to share plan');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTravelTypeIcon = (type) => {
        switch (type) {
            case 'SOLO': return 'bi-person';
            case 'FAMILY': return 'bi-people-fill';
            case 'FRIENDS': return 'bi-emoji-smile';
            case 'COUPLE': return 'bi-heart-fill';
            case 'BUSINESS': return 'bi-briefcase-fill';
            default: return 'bi-compass';
        }
    };

    const getAccommodationIcon = (type) => {
        switch (type) {
            case 'HOTEL': return 'bi-building';
            case 'HOSTEL': return 'bi-house-door';
            case 'APARTMENT': return 'bi-house';
            case 'RESORT': return 'bi-umbrella-beach';
            case 'CAMPING': return 'bi-tree';
            default: return 'bi-house';
        }
    };

    const calculateDaysUntilTrip = (startDateString) => {
        if (!startDateString) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(startDateString);
        startDate.setHours(0, 0, 0, 0);
        const timeDiff = startDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff;
    };

    const getImageUrl = (plan) => {
        if (!plan.imageUrl || failedImages.has(plan.imageUrl)) {
            console.log(`No valid image URL for plan ${plan.id}`);
            return null;
        }
        if (plan.imageUrl.startsWith('http://') || plan.imageUrl.startsWith('https://')) {
            console.log(`Using full URL for plan ${plan.id}: ${plan.imageUrl}`);
            return plan.imageUrl;
        }
        const url = `http://localhost:8000/api/plans/images/${plan.imageUrl}`;
        console.log(`Constructed URL for plan ${plan.id}: ${url}`);
        return url;
    };

    const handleSearch = async (e) => {
        e?.preventDefault();
        try {
            setIsLoading(true);
            setIsFiltering(true);

            const queryParams = new URLSearchParams();
            if (searchParams.subject) queryParams.append('subject', searchParams.subject);
            if (searchParams.difficulty) queryParams.append('difficulty', searchParams.difficulty);
            if (searchParams.destination) queryParams.append('destination', searchParams.destination);
            if (searchParams.startDate) {
                const startDate = new Date(searchParams.startDate);
                queryParams.append('startDate', startDate.toISOString());
            }
            if (searchParams.endDate) {
                const endDate = new Date(searchParams.endDate);
                queryParams.append('endDate', endDate.toISOString());
            }
            if (searchParams.maxHours) queryParams.append('maxHours', searchParams.maxHours);

            const url = `http://localhost:8000/api/plans/search?${queryParams}`;
            console.log('Searching with URL:', url);

            const response = await axios.get(url);
            setTravelPlans(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error searching plans:', err);
            setError('Failed to search plans. Please try again later.');
            setIsLoading(false);
        }
    };

    const clearSearch = async () => {
        setSearchParams({
            subject: '',
            difficulty: '',
            destination: '',
            startDate: '',
            endDate: '',
            maxHours: ''
        });
        setIsFiltering(false);

        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8000/api/plans');
            setTravelPlans(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching plans:', err);
            setError('Failed to load plans. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleSearchInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderSearchBar = () => {
        return (
            <div className="mb-4">
                <div className="d-flex align-items-center">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by destination..."
                            name="destination"
                            value={searchParams.destination}
                            onChange={handleSearchInputChange}
                        />
                        <button 
                            className="btn btn-primary" 
                            type="button"
                            onClick={handleSearch}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <button
                        className="btn btn-outline-secondary ms-2"
                        type="button"
                        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                    >
                        <i className={`bi ${isSearchExpanded ? 'bi-chevron-up' : 'bi-sliders'}`}></i>
                    </button>
                    {isFiltering && (
                        <button
                            className="btn btn-outline-danger ms-2"
                            type="button"
                            onClick={clearSearch}
                        >
                            <i className="bi bi-x-circle me-1"></i> Clear
                        </button>
                    )}
                </div>
                
                {isSearchExpanded && (
                    <div className="card mt-2 shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSearch}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Difficulty Level</label>
                                        <select 
                                            className="form-select"
                                            name="difficulty"
                                            value={searchParams.difficulty}
                                            onChange={handleSearchInputChange}
                                        >
                                            <option value="">Any difficulty</option>
                                            <option value="BEGINNER">Beginner</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="ADVANCED">Advanced</option>
                                            <option value="EXPERT">Expert</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Subject/Focus</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="subject"
                                            value={searchParams.subject}
                                            onChange={handleSearchInputChange}
                                            placeholder="e.g. Art, History, Language"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Start Date</label>
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            name="startDate"
                                            value={searchParams.startDate}
                                            onChange={handleSearchInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">End Date</label>
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            name="endDate"
                                            value={searchParams.endDate}
                                            onChange={handleSearchInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Max Hours (Learning Time)</label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            name="maxHours"
                                            value={searchParams.maxHours}
                                            onChange={handleSearchInputChange}
                                            placeholder="e.g. 10"
                                            min="0"
                                        />
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary me-2"
                                            onClick={clearSearch}
                                        >
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            <i className="bi bi-search me-1"></i> Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderGridView = (plans, isCommunity = false) => (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {plans.length > 0 ? (
                plans.map(plan => {
                    const daysUntil = calculateDaysUntilTrip(plan.startDate);
                    const imageUrl = getImageUrl(plan);
                    return (
                        <div className="col" key={plan.id}>
                            <div className="card h-100 shadow-sm hover-card">
                                <div className="position-relative">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={plan.title || 'Travel plan image'}
                                            className="card-img-top"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                console.error(`Image failed to load for plan ${plan.id}:`, imageUrl);
                                                failedImages.add(plan.imageUrl);
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="placeholder-image bg-light d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                            <i className="bi bi-map text-secondary" style={{ fontSize: '3rem' }}></i>
                                        </div>
                                    )}
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <span className="badge bg-primary rounded-pill">
                                            <i className={`bi ${getTravelTypeIcon(plan.travel_type)} me-1`}></i>
                                            {plan.travel_type && plan.travel_type.charAt(0) + plan.travel_type.slice(1).toLowerCase()}
                                        </span>
                                    </div>
                                    {daysUntil !== null && daysUntil >= 0 && (
                                        <div className="position-absolute bottom-0 start-0 p-2">
                                            <span className="badge bg-success rounded-pill">
                                                {daysUntil === 0 ? 'Today!' : `${daysUntil} days until trip`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{plan.title || 'Untitled Journey'}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        <i className="bi bi-geo-alt-fill me-1"></i>
                                        {plan.destination || 'Destination not specified'}
                                    </h6>
                                    <div className="mb-2">
                                        {plan.budget && (
                                            <p className="card-text">
                                                <i className="bi bi-cash-stack me-1"></i>
                                                Budget: {plan.budget} {plan.currency || 'USD'}
                                            </p>
                                        )}
                                        {plan.accommodation && (
                                            <p>
                                                <i className={`bi ${getAccommodationIcon(plan.accommodation)} me-1`}></i>
                                                Accommodation: {plan.accommodation.charAt(0) + plan.accommodation.slice(1).toLowerCase()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <small className="text-muted me-3">
                                            <i className="bi bi-calendar3 me-1"></i>
                                            {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                                        </small>
                                        {plan.budget && (
                                            <small className="text-muted me-3">
                                                <i className="bi bi-cash-stack me-1"></i>
                                                {plan.budget} {plan.currency || 'USD'}
                                            </small>
                                        )}
                                        {plan.difficulty && (
                                            <small className="text-muted me-3">
                                                <i className="bi bi-bar-chart-steps me-1"></i>
                                                {plan.difficulty}
                                            </small>
                                        )}
                                        {plan.completionPercentage !== null && (
                                            <small className="text-muted">
                                                <i className="bi bi-check-circle me-1"></i>
                                                {plan.completionPercentage}% complete
                                            </small>
                                        )}
                                    </div>
                                    {plan.isPublic && !isCommunity && (
                                        <span className="badge bg-info mb-2">
                                            <i className="bi bi-people-fill me-1"></i>
                                            Shared with Community
                                        </span>
                                    )}
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/travel-plan/${plan.id}`} className="btn btn-outline-primary btn-sm">
                                            <i className="bi bi-eye me-1"></i>View
                                        </Link>
                                        {!isCommunity && (
                                            <>
                                                <Link to={`/edit-travel-plan/${plan.id}`} className="btn btn-outline-secondary btn-sm">
                                                    <i className="bi bi-pencil me-1"></i>Edit
                                                </Link>
                                                <Link to={`/travel-quiz/${plan.id}`} className="btn btn-outline-info btn-sm">
                                                    <i className="bi bi-question-circle me-1"></i>Quiz
                                                </Link>
                                                {!plan.isPublic && (
                                                    <button
                                                        className="btn btn-outline-info btn-sm"
                                                        onClick={() => handleShare(plan.id)}
                                                    >
                                                        <i className="bi bi-share me-1"></i>Share
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(plan.id)}
                                                >
                                                    <i className="bi bi-trash me-1"></i>Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="col-12 text-center py-5">
                    <div className="empty-state">
                        <i className="bi bi-map text-muted" style={{ fontSize: '4rem' }}></i>
                        <h3 className="mt-3">No Plans Found</h3>
                        {!isCommunity ? (
                            <>
                                <p className="text-muted">Start planning your next learning journey!</p>
                                <Link to="/travel-plans" className="btn btn-primary mt-3">
                                    <i className="bi bi-plus-circle me-2"></i>Create New Learning Plan
                                </Link>
                            </>
                        ) : (
                            <p className="text-muted">No shared plans in the community yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderListView = (plans, isCommunity = false) => (
        <div className="list-group">
            {plans.length > 0 ? (
                plans.map(plan => {
                    const daysUntil = calculateDaysUntilTrip(plan.startDate);
                    const imageUrl = getImageUrl(plan);
                    return (
                        <div className="list-group-item list-group-item-action hover-card" key={plan.id}>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={plan.title || 'Travel plan image'}
                                                className="rounded"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    console.error(`Image failed to load for plan ${plan.id}:`, imageUrl);
                                                    failedImages.add(plan.imageUrl);
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="placeholder-image bg-light d-flex justify-content-center align-items-center rounded" style={{ width: '80px', height: '80px' }}>
                                                <i className="bi bi-map text-secondary"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="mb-1">{plan.title || 'Untitled Journey'}</h5>
                                        <p className="mb-1">
                                            <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
                                            {plan.destination || 'Destination not specified'}
                                        </p>
                                        <div className="d-flex flex-wrap">
                                            <small className="text-muted me-3">
                                                <i className="bi bi-calendar3 me-1"></i>
                                                {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                                            </small>
                                            {plan.budget && (
                                                <small className="text-muted me-3">
                                                    <i className="bi bi-cash-stack me-1"></i>
                                                    {plan.budget} {plan.currency || 'USD'}
                                                </small>
                                            )}
                                            {plan.accommodation && (
                                                <small className="text-muted">
                                                    <i className={`bi ${getAccommodationIcon(plan.accommodation)} me-1`}></i>
                                                    {plan.accommodation.charAt(0) + plan.accommodation.slice(1).toLowerCase()}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column flex-sm-row gap-2">
                                    {daysUntil !== null && daysUntil >= 0 && (
                                        <span className="badge bg-success rounded-pill my-1">
                                            {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                                        </span>
                                    )}
                                    <div className="btn-group">
                                        <Link to={`/travel-plan/${plan.id}`} className="btn btn-outline-primary btn-sm">
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                        {!isCommunity && (
                                            <>
                                                <Link to={`/edit-travel-plan/${plan.id}`} className="btn btn-outline-secondary btn-sm">
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <Link to={`/travel-quiz/${plan.id}`} className="btn btn-outline-info btn-sm">
                                                    <i className="bi bi-question-circle"></i>
                                                </Link>
                                                {!plan.isPublic && (
                                                    <button
                                                        className="btn btn-outline-info btn-sm"
                                                        onClick={() => handleShare(plan.id)}
                                                    >
                                                        <i className="bi bi-share"></i>
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(plan.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-5">
                    <div className="empty-state">
                        <i className="bi bi-map text-muted" style={{ fontSize: '4rem' }}></i>
                        <h3 className="mt-3">No Plans Found</h3>
                        {!isCommunity ? (
                            <>
                                <p className="text-muted">Start planning your next learning journey!</p>
                                <Link to="/travel-plans" className="btn btn-primary mt-3">
                                    <i className="bi bi-plus-circle me-2"></i>Create New Learning Plan
                                </Link>
                            </>
                        ) : (
                            <p className="text-muted">No shared plans in the community yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Learning Plans</h1>
                <div className="d-flex align-items-center">
                    <div className="btn-group me-2">
                        <button
                            type="button"
                            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="bi bi-grid-3x3-gap-fill"></i>
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <i className="bi bi-list-ul"></i>
                        </button>
                    </div>
                    <Link to="/travel-plans" className="btn btn-success btn-sm">
                        <i className="bi bi-plus-circle me-1"></i> New Plan
                    </Link>
                </div>
            </div>
            {activeTab === 'myplans' && renderSearchBar()}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'myplans' ? 'active' : ''}`}
                        onClick={() => setActiveTab('myplans')}
                    >
                        <i className="bi bi-person-circle me-2"></i>
                        My Learning Plans
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'community' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('community');
                            refreshCommunityPlans();
                        }}
                    >
                        <i className="bi bi-people-fill me-2"></i>
                        Community Plans
                    </button>
                </li>
                {activeTab === 'community' && (
                    <li className="ms-auto">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={refreshCommunityPlans}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Refresh
                        </button>
                    </li>
                )}
            </ul>
            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading plans...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            ) : (
                activeTab === 'myplans' ?
                    (viewMode === 'grid' ? renderGridView(travelPlans) : renderListView(travelPlans)) :
                    (viewMode === 'grid' ? renderGridView(communityPlans, true) : renderListView(communityPlans, true))
            )}
        </div>
    );
};

export default TravelPlanList;