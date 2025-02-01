// FavoritesPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/slices/favoriteSlice';
import FavoriteProductCard from '../components/FavoriteProductCard';
import { t } from 'i18next';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state?.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <>
    <h1 className=" font-normal text-center p-8 mb-7 font-bello bg-[#f9f7f6]  text-4xl text-[#ae8b51]">
        {t('yourFavourite')}
      </h1>
      <div className="min-h-screen p-6">
      

      {favorites.length === 0 ? (
        <div className="text-center text-black font-normal mt-20">
          <p className="text-2xl">{t('noFavourite')}</p>
          <p className="text-lg mt-2">{t('browse')}</p>
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
    </>
  );
};

export default FavoritesPage;
