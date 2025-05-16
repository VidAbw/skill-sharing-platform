import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllLearningProgress, deleteLearningProgress } from '../../api/api';
import ProgressItem from './ProgressItem';
import LikeButton from '../LikeButton';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/ProgressList.css';

const ProgressList = () => {
  const [progressItems, setProgressItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

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

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="progress-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Learning Progress Updates</h1>
        <Link to="/progress/new" className="add-progress-btn">
          + Add Progress
        </Link>
      </div>
      {progressItems.length === 0 ? (
        <p>No progress updates found.</p>
      ) : (
        progressItems.map((progress) => (
          <div key={progress.id} className="progress-item">
            <ProgressItem progress={progress} onDelete={handleDelete} />
            {user && <LikeButton postId={progress.id} userId={user.id} />}
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressList;