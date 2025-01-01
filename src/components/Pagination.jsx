import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination mt-6 flex justify-center items-center space-x-2 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border-black text-black rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded border-black ${
            currentPage === i + 1
              ? "border-2 text-black bg-gray-100"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-black bg-white text-black rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
