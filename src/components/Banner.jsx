import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const Banner = () => {
  const { i18n, t} = useTranslation();
  const isEnglish = i18n.language === 'en';
  return (
    <div
      className="relative p-8 text-center bg-[#f9f7f6] font-extralight overflow-hidden"
    >
      {/* Background Animation */}

      {/* Static Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-6xl text-[#ae8b51] font-bello"
      >
        {t('explore')}
      </motion.div>

      {/* Interactive Button */}
      <button
        className="relative z-10 mt-6 px-4 py-2 bg-white text-black rounded-lg border font-light transition-all duration-300 ease-in-out hover:border-black -bottom-5"
      >
        {t('shop')}
      </button>

      {/* Call-to-Action Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-16 left-0 w-full text-center text-[#3b3b39] font-light text-lg"
      >
        {t('scroll')}
      </motion.div>
    </div>
  );
};

export default Banner;
