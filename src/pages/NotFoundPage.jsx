import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const NotFoundPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-black text-center"
      initial={{ opacity: 0 }} // Fade in the whole page
      animate={{ opacity: 1 }} // Fully visible after animation
      exit={{ opacity: 0 }} // Fade out when leaving
      transition={{ duration: 1 }} // Duration for fading in
    >
      {/* Title Animation */}
      <motion.h1
        className="text-6xl font-bello mb-4"
        initial={{ y: -100, opacity: 0 }} // Start from above the screen and invisible
        animate={{ y: 0, opacity: 1 }} // Final position and fully visible
        transition={{ duration: 1, delay: 0.2 }}
      >
        404 - Page Not Found
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        className="text-2xl font-medium font-bello mb-8 max-w-xl mx-auto"
        initial={{ x: -200, opacity: 0 }} // Slide in from the left with fade
        animate={{ x: 0, opacity: 1 }} // Final position and fully visible
        transition={{ duration: 1, delay: 0.4 }}
      >
        Oops! It seems like you've landed on a page that doesn't exist. Try going back to the homepage or explore other sections.
      </motion.p>

      {/* Animated Button */}
      <motion.button
        className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:border-black transition-all duration-300"
        initial={{ scale: 0 }} // Button starts small
        animate={{ scale: 1 }} // Button grows to normal size
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={() => window.location.href = '/'} // Redirect to home page
      >
        Go to Homepage
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;
