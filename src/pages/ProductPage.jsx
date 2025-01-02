import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../utils/api';
import Skeleton from 'react-loading-skeleton';
import Gallery from '../components/Gallery';
import ShareButton from '../components/ShareButton';
import { Helmet } from 'react-helmet';
import TextWithSpacesAfterWords from '../utils/TextWithSpacesAfterWords';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(0);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setImages(data.data.images);
        setProduct(data.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <Skeleton count={1} />;
  }

  console.log('id', id);
  function handleSizeClick(size) {
    // Handle size click logic
    setImage(size);
  }

  return (
        <div className='w-full'>
    <Helmet>
      <title>{product.name} - Perfumeni</title>
      <meta name="description" content={product.description} />
    </Helmet>
    
    <div className="w-full p-4">
        <div className='w-full h-full'>
          {/* Image section */}
          <img 
            src={images[image]} 
            alt={product.name} 
            className="w-full h-auto max-w-full" 
          />
        </div>
      <p className="text-[2.60rem] text-center font-bello my-8 font-[400] text-[#3b3b39]">{product.name}</p>
      <p className="text-[#878784] font-light text-base text-center mb-4">
        This Product exists in
              {product.sizes.length > 0 ? ` ${product.sizes.length} sizes` : '1 size'}
      </p>
      <div className='flex justify-center gap-5'>
        {product.sizes.map((size, index) => (
          <p 
            key={size} 
            onClick={() => {handleSizeClick(index)}} 
            className="text-[#878784] font-light text-base text-center mb-4 border-black border-opacity-80 border-[1px] p-2 rounded-lg cursor-pointer" 
            style={{ border: image === index ? '2px solid #3b3b39' : '1px solid #3b3b39'}}
          >
            {size} mL
          </p>
        ))}
      </div>
      <div className="grid ">
        <div>
          <p className="text-[#2e2e2d] text-xl font-[300] font-ysab">
            <TextWithSpacesAfterWords text={product.description} />
          </p>
          <p className="text-[#3b3b39] font-light mt-4 text-2xl text-center">
            Price: ${product.price}
          </p>
        </div>
      </div>
      <div className='w-full'>
        <p className='text-2xl text-[#3b3b39] font-normal mt-5 mb-3'>All images</p>
        <p className='w-[80%] h-[1px] bg-[#3b3b39] mb-5 -mt-2'></p>
{/*         <Gallery images={images} /> */}
      </div>
      {/* Reviews Section */}
      <ShareButton url={window.location.href} title={product.name} />
      <Reviews productId={product._id} />
    </div>
    </div>
  );
};

export default ProductPage;
