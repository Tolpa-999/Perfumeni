// src/components/Gallery/Gallery.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


// code for our gallery component to slide through images
const Gallery = ({ images }) => {

  return (
    <Swiper style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} alt={img.alt} className="w-full h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Gallery;