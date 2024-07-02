import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import toast, { Toaster } from 'react-hot-toast';

interface Course {
    _id: string;
    name: string;
    description: string;
}

const MyCourses: React.FC = () => {
    const { token } = useAuth();
    const [registeredCourses, setRegisteredCourses] = useState<Course[]>([]);
    const [visibleCourses, setVisibleCourses] = useState(8);

    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setRegisteredCourses(data.registeredCourses);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRegisteredCourses();
    }, [token]);

    const loadMoreCourses = () => {
        setVisibleCourses(visibleCourses + 8);
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-4xl font-bold text-center my-8">Registered Courses</h1>
            <div className="grid grid-cols-3 gap-4">
                {registeredCourses.length > 0 ? (
                    registeredCourses.slice(0, visibleCourses).map(course => (
                        <Card
                            key={course._id}
                            title={course.name}
                            description={course.description}
                            action={() => { }}
                            actionLabel="Registered"
                        />
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">You haven't registered for any courses yet.</p>
                )}
            </div>
            {visibleCourses < registeredCourses.length && (
                <div className="flex justify-center mt-8">
                    <button onClick={loadMoreCourses} className="bg-teal-500 text-white px-4 py-2 rounded">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyCourses;
