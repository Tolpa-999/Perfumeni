import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Banner from '../components/Banner';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error(error);
        // setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Animation for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Adds delay between children animations
      },
    },
  };

  return (
    <div >
      <Banner />
      <motion.div
        className="container mx-auto p-4 grid center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton height={200} />
                <Skeleton height={20} style={{ marginTop: 10 }} />
                <Skeleton height={15} width="80%" />
                <Skeleton height={20} width="40%" style={{ marginTop: 10 }} />
              </div>
            ))
        ) : (
          products.map(product => <ProductCard key={product._id} product={product} />)
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
