import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { GiDelicatePerfume } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <motion.nav
      transition={{ duration: 1.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      <nav className="p-4 text-[#3b3b39]">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-3xl font-Agu flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <GiDelicatePerfume
              style={{ marginRight: '7px', transform: 'rotate(30deg)' }}
              size={40}
            />
            Perfumeni
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
              className="fixed z-30 top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-2/3 bg-white h-full shadow-lg"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
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
                        className="hover:text-gray-400 font-ysab"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="hover:text-gray-400 font-ysab"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="hover:text-gray-400 font-ysab"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="hover:text-gray-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <PiShoppingCartSimpleLight size={24} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Regular Navbar Items for Larger Screens */}
          <ul className="hidden md:flex space-x-3 items-center">
            <li>
              <Link to="/" className="hover:text-gray-400 font-ysab text-2xl">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 font-ysab text-2xl"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 font-ysab text-2xl"
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-400">
                <PiShoppingCartSimpleLight size={40} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </motion.nav>
  );
};

export default Navbar;
