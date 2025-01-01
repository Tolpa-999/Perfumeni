import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  // offers we want to display
  const offers = [
    "Explore Our Latest Collection",
    "Special Discount on New Arrivals",
    "Up to 50% Off on Selected Items",
    "Shop the Trendiest Styles Today",
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  // Cycle through offers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prevOffer) => (prevOffer + 1) % offers.length);
    }, 5000); // Change offer every 5 seconds
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative p-8 text-center bg-gradient-to-r from-[#f9f7f6] via-[#f6f5f4] to-[#f9f7f6] font-extralight overflow-hidden"
    >
        {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-[#ae8b51] opacity-10"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating Offers */}
      <AnimatePresence>
        <motion.div
          key={currentOffer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-6xl text-[#ae8b51] font-bello"
        >
          {offers[currentOffer]}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Button */}
      <button
        className="relative z-10 mt-6 px-4 py-2 bg-white text-black rounded-lg border font-light transition-all duration-300 ease-in-out  hover:border-black  -bottom-5"
      >
        Shop Now
      </button>

      {/* Call-to-Action Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-16 left-0 w-full text-center text-[#3b3b39] font-light text-lg"
      >
        Scroll down to discover more!
      </motion.div>
    </motion.div>
  );
};

export default Banner;
