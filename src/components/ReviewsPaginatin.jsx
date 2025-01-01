import React, { useState, useEffect } from "react";
import { fetchReviewsApi } from "../utils/api";
import ReviewItem from "./ReviewItem";
import Pagination from "./Pagination";
import SkeletonLoader from "./SkeletonLoader";

const ReviewsPagination = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 5; // Number of reviews per page

  // Fetch reviews
  const fetchReviews = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviewsApi(productId, page, limit);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching reviews.");
    } finally {
      setLoading(false);
    }
  };

  // Load reviews on component mount or when `currentPage` changes
  useEffect(() => {
    if (productId) {
      fetchReviews(currentPage);
      
    }
  }, [productId, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  

  return (
    <div className="reviews-container p-4 -mt-4">
      {/* Show loader during data fetching */}
      {loading && <SkeletonLoader count={limit} />}
      {/* Show error message if an error occurs */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Show message if no reviews are found */}
      {!loading && !error && typeof reviews !== "object" && (
        <p className="text-black text-xl font-light">No reviews found for this product.</p>
      )}
      {/* Display reviews if available */}
      {!loading && !error && typeof reviews === "object" && reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews?.map((review) => (
            <ReviewItem key={review._id} review={review} /> // Render each review
          ))}
        </ul>
      )}
      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReviewsPagination;

