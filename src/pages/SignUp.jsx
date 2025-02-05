import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signUp } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { i18n, t} = useTranslation();
  const isEnglish = i18n.language === 'en';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signUp({ username, email, password });
      toast.success('Signed up successfully please verify your email!');
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
        <h2 className={`text-3xl font-bello font-normal text-black mb-6 ${isEnglish ? 'font-bello' : 'font-cairo font-[300]'}`}>{t('signup')}</h2>
        <div className="mb-4">
          <label className={`block text-[#3b3b39] font-ysab mb-2 ${isEnglish ? 'font-bello font-semibold ' : 'font-cairo font-[300]'}`}>{t('username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block text-[#3b3b39] font-ysab mb-2 ${isEnglish ? 'font-bello font-semibold ' : 'font-cairo font-[300]'}`}>{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <div className="mb-6">
          <label className={`block text-[#3b3b39] font-ysab mb-2 ${isEnglish ? 'font-bello font-semibold ' : 'font-cairo font-[300]'}`}>{t('password')}</label>
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
          {loading ? t('signupButtonLoading') : t('signupButton')}
        </button>
        <div className='text-center mt-4'>
          <p className='mt-4 font-light text-base'>{t('already')} <Link to={"/signin"} className="text-black text-center underline">{t('signin')}</Link></p>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUp;