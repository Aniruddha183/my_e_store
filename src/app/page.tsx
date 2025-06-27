"use client";

import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import { Product } from "@/app/types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default function ProductListPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch products";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))],
    [allProducts]
  );

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    setCategoryFilter(category === "All" ? [] : [category]);
  };

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
    if (searchTerm)
      products = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (categoryFilter.length > 0)
      products = products.filter((p) => categoryFilter.includes(p.category));
    products = products.filter(
      (p) => p.price >= priceFilter.min && p.price <= priceFilter.max
    );
    if (ratingFilter > 0)
      products = products.filter(
        (p) => Math.round(p.rating.rate) >= ratingFilter
      );

    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        products.sort((a, b) => b.rating.count - a.rating.count);
        break;
    }
    return products;
  }, [
    allProducts,
    searchTerm,
    categoryFilter,
    priceFilter,
    ratingFilter,
    sortBy,
  ]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-2xl text-neutral-700">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-neutral-800">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />

      {/* Hero Banner */}
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shop Our Collection
          </h1>
          <p className="text-neutral-700">
            Discover amazing products at great prices
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 capitalize">
            {categoryFilter[0] || "Clothes"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
                <button className="text-sm text-gray-500 hover:text-neutral-700">
                  Advanced
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <button className="flex items-center justify-between w-full mb-4">
                  <h4 className="text-base font-medium text-gray-900">
                    Category
                  </h4>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search brand..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  {categories.map((cat, index) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            cat === "All"
                              ? categoryFilter.length === 0
                              : categoryFilter.includes(cat)
                          }
                          onChange={() => handleCategoryChange(cat)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-neutral-700 capitalize">
                          {cat}
                        </span>
                      </label>
                      <span className="text-xs text-gray-400">
                        {index === 0
                          ? "173"
                          : Math.floor(Math.random() * 200) + 50}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-medium text-gray-900">Price</h4>
                  <button
                    onClick={() => {
                      setPriceFilter({ min: 0, max: 1000 });
                      setCurrentPage(1);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Reset
                  </button>
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      ₹{priceFilter.min}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{priceFilter.max}
                    </span>
                  </div>

                  {/* Min Price Slider */}
                  <div className="mb-4">
                    <label className="block text-xs text-gray-500 mb-2">
                      Min Price
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceFilter.min}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const newMin = Number(e.target.value);
                        if (newMin <= priceFilter.max) {
                          setPriceFilter({ ...priceFilter, min: newMin });
                          setCurrentPage(1);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                          (priceFilter.min / 1000) * 100
                        }%, #e5e7eb ${
                          (priceFilter.min / 1000) * 100
                        }%, #e5e7eb 100%)`,
                      }}
                    />
                  </div>

                  {/* Max Price Slider */}
                  <div className="mb-4">
                    <label className="block text-xs text-gray-500 mb-2">
                      Max Price
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceFilter.max}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const newMax = Number(e.target.value);
                        if (newMax >= priceFilter.min) {
                          setPriceFilter({ ...priceFilter, max: newMax });
                          setCurrentPage(1);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                          (priceFilter.max / 1000) * 100
                        }%, #e5e7eb ${
                          (priceFilter.max / 1000) * 100
                        }%, #e5e7eb 100%)`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹1000</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <button className="flex items-center justify-between w-full mb-4">
                  <h4 className="text-base font-medium text-gray-900">
                    Rating
                  </h4>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(rating)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-gray-900">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button className="flex items-center space-x-2 text-sm text-neutral-700 hover:text-gray-900">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-neutral-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value)
                  }
                  className="text-sm font-medium text-gray-900 bg-transparent border-none focus:ring-0"
                >
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-64 object-contain p-4 cursor-pointer"
                      />
                    </Link>
                    <button
                      className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
                      onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        alert("Added to wishlist!");
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Your perfect pack for everyday use and walks in the
                      forest...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        ₹ {(product.price * 80).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        ({product.rating.count})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? "bg-gray-900 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
