"use client";
import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from "react";
import Link from "next/link";
import { DisplayStars, StarRating } from "../components/StarRating";
import { Product } from "../types";

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
      } catch (err: any) {
        setError(err.message);
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
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <div className="bg-gray-50/50">
      <main className="container mx-auto p-4 md:px-8">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="cursor-pointer hover:text-black">
            Home
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-800 capitalize">
            {categoryFilter[0] || "All Products"}
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-28">
              <h3 className="font-bold text-lg mb-4">Filter</h3>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Category</h4>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center mb-1">
                    <input
                      type="radio"
                      id={cat}
                      name="category"
                      checked={
                        cat === "All"
                          ? categoryFilter.length === 0
                          : categoryFilter.includes(cat)
                      }
                      onChange={() => handleCategoryChange(cat)}
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <label
                      htmlFor={cat}
                      className="ml-2 text-sm text-neutral-700 capitalize"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Price Range</h4>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceFilter.min}</span>
                  <span>${priceFilter.max}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceFilter.max}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceFilter({
                      ...priceFilter,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rating</h4>
                <StarRating
                  rating={ratingFilter}
                  setRatingFilter={setRatingFilter}
                />
              </div>
            </div>
          </aside>
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <div className="w-2/3 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(e.target.value)
                }
                className="border rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden group transition-shadow hover:shadow-lg"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-56 object-contain p-4 cursor-pointer"
                      />
                      <button
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e: MouseEvent) => {
                          e.preventDefault();
                          alert("Wishlist added!");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
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
                  </Link>
                  <div className="p-4 text-center">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-md truncate cursor-pointer h-6">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      ₹{(product.price * 80).toFixed(2)}
                    </p>
                    <div className="flex justify-center items-center mt-1">
                      <DisplayStars rating={product.rating.rate} />
                      <span className="text-xs text-gray-500 ml-2">
                        ({product.rating.count})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <nav className="flex rounded-md shadow-sm">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
