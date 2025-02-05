// Reviews.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addReviewApi } from "../utils/api";
import ReviewsPagination from "./ReviewsPaginatin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { t } from "i18next";

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
      <h2 className="text-2xl text-[#3b3b39] font-semibold mt-5 mb-3 font-bello">
        {t('reviews')}
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
                {t('select_rating')}
              </option>
              <option value="1">1 - {t('bad')}</option>
              <option value="2">2 - {t('fair')}</option>
              <option value="3">3 - {t('good')}</option>
              <option value="4">4 - {t('very_good')}</option>
              <option value="5">5 - {t('perfect')}</option>
            </select>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded mt-2 border hover:bg-gray-100 transition-all duration-100 border-black"
            >
              {t('submit_review')}
            </button>
          </>
        ) : (
          <div className="text-black text-center font-sans font-medium text-lg">
            <Link className="underline font-bold m-2" to="/signin">
              {t('signin')}
            </Link>
            {t('to_add_review')}
          </div>
        )}
      </form>
    </div>
  );
};

export default Reviews;
