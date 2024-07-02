import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'react-feather';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailPattern.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        login(data.token);
        navigate('/');
        toast.success('Successfully logged in!');
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error logging in');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-center my-8">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-6">
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(false)} />
            ) : (
              <Eye className="h-5 w-5 text-gray-700" onClick={() => setShowPassword(true)} />
            )}
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Login
        </button>
        <div className='w-full flex justify-center mt-3'>
          <p>New User? <Link className="text-center mx-auto hover:bg-teal-500 hover:text-white py-2 rounded bg-white text-teal-600" to='/register'>Register</Link> now</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
