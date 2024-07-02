import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'react-feather';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim() || !emailPattern.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        degree,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        login(response.data.token);
        toast.success('Successfully Registered!');
        navigate('/');
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error registering');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-center my-8">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 my-auto top-6">
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(false)} />
            ) : (
              <Eye className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(true)} />
            )}
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-6">
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(false)} />
            ) : (
              <Eye className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(true)} />
            )}
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Degree</label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select your degree</option>
            <option value="MCA">Masters in Computers Application</option>
            <option value="CS">Computer Science</option>
            <option value="BCA">Bachelors in Computers Application</option>
            <option value="MBA">Master of Business Administration</option>
            <option value="B.Tech">B.Tech</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Register
        </button>
        <div className='w-full flex justify-center mt-3'>
          <p>Already have an account? <Link className="text-center mx-auto hover:bg-teal-500 hover:text-white py-2 rounded bg-white text-teal-600" to='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
