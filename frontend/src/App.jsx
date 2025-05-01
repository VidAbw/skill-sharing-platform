import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TravelPlanForm from './components/TravelPlanForm';
import ViewPlanList from './components/ViewPlanList';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navbar from './Nav/Navbar';
import Footer from './Nav/Footer';
import HomeTravelPlan from './components/HomeTravelPlan';
import TravelPlanList from './components/TravelPlanList';
import TravelLearningProgress from './components/TravelLearningProgress';
import TravelLearningQuestions from './components/TravelLearningQuestions';
import EditTravelPlan from './components/EditTravelPlan';

function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <div className="App">
               
                <Routes>
                    <Route path="/" element={<HomeTravelPlan />} />
                    <Route path="/travel-plans" element={<TravelPlanForm />} />
                    <Route path="/travel-planlist" element={<TravelPlanList />} />
                    <Route path="/travel-plan/:id" element={<ViewPlanList />} />
                    <Route path="/travel-progress/:id" element={<TravelLearningProgress />} />
                    {/* Removed SharedTravelPlans route */}
                    <Route path="/shared-plan/:id" element={<ViewPlanList shared={true} />} />
                    <Route path="/travel-quiz/:id" element={<TravelLearningQuestions />} />
                    <Route path="/edit-travel-plan/:id" element={<EditTravelPlan />} />
                    
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;