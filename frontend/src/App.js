import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProgressList from "./components/learningProgress/ProgressList";
import ProgressForm from "./components/learningProgress/ProgressForm";
import TravelGuideList from "./components/travelGuides/TravelGuideList";
import TravelGuideForm from "./components/travelGuides/TravelGuideForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header /> {/* Always visible */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/profile/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="" element={<ProfilePage />} />
                  <Route path=":id" element={<ProfilePage />} />
                </Routes>
              </PrivateRoute>
            }
          />
          <Route path="/progress" element={
            <PrivateRoute>
              <ProgressList />
            </PrivateRoute>
          } />
          <Route path="/progress/new" element={
            <PrivateRoute>
              <ProgressForm />
            </PrivateRoute>
          } />
          <Route path="/progress/edit/:id" element={
            <PrivateRoute>
              <ProgressForm />
            </PrivateRoute>
          } />
          <Route path="/travel-guides" element={
            <PrivateRoute>
              <TravelGuideList />
            </PrivateRoute>
          } />
          <Route path="/travel-guides/new" element={
            <PrivateRoute>
              <TravelGuideForm />
            </PrivateRoute>
          } />
          <Route path="/travel-guides/:id" element={
            <PrivateRoute>
              <TravelGuideForm />
            </PrivateRoute>
          } />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
