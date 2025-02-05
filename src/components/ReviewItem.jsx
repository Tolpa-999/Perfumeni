// ReviewItem.jsx
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteReviewApi } from "../utils/api";
import { useSelector } from "react-redux";

const ReviewItem = ({ review, productId, triggerRefresh }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      // Call deleteReviewApi with productId and review._id
      const response = await deleteReviewApi(productId, review._id);
      if (response.status === "success") {
        toast.success("Review deleted successfully!");
        // Trigger a refresh to re-fetch the updated reviews list
        triggerRefresh && triggerRefresh();
      }
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while deleting the review."
      );
    }
  };

  return (
    <li className="p-3 border border-black bg-white rounded-md shadow-md">
      {/* Display delete button if the review belongs to the logged-in user */}
        <div className="flex justify-between items-center">
          <span className="text-base font-light bg-white text-black">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
          {review?.user === user?._id && (
          <button
            onClick={handleDelete}
            className="text-black bg-white border border-black text-sm font-light"
          >
            Delete
          </button>
      )}
      </div>
      <p className="mt-2 text-gray-800 text-xl leading-relaxed font-light">
        {review.comment || "No comment provided."}
      </p>
      <div className="mt-2 flex justify-between items-center">
        <span className="font-light text-sm">
          Rating: <strong>{review.rating}</strong>
        </span>
        <p className="text-sm font-light text-black">
          By {review.username || "Anonymous"}
        </p>
      </div>
    </li>
  );
};

export default ReviewItem;
