import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import StarRating from '../utils/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, addFavorite } from '../store/slices/favoriteSlice';
import {addToCart, removeFromCart } from '../store/slices/cartSlice'
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FaCartPlus } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);


  const dispatch = useDispatch();

  const isFavorite = useSelector((state) => state?.favorites?.find((item) => item._id === product._id));
  // const isFavorite = 

  const isInCart = useSelector((state) => state?.cart?.find((item) => item._id === product._id));

  // console.log(`favorites:`, favorites);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product._id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    navigate('/shopping-cart');
  };

  // Animation variants for the product card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };


  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={'visible'}
      className="max-md:w-[80%] max-md:my-6 md:m-4 place-self-center rounded-2xl overflow-hidden bg-white shadow-lg text-center relative"
    >
      {/* Link to the product details page */}
      <Link to={`/product/${product._id}`}>
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </Link>
      <div className="px-6 py-4">
        <Link to={`/product/${product._id}`}>
          <h2
            className="text-3xl font-bello font-bold mb-2 text-[#3b3b39]"
          >
            {product.name}
          </h2>
        </Link>
        <p
          className="text-[#3b3b39] font-ysab font-[400] text-xl line-clamp-3"
        >
          {product.description}
        </p>

        {/* Ratings and sizes */}
        <div
          className="flex justify-around my-5"
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
        </div>

        {/* Price and Buy button */}
        <div
          className="flex justify-around"
        >
          <p className="text-[#3b3b39] text-[1.4rem] font-sans font-light mt-4">${product.price}</p>
          <button
            // onClick={handleBuyNow}
            className="mt-4 px-3 py-[.1rem] bg-[#f2f2f4] font-sans
             text-[#485844] rounded-lg font-light border-[#9f9f9f]  duration-100"
          >
            {/* <FaCartPlus size={22} color='' />
            
             */}
            { isInCart ? <BsFillCartCheckFill size={22} onClick={handleAddToCart} color='green' /> : <FaCartPlus size={22} onClick={handleAddToCart} /> }
          </button>
        </div>
      </div>

      {/* Always visible favorite icon */}
      <div
        className="absolute  top-7 right-6 cursor-pointer"
        onClick={handleFavorite}
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 lg:text-2xl text-xl " />
        ) : (
          <FaRegHeart className='lg:text-2xl text-xl  ' />
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
