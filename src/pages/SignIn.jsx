import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from '../utils/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {login} from '../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state?.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  
  const { i18n, t} = useTranslation();
  const isEnglish = i18n.language === 'en';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn({ email, password });

      toast.success('Signed in successfully!');
      const {accessToken, user} = response.data;
      dispatch(login({accessToken, user}));
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start justify-center min-h-screen "
    >
      {/* {console.log('userdata =>', userdata)} */}
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-xl w-full max-w-md mt-20"
      >
        <h2 className={`text-3xl font-bello font-normal text-black mb-6 ${isEnglish ? 'font-bello' : 'font-cairo font-[300]'}`}>{t('signin')}</h2>
        <div className="mb-4">
          <label className={`block text-[rgb(59,59,57)] font-ysab mb-2 font-semibold ${isEnglish ? 'font-bello' : 'font-mada font-[200]'}`}>{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg font-light text-sm outline-none focus:border-black"
            required
          />
        </div>
        <div className="mb-6">
          <label className={`block text-[#3b3b39] font-ysab mb-2 font-semibold ${isEnglish ? 'font-bello' : 'font-cairo font-[200]'}`}>{t('password')}</label>
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
          className="w-full bg-[#ae8b51] text-white py-2 rounded-lg hover:scale hover:bg-[#9f7a41] transition-all"
        >
          {loading ? t('signinButton') : t('signin')}
        </button>
        <div className='text-center mt-4'>
          <p className='mt-4 font-light text-base'>{t('not')} <Link to={"/sign-up"} className="text-black text-center underline">{t('signup')}</Link></p>
        </div>
        
      </form>
    </motion.div>
  );
};

export default SignIn;