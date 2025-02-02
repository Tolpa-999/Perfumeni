import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaHeart, FaTimes } from 'react-icons/fa';
import { PiShoppingCartSimple, PiShoppingCartSimpleBold, PiShoppingCartSimpleThin } from 'react-icons/pi';
import { GiDelicatePerfume } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutApi } from '../utils/api';
import { logout } from '../store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect route changes
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state?.favorites);
  const auth = useSelector((state) => state?.auth);
  const cart = useSelector((state) => state?.cart);
  const { i18n, t} = useTranslation();
  const isEnglish = i18n.language === 'en';


  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock/Unlock scroll based on menu state
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'auto'; // Restore scroll
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isMenuOpen]);


  async function handleLogout() {
    await logoutApi()
    dispatch(logout());
    navigate('/signin');
  }

  return (
    <motion.nav
      transition={{ duration: 1.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-[white] mb-1"
    >
      <nav className="p-4 text-[#3b3b39]">
        <div className="container mx-auto flex justify-between items-center flex-row-reverse">
          {/* Logo */}
          <h1
            className="text-3xl font-Agu flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            Perfumeni
            <GiDelicatePerfume
              style={{ marginLeft: '9px', transform: 'rotate(20deg)', }}
              size={40}
            />
          </h1>

          {/* Hamburger Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Responsive Navbar Menu */}
          {isMenuOpen && (
            <motion.div
              className="fixed z-30 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-1/3 bg-white h-full shadow-lg"
                initial={{ x: `${isEnglish ? '-100%' : '100%'}` }}
                animate={{ x: 0 }}
                exit={{ x: `${isEnglish ? '-100%' : '100%'}` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="container mx-auto flex flex-col items-center p-4 relative">
                  {/* Close Button */}
                  <FaTimes
                    className="text-black text-3xl cursor-pointer absolute top-5 right-5"
                    onClick={() => setIsMenuOpen(false)}
                  />

                  {/* Menu Items */}
                  <ul className="flex flex-col space-y-6 text-xl text-black mt-16">
                    <li>
                      <Link
                        to="/"
                        className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-normal`}
                        
                      >
                        {t('home')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-normal`}
                      >
                        {t('products')}
                      </Link>
                    </li>
                    <li className="relative">
                      <Link
                        to="/favorites"
                        className="hover:text-gray-400 font-ysab text-xl font-bold"
                      >
                        {favorites.length > 0 && auth.isAuthenticated && (
                          <i className="absolute -top-[.9rem] right-[3.2rem] text-xs font-medium font-sans text-white z-50 bg-red-500 w-[.9rem] h-[.9rem] rounded-full text-center" style={ isEnglish ? { left: '20px', lineHeight: '.9rem' } : {right: '20px', lineHeight: '.9rem' } }>
                            {favorites.length}
                          </i>
                        )}
                        <FaHeart size={19} className="cursor-pointer font-light" />
                      </Link>
                    </li>
                    <li className='relative'>
                      <Link
                        to="/cart"
                        className="hover:text-gray-400"
                      >
                        {cart.length > 0 && auth.isAuthenticated && (
                          <i className="absolute -top-[.9rem] right-[3.2rem] text-xs font-medium font-sans text-white z-50 bg-red-500 w-[.9rem] h-[.9rem] rounded-full text-center" style={ isEnglish ? { left: '20px', lineHeight: '.9rem' } : {right: '20px', lineHeight: '.9rem' } }>
                            {cart.length}
                          </i>
                        )}
                        <PiShoppingCartSimple size={20} className="cursor-pointer font-light" />
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <p
                        className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-normal cursor-pointer`}
                      >
                        {t('logout')}
                      </p>
                    </li>
                    <div className="mx-3">
                      <LanguageSwitcher />
                    </div>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Regular Navbar Items for Larger Screens */}
          <ul className="hidden md:flex space-x-3 items-center gap-5">
            <li>
              <Link to="/" className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-medium`}>
              {t('home')}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-medium`}
              >
                {t('products')}
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/favorites"
                className="hover:text-gray-400 font-ysab text-xl font-bold"
              >
                {favorites.length > 0 && auth.isAuthenticated && (
                  <i className="absolute -top-[1rem] right-0 text-xs font-medium font-sans text-white z-50 bg-red-500 w-[.9rem] h-[.9rem] rounded-full text-center" style={ isEnglish ? { left: '20px', lineHeight: '.9rem' } : {right: '20px', lineHeight: '.9rem' } }>
                    {favorites.length}
                  </i>
                )}
                <FaHeart size={19} className="cursor-pointer font-light" />
              </Link>
            </li>
            <li className='relative'>
              <Link to="/cart" className="hover:text-gray-400">
                {cart.length > 0 && auth.isAuthenticated && (
                  <i className='absolute -top-[1rem]  text-xs font-medium font-sans text-white z-50 bg-red-500 w-[.9rem] h-[.9rem] rounded-full text-center' style={ isEnglish ? { left: '20px', lineHeight: '.9rem' } : {right: '20px', lineHeight: '.9rem' } } >
                    {cart.length}
                  </i>
                )}
                <PiShoppingCartSimple size={20} className="cursor-pointer font-light" />
              </Link>
            </li>
            <li>
              <p
                className={`hover:text-gray-400 ${isEnglish ? 'font-ysab' : 'font-cairo'} text-lg font-medium cursor-pointer`} onClick={handleLogout}
              >
                {t('logout')}
              </p>
            </li>
            <div className="m-6">
                  <LanguageSwitcher />
            </div>
          </ul>
        </div>
      </nav>
    </motion.nav>
  );
};

export default Navbar;
