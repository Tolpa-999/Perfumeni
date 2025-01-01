import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles
import { addReviewApi } from "../utils/api";
import ReviewsPagination from "./ReviewsPaginatin";

const Reviews = ({ productId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [reviews, setReviews] = useState([]);

  const onSubmit = async (data) => {
    try {
      // Post the review data
      const reviewData = {
        user: data.user,
        comment: data.comment,
        rating: parseFloat(data.rating), // Ensure rating is a number
      };
      const response = await addReviewApi(productId, reviewData);
      toast.success(response.message);

      // Optionally, update the reviews list without a reload
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
      reset(); // Reset the form
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while submitting the review."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-[#3b3b39] font-semibold mt-5 mb-3">Reviews</h2>
      <ReviewsPagination productId={productId} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* User Input */}
        <input
          {...register("user", { required: true })}
          className="w-full p-2 bg-[white] border border-black rounded text-base font-light text-[black] focus:outline-none placeholder-[#858580]"
          placeholder="Enter your username"
          style={{ letterSpacing: "1px" }}
        />

        {/* Comment Input */}
        <textarea
          {...register("comment", { required: true })}
          className="w-full p-2 bg-[white] border border-black rounded text-base font-light text-[black] focus:outline-none placeholder-[#858580]"
          placeholder="Write your review"
          style={{ letterSpacing: "1px" }}
        />

        {/* Rating Input */}
        <select
          {...register("rating", { required: true })}
          className="w-full p-2 bg-[white] border border-black rounded text-base font-light text-[black] "
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
          className="bg-[white] text-black px-4 py-2 rounded mt-2 hover:bg-[#f4f4f4] transition-all duration-[.1s] border-black"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
