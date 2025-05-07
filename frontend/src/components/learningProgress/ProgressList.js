import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllLearningProgress, deleteLearningProgress } from '../../api/api';
import ProgressItem from './ProgressItem';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Progress.css';

const ProgressList = () => {
  const [progressItems, setProgressItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchProgressList();
  }, []);

  const fetchProgressList = async () => {
    try {
      setLoading(true);
      const response = await getAllLearningProgress();
      setProgressItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch learning progress:', err);
      setError('Failed to load learning progress updates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress update?')) {
      try {
        await deleteLearningProgress(id);
        // Remove deleted item from state
        setProgressItems(progressItems.filter(item => item.id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
        alert('Failed to delete progress update');
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading progress updates...</div>;
  }

  return (
    <div className="progress-list">
      <div className="progress-header">
        <h1>Learning Progress Updates</h1>
        {currentUser && (
          <Link to="/progress/new" className="btn-create">
            Add New Progress
          </Link>
        )}
      </div>

      {error && <div className="error">{error}</div>}
      
      {!error && progressItems.length === 0 ? (
        <div className="no-progress-message">
          <p>No progress updates found.</p>
          {currentUser && (
            <p>Share your learning journey by adding your first progress update!</p>
          )}
        </div>
      ) : (
        <div className="progress-grid">
          {progressItems.map(progress => (
            <ProgressItem 
              key={progress.id} 
              progress={progress}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressList;