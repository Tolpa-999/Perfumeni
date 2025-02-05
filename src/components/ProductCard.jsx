import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarRating from '../utils/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, addFavorite } from '../store/slices/favoriteSlice';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { FaHeart, FaRegHeart, FaCartPlus } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FiZoomIn } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en";

  // Selectors
  const isFavorite = useSelector((state) => 
    state?.favorites?.find((item) => item._id === product._id)
  );
  const isInCart = useSelector((state) => 
    state?.cart?.find((item) => item._id === product._id)
  );

  // Handlers
  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(product._id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: 'easeOut' 
      } 
    },
    hover: {
      scale: 1.02,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer w-full max-w-[350px] mx-auto"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <FiZoomIn className="text-white text-3xl" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-2xl font-bello font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base line-clamp-3 mb-4 font-light">
          {product.description}
        </p>

        {/* Rating and Sizes */}
        <div className="flex justify-between items-center mb-4 max-md:flex-col">
          <div className="flex items-center space-x-2">
            <StarRating numOfRatings={Math.round(product.rating)} />
            <span className="text-sm text-gray-500 font-light">
              ({product.reviews?.length || 0})
            </span>
          </div>
          <span className="text-sm max-md:mt-2 text-gray-500 font-light">
            {t('manySizes', { sizes: product.sizes.length })} 
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-sans font-normal text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleCart}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
              {isInCart ? (
                <BsFillCartCheckFill className="text-green-500 text-xl" />
              ) : (
                <FaCartPlus className="text-gray-700 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-700 text-xl" />
        )}
      </button>

      {/* In Cart Badge */}
      {isInCart && (
        <div className="absolute top-4 left-4 bg-green-500 text-white font-normal px-2 py-1 rounded-full text-xs">
          In Cart
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;