import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Banner from "../components/Banner";

const HomePage = () => {
  const [products, setProducts] = useState({
    mens: [],
    womens: [],
    unisex: [],
  });
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({
    mens: false,
    womens: false,
    unisex: false,
  });

  useEffect(() => {
    setLoading(true);

    const fetchCategoryProducts = async (category) => {
      try {
        const response = await getProducts({ category, limit: 6 });
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
        return [];
      }
    };

    Promise.all([
      fetchCategoryProducts("mens"),
      fetchCategoryProducts("womens"),
      fetchCategoryProducts("unisex"),
    ])
      .then(([mensProducts, womensProducts, unisexProducts]) => {
        setProducts({
          mens: mensProducts,
          womens: womensProducts,
          unisex: unisexProducts,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMoreProducts = async (category) => {
    try {
      const response = await getProducts({ category });
      setProducts((prev) => ({
        ...prev,
        [category]: response.data,
      }));
      setExpandedCategories((prev) => ({
        ...prev,
        [category]: true,
      }));
    } catch (error) {
      console.error(`Error loading more ${category} products:`, error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F3E9] text-gray-900">
      <Banner />
      {["mens", "womens", "unisex"].map((category) => {
        const categoryProducts = products[category];

        return (
          <div key={category} className="container mx-auto my-10 p-6">
            <h2 className="text-3xl font-semibold text-[#8B6F47] mb-6 text-center capitalize">
              {category} Collection
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="p-4">
                        <Skeleton height={250} />
                        <Skeleton height={20} style={{ marginTop: 10 }} />
                        <Skeleton height={15} width="80%" />
                        <Skeleton height={20} width="40%" style={{ marginTop: 10 }} />
                      </div>
                    ))
                : categoryProducts?.map((product) => (
                    <div
                      key={product._id}
                      className="transition-transform duration-300 flex justify-center"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
            {categoryProducts?.length === 6 && (
              <div className="flex justify-center self-center mt-8 ">
                <button
                  onClick={() => loadMoreProducts(category)}
                  className="px-8 py-3 bg-[#C7A17A] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#AF8A63] transition-all"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
