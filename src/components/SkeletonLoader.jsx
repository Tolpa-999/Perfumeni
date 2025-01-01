import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ count }) => {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx} className="border p-4 rounded-lg shadow-sm bg-white">
          <Skeleton height={24} width="60%" className="mb-2" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={15} width="80%" className="mt-2" />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonLoader;
