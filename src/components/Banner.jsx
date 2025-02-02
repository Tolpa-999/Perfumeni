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
        className={`relative z-10 text-6xl text-[#ae8b51] ${isEnglish ? 'font-bello' : 'font-mada font-[300]'} `}
      >
        {t('explore')}
      </motion.div>

       {/* Call-to-Action Tagline */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={` w-full text-center text-[#3b3b39] font-light text-lg mt-7 ${isEnglish ? 'font-bello' : 'font-cairo font-[500]'} `}
      >
        {t('scroll')}
      </motion.div>

      {/* Interactive Button */}
      <button
        className={`relative z-10 mt-2  bg-white text-black rounded-lg border font-light transition-all duration-300 ease-in-out hover:border-black -bottom-5 ${isEnglish ? 'font-bello px-4 py-2' : 'font-cairo font-[500] px-2 py-1'} `}
      >
        {t('shop')}
      </button>

    </div>
  );
};

export default Banner;
