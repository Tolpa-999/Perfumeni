// ReviewsPagination.jsx
import React, { useState, useEffect } from "react";
import { fetchReviewsApi } from "../utils/api";
import ReviewItem from "./ReviewItem";
import Pagination from "./Pagination";
import SkeletonLoader from "./SkeletonLoader";

const ReviewsPagination = ({ productId, refreshCounter, triggerRefresh }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 5; // Number of reviews per page

  // Function to fetch reviews from the backend
  const fetchReviews = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviewsApi(productId, page, limit);
      // Expected data format: { reviews: [...], totalPages, currentPage }
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews on component mount or when productId, currentPage, or refreshCounter changes.
  useEffect(() => {
    if (productId) {
      fetchReviews(currentPage);
    }
  }, [productId, currentPage, refreshCounter]);

  // Handle pagination page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="reviews-container p-4 -mt-4">
      {loading && <SkeletonLoader count={limit} />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading &&
        !error &&
        (!reviews || (Array.isArray(reviews) && reviews.length === 0)) && (
          <p className="text-black text-xl font-light">
            No reviews found for this product.
          </p>
        )}
      {!loading && !error && Array.isArray(reviews) && reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review._id}
              productId={productId}
              review={review}
              triggerRefresh={triggerRefresh}
            />
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReviewsPagination;
