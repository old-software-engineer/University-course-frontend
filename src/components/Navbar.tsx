import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, User, Menu, X } from 'react-feather';

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          University Courses
        </Link>
        <div className="hidden md:flex items-center space-x-4">
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
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-start bg-teal-500 p-4 space-y-2">
          <Link to="/" className="text-white flex items-center" onClick={toggleMenu}>
            <Home className="h-6 w-6 mr-1" /> Home
          </Link>
          <Link to="/courses" className="text-white flex items-center" onClick={toggleMenu}>
            <BookOpen className="h-6 w-6 mr-1" /> Courses
          </Link>
          {token ? (
            <>
              <Link to="/my-courses" className="text-white flex items-center" onClick={toggleMenu}>
                <User className="h-6 w-6 mr-1" /> My Courses
              </Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
