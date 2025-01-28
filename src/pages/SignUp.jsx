import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signUp } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signUp({ username, email, password });
      toast.success('Signed up successfully!');
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      toast.error(error.message || 'Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start justify-center min-h-screen bg-gradient-to-r from-[#f9f7f6] via-[#f6f5f4] to-[#f9f7f6]"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20"
      >
        <h2 className="text-3xl font-bello font-normal text-black mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-[#3b3b39] font-ysab mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#3b3b39] font-ysab mb-2 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#3b3b39] font-ysab mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ae8b51] text-white py-2 rounded-lg hover:bg-[#9f7a41] transition-all"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div className='text-center mt-4'>
          <p className='mt-4 font-light text-base'>Already have an account ? <Link to={"/signin"} className="text-black text-center underline">Sign In</Link></p>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUp;