import React, { useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function SwipeImageNavigator({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    // Swipe threshold
    if (distance > 50) {
      // Swipe left
      nextImage();
    } else if (distance < -50) {
      // Swipe right
      prevImage();
    }
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden w-full h-auto ">
      {/* Display the current image */}
      <div
        className="w-full h-full flex items-center justify-center bg-gray-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Buttons for navigation */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
       
          <GoChevronLeft className="font-normal text-slate-500 cursor-pointer" onClick={prevImage} size={30} />
       
          
          <GoChevronRight className="font-normal text-slate-500 cursor-pointer" onClick={nextImage} size={30} />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-1 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 lg:w-4 lg:h-4 cursor-pointer rounded-full ${
              currentIndex === index ? "bg-slate-600" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
