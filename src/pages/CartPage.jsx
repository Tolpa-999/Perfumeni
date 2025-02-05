import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import CartProductCard from '../components/CartProductCard';
import { t } from 'i18next';

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
    <div className='container'>
      <h1 className=" font-normal text-center p-8 mb-7 font-bello bg-[#f9f7f6]  text-4xl text-[#ae8b51]">
        {t('yourCart')}
      </h1>
    <div className="min-h-screen p-6  bg-[white] mb-1">
      
      {cart.length === 0 ? (
        <div className="text-center text-black font-normal mt-20">
          <p className="text-2xl">{t('noCart')}</p>
          <p className="text-lg mt-2">{t('addCart')}</p>
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

          <div className="mt-8 p-4 bg-white shadow-xl rounded-lg border-slate-200 border">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-normal">{t('total')}</h2>
              <span className="text-lg font-normal text-gray-800">${calculateTotalPrice()}</span>
            </div>
            <button
              onClick={handleClearCart}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-md font-medium active:scale-[98%] duration-300 transition-all"
            >
              {t('clearCart')}
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default CartPage;
