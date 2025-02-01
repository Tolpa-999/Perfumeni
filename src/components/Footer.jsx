// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiDelicatePerfume } from 'react-icons/gi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { t } from 'i18next';

const Footer = () => {
  return (
    <footer className="bg-[#f9f7f6] text-[#3b3b39] pt-10 ">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo and Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Brand / Logo */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <GiDelicatePerfume size={40} className="mr-2" />
              <span className="text-3xl font-bello">Perfumeni</span>
            </Link>
            <p className="mt-2 text-sm font-light">{t('luxury')}</p>
          </div>

          {/* Quick Links and Support Links */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('links')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-gray-500 transition-colors">
                  {t('home')}
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-gray-500 transition-colors">
                  {t('products')}
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="hover:text-gray-500 transition-colors">
                  {t('favourite')}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-gray-500 transition-colors">
                    {t('cart')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-gray-500 transition-colors">
                  {t('about')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-500 transition-colors">
                  {t('contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-gray-500 transition-colors">
                  {t('privacy')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-500 transition-colors">
                  {t('terms')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section: Social Media and Newsletter Signup */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 pb-4">
          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex space-x-4 mb-4 md:mb-0"
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <FaTwitter className='mr-1' />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </motion.div>

          {/* Newsletter Signup */}
          <div className="flex items-center">
            <input
              type="email"
              placeholder={t('placeholder')}
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-light mx-4"
            />
            <button className="px-4 py-2 bg-[#ae8b51] text-white rounded-r-md hover:bg-[#9e7543] transition-colors">
            {t('subscribe')}
            </button>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center text-sm text-black border-t font-normal border-gray-200 p-4">
          &copy; {new Date().getFullYear()} {t('rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
