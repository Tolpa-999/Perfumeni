// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update document direction if Arabic is selected
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 border rounded ${i18n.language === 'en' ? 'bg-gray-200' : 'text-white'}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 border rounded ${i18n.language === 'ar' ? 'bg-gray-200' : 'text-white'}`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
