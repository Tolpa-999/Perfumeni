import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';


// StarRating component
const StarRating = ({ numOfRatings, maxStars = 5, size = 1.25 }) => {
  const stars = [];

  // Create an array of filled and empty stars
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i}>
        {i <= numOfRatings ? <FaStar color='black'/> : <FaRegStar color='black' />}
      </span>
    );
  }

  return <i className='flex gap-2 text-[#f2f2f4]' style={{ fontSize: `${size}rem` }} >{stars}</i>;
};

export default StarRating;

