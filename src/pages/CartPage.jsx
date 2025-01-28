import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import CartProductCard from '../components/CartProductCard';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-black p-8 mb-7 font-bello bg-gray-100">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-black font-normal mt-20">
          <p className="text-2xl">Your cart is empty.</p>
          <p className="text-lg mt-2">Add some products to get started.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <CartProductCard
                key={product._id}
                product={product}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total Price</h2>
              <span className="text-lg font-bold text-gray-800">${calculateTotalPrice()}</span>
            </div>
            <button
              onClick={handleClearCart}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
