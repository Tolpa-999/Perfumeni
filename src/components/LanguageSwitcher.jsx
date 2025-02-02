// src/components/LanguageSwitcher.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update document direction if Arabic is selected
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-4 items-center">
      <motion.button
        onClick={() => changeLanguage('en')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full border transition-colors duration-300 text-sm
          ${i18n.language === 'en' 
            ? 'bg-[#ae8b51] text-white border-[#ae8b51]' 
            : 'bg-transparent text-[#ae8b51] border-[#ae8b51]'}`}
      >
        English
      </motion.button>
      <motion.button
        onClick={() => changeLanguage('ar')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full border transition-colors duration-300 text-sm
          ${i18n.language === 'ar' 
            ? 'bg-[#ae8b51] text-white border-[#ae8b51]' 
            : 'bg-transparent text-[#ae8b51] border-[#ae8b51]'}`}
      >
        العربية
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
