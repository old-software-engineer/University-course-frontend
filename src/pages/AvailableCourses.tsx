import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import toast from 'react-hot-toast';

interface Course {
  _id: string;
  name: string;
  description: string;
}

const AvailableCourses: React.FC = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [coursesPage, setCoursesPage] = useState(1);
  const COURSES_PER_PAGE = 10;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourses(data);
        setDisplayedCourses(data.slice(0, COURSES_PER_PAGE));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [token]);

  const handleRegister = async (courseId: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course Successfully Registered');
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error registering for course');
    }
  };

  const loadMoreCourses = () => {
    const nextPage = coursesPage + 1;
    setCoursesPage(nextPage);
    setDisplayedCourses(courses.slice(0, nextPage * COURSES_PER_PAGE));
  };

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedCourses.map(course => (
          <Card
            key={course._id}
            title={course.name}
            description={course.description}
            action={() => handleRegister(course._id)}
            actionLabel="Register"
          />
        ))}
      </div>
      {displayedCourses.length < courses.length && (
        <button
          onClick={loadMoreCourses}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default AvailableCourses;
