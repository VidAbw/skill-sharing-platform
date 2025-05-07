import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Progress.css';

const ProgressItem = ({ progress, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="progress-card">
      <h3>{progress.title}</h3>
      <p className="progress-content">{progress.content}</p>
      
      <div className="progress-metadata">
        <span>Posted: {formatDate(progress.createdAt)}</span>
        {progress.updatedAt !== progress.createdAt && 
          <span>Updated: {formatDate(progress.updatedAt)}</span>
        }
        {progress.user && 
          <span>By: {progress.user.fullName || progress.user.email}</span>
        }
      </div>
      
      <div className="progress-actions">
        <Link to={`/progress/edit/${progress.id}`} className="btn-edit">Edit</Link>
        <button onClick={() => onDelete(progress.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default ProgressItem;