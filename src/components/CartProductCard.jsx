import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const CartProductCard = ({ product, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(product._id, product.quantity + 1);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      onUpdateQuantity(product._id, product.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-[103%]">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black mb-2 font-bello line-clamp-1">
          {product.name}
        </h2>
        <p className="text-slate-600 text-sm font-light font-sans line-clamp-3 mt-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-base font-bold text-gray-800">
            ${product.price * product.quantity}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              -
            </button>
            <span className="text-lg font-medium">{product.quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              +
            </button>
          </div>
          <FaTrashAlt
            className="text-lg text-red-600 cursor-pointer"
            onClick={() => onRemove(product._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
