// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProgressList from './components/ProgressList';
import ProgressForm from './component/ProgressForm';
import TravelGuideSearch from './components/TravelGuideSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Skill-Sharing & Learning Platform for Travelers</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/progress">Learning Progress</a></li>
              <li><a href="/guides">Travel Guides</a></li>
            </ul>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/progress" element={<ProgressList />} />
            <Route path="/create-progress" element={<ProgressForm />} />
            <Route path="/edit-progress/:id" element={<ProgressForm />} />
            <Route path="/guides" element={<TravelGuideSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
