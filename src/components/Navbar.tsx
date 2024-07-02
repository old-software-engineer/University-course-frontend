import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, User } from 'react-feather';

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-teal-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          University Courses
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white flex items-center">
            <Home className="h-6 w-6 mr-1" /> Home
          </Link>
          <Link to="/courses" className="text-white flex items-center">
            <BookOpen className="h-6 w-6 mr-1" /> Courses
          </Link>
          {token ? (
            <>
              <Link to="/my-courses" className="text-white flex items-center">
                <User className="h-6 w-6 mr-1" /> My Courses
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
