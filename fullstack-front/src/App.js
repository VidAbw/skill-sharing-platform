import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navebar';
import Footer from './components/Footer'; // ✅ New import

import HomePage from './pages/Homepage';
import CreatePostPage from './pages/CreatePostPage';
import ItineratyPage from './pages/ItineratyPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/new" element={<CreatePostPage />} />
          <Route path="/itinerary/new" element={<ItineratyPage />} />
          <Route path="/post/edit/:id" element={<EditPostPage />} />
          
        </Routes>
      </div>
      
      <Footer /> {/* ✅ Added footer */}
    </div>
  );
}

export default App;
