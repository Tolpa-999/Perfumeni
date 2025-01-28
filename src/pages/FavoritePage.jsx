// FavoritesPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/slices/favoriteSlice';
import FavoriteProductCard from '../components/FavoriteProductCard';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state?.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-black p-8 mb-7 font-bello bg-gray-100">
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-black font-normal mt-20">
          <p className="text-2xl">No favorites yet.</p>
          <p className="text-lg mt-2">Browse products and add them to your favorites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <FavoriteProductCard
              key={product._id}
              product={product}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
