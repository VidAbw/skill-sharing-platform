import React, { useState, useEffect } from 'react';
import { getAllLearningProgress, deleteLearningProgress } from '../api/api';
import { Link } from 'react-router-dom';
import './ProgressList.css';

const ProgressList = () => {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgressList();
  }, []);

  const fetchProgressList = async () => {
    try {
      setLoading(true);
      const response = await getAllLearningProgress();
      setProgressList(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch learning progress');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress update?')) {
      try {
        await deleteLearningProgress(id);
        // Remove deleted item from state
        setProgressList(progressList.filter(item => item.id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
        alert('Failed to delete progress update');
      }
    }
  };

  if (loading) return <div>Loading progress updates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="progress-list">
      <h2>Learning Progress Updates</h2>
      <Link to="/create-progress" className="btn-create">Add New Progress</Link>
      
      {progressList.length === 0 ? (
        <p>No progress updates found.</p>
      ) : (
        progressList.map(progress => (
          <div key={progress.id} className="progress-card">
            <h3>{progress.title}</h3>
            <p>{progress.content}</p>
            <div className="metadata">
              <span>Posted: {new Date(progress.createdAt).toLocaleDateString()}</span>
              {progress.updatedAt !== progress.createdAt && 
                <span>Updated: {new Date(progress.updatedAt).toLocaleDateString()}</span>
              }
            </div>
            <div className="actions">
              <Link to={`/edit-progress/${progress.id}`} className="btn-edit">Edit</Link>
              <button onClick={() => handleDelete(progress.id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressList;
