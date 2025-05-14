import React, { useEffect, useState } from 'react';
import { fetchProgress } from '../../api/api';

const ProgressList = () => {
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    fetchProgress()
      .then((response) => setProgressList(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Learning Progress</h2>
      <ul>
        {progressList.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressList;