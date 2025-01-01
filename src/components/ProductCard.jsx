import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import StarRating from '../utils/StarRating';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { triggerOnce: true, threshold: 0.2 });

  const handleBuyNow = () => {
    navigate('/shopping-cart');
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

    // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="max-md:w-[80%] max-md:my-6 md:m-4 place-self-center rounded-2xl overflow-hidden bg-[#f2f2f4] shadow-lg text-center"
    >
      {/* Link to the product details page */}
      <Link to={`/product/${product._id}`}>
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}} // Fade in when in view
          transition={{ duration: 0.8 }} // Animation duration for image fade-in
        />
      </Link>
      <div className="px-6 py-4">
        <Link to={`/product/${product._id}`}>
          <motion.h2
            className="text-3xl font-bello font-bold mb-2 text-[#3b3b39]"
            variants={textVariants} // Apply text animation variants
          >
            {product.name}
          </motion.h2>
        </Link>
        <motion.p
          className="text-[#3b3b39] font-ysab font-[400] text-xl line-clamp-3"
          variants={textVariants} // Apply text animation variants
          transition={{ delay: 0.3 }} // Add delay for smooth staggered animation

        >
          {product.description}
        </motion.p>

        {/* Ratings and sizes information */}
        <motion.div
          className="flex justify-around my-5"
          variants={textVariants}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#252525] font-serif text-base text-start flex items-center">
            <i className="mr-2">Rating</i> <StarRating numOfRatings={Math.round(product.rating)} />
          </p>

          <p className="text-[#323232] font-serif text-lg text-start">
            <i className="text-[#323232] font-bold">
              ({product.sizes.length > 0 ? product.sizes.length : '1'})
            </i>{' '}
            Sizes
          </p>
        </motion.div>

        {/* Price and Buy button */}
        <motion.div
          className="flex justify-around"
          variants={textVariants}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#3b3b39] text-[1.6rem] font-ysab mt-4">${product.price}</p>
          <button
            onClick={handleBuyNow}
            className="mt-4 px-5 py-[.4rem] bg-[#e2e2e2] font-sans text-[#3b3b39] rounded-lg font-light hover:border-black z-10"
          >
            Buy
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
