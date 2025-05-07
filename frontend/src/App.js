import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProgressList from "./components/ProgressList"; 
import ProgressForm from "./components/ProgressForm";
import TravelGuideList from "./components/travelGuides/TravelGuideList";
import TravelGuideForm from "./components/travelGuides/TravelGuideForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header /> {/* Always visible */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Profile Routes */}
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
          <Route path="/" element={<Home />} />
          <Route path="/progress" element={<ProgressList />} />
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
          <Route path="/travel-guides" element={<TravelGuideList />} />
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
          {/* Optional: Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
