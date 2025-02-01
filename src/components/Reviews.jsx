// Reviews.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addReviewApi } from "../utils/api";
import ReviewsPagination from "./ReviewsPaginatin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Reviews = ({ productId }) => {
  const { register, handleSubmit, reset } = useForm();
  // refreshCounter triggers the review list to refresh when updated
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // This function triggers a refresh in the ReviewsPagination component.
  const triggerRefresh = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    try {
      // Prepare review data
      const reviewData = {
        user: user._id,
        username: user.username,
        comment: data.comment,
        rating: parseFloat(data.rating), // Ensure rating is a number
      };
      // Post the review
      const response = await addReviewApi(productId, reviewData);
      toast.success(response.message);
      // Trigger the refresh callback to update the reviews list
      triggerRefresh();
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "An error occurred while submitting the review."
      );
    }
  };

  return (
    <div className="reviews-wrapper">
      <h2 className="text-2xl text-[#3b3b39] font-semibold mt-5 mb-3">
        Reviews
      </h2>
      {/* Pass refreshCounter and triggerRefresh callback to ReviewsPagination */}
      <ReviewsPagination
        productId={productId}
        refreshCounter={refreshCounter}
        triggerRefresh={triggerRefresh}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {isAuthenticated ? (
          <>
            <textarea
              {...register("comment", { required: true })}
              className="w-full p-2 bg-white border border-black rounded text-base font-light text-black focus:outline-none placeholder-gray-500"
              placeholder="Write your review"
              style={{ letterSpacing: "1px" }}
            />
            {/* Rating Input */}
            <select
              {...register("rating", { required: true })}
              className="w-full p-2 bg-white border border-black rounded text-base font-light text-black"
              defaultValue=""
            >
              <option value="" disabled>
                Select a rating
              </option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded mt-2 border hover:bg-gray-100 transition-all duration-100"
            >
              Submit Review
            </button>
          </>
        ) : (
          <div className="text-black text-center font-sans font-medium text-lg">
            <Link className="underline font-bold" to="/signin">
              Sign in
            </Link>{" "}
            to add a review
          </div>
        )}
      </form>
    </div>
  );
};

export default Reviews;
