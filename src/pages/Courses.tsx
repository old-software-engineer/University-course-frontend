import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import toast, { Toaster } from 'react-hot-toast';

interface Course {
    _id: string;
    name: string;
    description: string;
}

const Courses: React.FC = () => {
    const { token } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [visibleCourses, setVisibleCourses] = useState(6);

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
                toast.success("Course Successfully Registered")
            }
            else {
                toast.error(data.msg);
            }
        } catch (err) {
            console.error(err);
            toast.error('Error registering for course');
        }
    };

    const loadMoreCourses = () => {
        setVisibleCourses(visibleCourses + 6);
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-4xl font-bold text-center my-8">Available Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.slice(0, visibleCourses).map(course => (
                    <Card
                        key={course._id}
                        title={course.name}
                        description={course.description}
                        action={() => handleRegister(course._id)}
                        actionLabel="Register"
                    />
                ))}
            </div>
            {visibleCourses < courses.length && (
                <div className="flex justify-center mt-8">
                    <button onClick={loadMoreCourses} className="bg-teal-500 text-white px-4 py-2 rounded">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Courses;
