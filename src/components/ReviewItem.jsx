import React from "react";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { deleteReviewApi } from "../utils/api";
import { useSelector } from "react-redux";

const ReviewItem = ({ review, id }) => {
  // Function to handle the deletion of the review

  const {user} = useSelector((state) => state?.auth);

  // console.log('reveiw id => ', review.user, 'user id => ', user._id)


  const handleDelete = async ({review, id}) => {
    try {
      // console.log(review._id, id)
      const response = await deleteReviewApi(id, review._id);
      // console.log(response)
      if (response.status === "success") {

        toast.success("Review deleted successfully!");
      }
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while deleting the review."
      );
    }
    
  };

  return (
    <li className="p-3 border-black bg-white border-[.1px] rounded-md shadow-md">
      {
        review.user == user._id && (
          <div className="flex justify-between items-center">
        <span className="text-base font-[200] bg-white text-black">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
        <button 
          onClick={() => handleDelete({review, id})}
          className="text-black bg-white border-black text-sm font-light"
        >
          Delete
        </button>
      </div>
        )
      }
      

      <p className="mt-2 text-gray-800 text-[1.2rem] leading-relaxed font-bello font-[500]">
        {review.comment || "No comment provided."}
      </p>

      <div className="mt-2 flex justify-between space-x-4">
        <span className="font-light text-[.9rem] text-center flex items-center">
          <i className="mr-2">Rating </i>
          <span>{review.rating}</span>
        </span>
        <p className="text-sm font-light text-black">
          By {review.username || "Anonymous"}
        </p>
      </div>
    </li>
  );
};

export default ReviewItem;
