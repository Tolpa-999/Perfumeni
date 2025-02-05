import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { FiSearch, FiSliders } from "react-icons/fi";

const ProductsPage = () => {
    const { i18n, t } = useTranslation();
    const isEnglish = i18n.language === "en";

    // State management
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        sort: "",
        minPrice: "",
        maxPrice: "",
        minRating: "",
    });

    // Fetch products with debounced search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, currentPage]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 12,
                search: searchQuery,
                ...filters,
            };

            const response = await getProducts(params);
            setProducts(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter handlers
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ sort: "", minPrice: "", maxPrice: "", minRating: "" });
    };

    return (
        <div className="min-h-screen bg-cream-50 text-gray-900">
            {/* Search and Filters Section */}
            <div className="container mx-auto p-6">
                <div className="mb-8 relative">
                    <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-3">
                        <FiSearch className="text-gold-600 text-xl mr-3" />
                        <input
                            type="text"
                            placeholder={t("search_products")}
                            className="flex-1 bg-transparent outline-none text-lg font-light "
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="ml-4 p-2 rounded-full bg-[#ebd9b9] hover:scale-105 active:scale-90"
                        >
                            <FiSliders className="text-gold-600 text-xl " />
                        </button>
                    </div>

                    {/* Filters Dropdown */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-xl p-6 z-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <select
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="p-2 border border-gold-200 rounded-lg bg-transparent font-light"
                                >
                                    <option value="">{t("sort_by")}</option>
                                    <option value="priceAsc">{t("price_low_to_high")}</option>
                                    <option value="priceDesc">{t("price_high_to_low")}</option>
                                    <option value="rating">{t("top_rated")}</option>
                                    <option value="newest">{t("newest")}</option>
                                </select>

                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder={t("min_price")}
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        className="p-2 border border-gold-200 rounded-lg w-full font-light"
                                    />
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder={t("max_price")}
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        className="p-2 border border-gold-200 rounded-lg w-full font-light"
                                    />
                                </div>

                                <select
                                    name="minRating"
                                    value={filters.minRating}
                                    onChange={handleFilterChange}
                                    className="p-2 border border-gold-200 rounded-lg font-light"
                                >
                                    <option value="">{t("minimum_rating")}</option>
                                    {[4, 3, 2, 1].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating}+ {t("stars")}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={fetchProducts}
                                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
                                >
                                    {t("apply_filters")}
                                </button>

                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 bg-[gray] text-white rounded-lg hover:bg-[#f63f3f] transition-colors"
                                >
                                    {t("reset_filters")}
                                </button>

                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array(12)
                            .fill()
                            .map((_, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-md">
                                    <Skeleton height={250} className="rounded-lg" />
                                    <Skeleton count={3} className="mt-3" />
                                </div>
                            ))
                        : products.map((product) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-evenly"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50 transition-all"
                        >
                            {t("previous")}
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg transition-all ${currentPage === page
                                        ? "bg-gold-500 text-white"
                                        : "bg-white text-gold-500 hover:bg-gold-50"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50 transition-all"
                        >
                            {t("next")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;