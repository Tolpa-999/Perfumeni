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
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-[400ms]
                 grid grid-cols-3 h-60"  // Fixed height (h-60) can be adjusted as needed
    >
      {/* Image Container: 2/3 of the width */}
      <div className="col-span-1">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full"  // Ensures image covers its container
        />
      </div>

      {/* Details Container: 1/3 of the width */}
      <div className="col-span-2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-black mb-2 font-bello line-clamp-1">
            {product.name}
          </h2>
          <p className="text-slate-600 text-sm font-light font-sans line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-light"
              >
                -
              </button>
              <span className="text-sans font-normal ">{product.quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-light"
              >
                +
              </button>
            </div>
            <FaTrashAlt
              className="text-lg text-red-600 cursor-pointer"
              onClick={() => onRemove(product._id)}
            />
          </div>
          <div className="text-center">
            <span className="text-sans font-medium text-gray-800 ">
              ${product.price * product.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
