import React from "react";
import StarRating from "../utils/StarRating"; // Utility component to display star ratings

const ReviewItem = ({ review }) => {
  return (
    <li className="p-3 border-black border-[.1px] rounded-md shadow-md">
      {/* Header section displaying the review date */}
      <div className="flex justify-between items-center">
        <span className="text-base font-[200] text-black">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Review comment or fallback text */}
      <p className="mt-2 text-gray-800 text-[1.2rem] leading-relaxed font-bello font-[500]">
        {review.comment || "No comment provided."} {/* Displays the comment or a default message */}
      </p>

      {/* Footer section with rating and reviewer details */}
      <div className="mt-2 flex justify-between space-x-4">
        {/* Display the rating using the StarRating component */}
        <span className="font-light text-[.9rem] text-center flex items-center">
          <i className="mr-2">Rating </i> 
          <StarRating numOfRatings={review.rating} size={0.9} /> {/* Show star rating with custom size */}
        </span>

        {/* Display the reviewer name or fallback to 'Anonymous' */}
        <p className="text-sm font-light text-black">
          By {review.user || "Anonymous"} {/* Reviewer name or default text */}
        </p>
      </div>
    </li>
  );
};

export default ReviewItem;
