import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import Home from "./pages/Home";

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
          {/* Optional: Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
