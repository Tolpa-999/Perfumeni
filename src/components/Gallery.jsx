import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Code for our gallery component to slide through images
const Gallery = ({ images }) => {
  return (
    <Swiper
      style={{
        width: '100%',
        height: 'auto', // Ensure the height adjusts based on the content
        cursor: 'pointer',
      }}
      spaceBetween={10} // Optional: space between images
      breakpoints={{
        640: {
          slidesPerView: 1, // 1 slide on small screens
        },
        768: {
          slidesPerView: 2, // 2 slides on medium screens
        },
        1024: {
          slidesPerView: 3, // 3 slides on larger screens
        },
      }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Image ${index}`}
            className="w-full h-auto object-cover" // Ensure the image scales properly
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Gallery;
