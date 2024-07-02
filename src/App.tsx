import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/my-courses" element={<PrivateRoute><MyCourses /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default App;
