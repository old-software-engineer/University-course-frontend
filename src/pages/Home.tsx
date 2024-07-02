import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to University Courses</h1>
      <div className="flex justify-center">
        <Link to="/courses" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
          View Courses
        </Link>
      </div>
    </div>
  );
};

export default Home;
