import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#f9f7f6] z-50">
      {/* Animated Container */}
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Infinite Rotating Spinner */}
        <motion.div
          className="text-6xl text-[#ae8b51] mb-4"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
        >
          <FaSpinner />
        </motion.div>

        {/* Fading In Loading Text */}
        <motion.h2 
          className="text-2xl font-bold font-ysab text-[#3b3b39]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Loading...
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
