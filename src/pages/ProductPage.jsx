import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../utils/api';
import Skeleton from 'react-loading-skeleton';
import ShareButton from '../components/ShareButton';
import { Helmet } from 'react-helmet';
import TextWithSpacesAfterWords from '../utils/TextWithSpacesAfterWords';
import Reviews from '../components/Reviews';
import SwipeImageNavigator from '../components/SwipeImageNavigator';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null); // For action feedback

  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setImages(data.data.images);
        setProduct(data.data);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Error fetching product: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#3b3b39] text-white py-2 px-4 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleSizeClick = (sizeIndex) => {
    setImage(sizeIndex);
    setFeedback(`Selected size: ${product.sizes[sizeIndex]} mL`);
    setTimeout(() => setFeedback(null), 3000); // Clear feedback after 3 seconds
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>{product.name} - Perfumeni</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - Perfumeni`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={images[0]} />
      </Helmet>

      <div className="w-full p-4">
        <div className="w-full h-full">
          {/* Image Section */}
          <motion.img
            src={images[image]}
            alt={`Product image for ${product.name}`}
            className="w-full h-auto max-w-full rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <p className="text-[2.60rem] text-center font-bello my-8 font-[400] text-[#3b3b39]">
          {product.name}
        </p>
        <p className="text-[#878784] font-light text-base text-center mb-4">
          {product.sizes.length > 0
            ? `${t('manySizes', { sizes: product.sizes.length })}`
            : t('oneSize')}
        </p>

        {/* Size Selection */}
        <div className="flex justify-center gap-5">
          {product.sizes.map((size, index) => (
            <button
              key={size}
              onClick={() => handleSizeClick(index)}
              className={`text-[#878784] font-light text-base text-center mb-4 border-[.px] p-2 rounded-lg cursor-pointer bg-[#f5f5f5]  ${
                image === index
                  ? 'border-[1.5px] border-[black] bg-[#f5f5f5] scale-110 '
                  : 'border-[#666664]'
              }`}
              aria-label={`Select size ${size} mL`}
            >
              {size} {t('ml')}
            </button>
          ))}
        </div>

        {/* Feedback Section */}
        {feedback && (
          <p className="text-center font-normal text-black mt-2">{feedback}</p>
        )}

        <div className="grid mt-6">
          <p className="text-[#2e2e2d] text-xl font-[300] font-ysab">
            <TextWithSpacesAfterWords text={product.description} />
          </p>
          <p className="text-[#3b3b39] font-light mt-4 text-2xl text-center">
            {t('price', { price: product.price })}
          </p>
        </div>

        <div className="w-full h-full mt-6">
          <p className={`text-2xl text-[#3b3b39] font-normal  mb-3`}>{t('all_images')}</p>
          <div className="w-[80%] h-[1px] bg-[#3b3b39] mb-5 -mt-2"></div>
          <SwipeImageNavigator images={images} />
        </div>

        {/* Share and Reviews */}
        <div className="mt-6">
          <ShareButton url={window.location.href} title={product.name} />
        </div>
        <div className="mt-6">
          <Reviews productId={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
