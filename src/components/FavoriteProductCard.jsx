// FavoriteProductCard.jsx
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FavoriteProductCard = ({ product, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-[103%]">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black mb-2 font-bello line-clamp-1">
          {product.name}
        </h2>
        <p className="text-slate-600 text-sm font-light font-sans line-clamp-3 mt-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-base font-bold text-gray-800">${product.price}</span>
          <FaTrashAlt
            className="text-lg text-red-600 cursor-pointer"
            onClick={() => onRemove(product._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;
