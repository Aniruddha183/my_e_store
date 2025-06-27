"use client";

import { useState, useMemo } from "react";
import { DisplayStars } from "./StarRating";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  topic: string;
  helpful: number;
  verified: boolean;
  avatar: string;
}

const topics = [
  "All",
  "Product Quality",
  "Seller Services",
  "Product Price",
  "Shipment",
  "Match with Description",
];

// Generate more fake reviews
const allReviews: Review[] = [
  {
    id: 1,
    author: "Darrell Steward",
    rating: 5,
    date: "July 2, 2020 03:29 PM",
    title: "Excellent quality and fast delivery!",
    content:
      "This is amazing product I have. The quality is outstanding and it arrived much faster than expected. Highly recommend!",
    topic: "Product Quality",
    helpful: 128,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    author: "Darlene Robertson",
    rating: 5,
    date: "July 2, 2020 01:04 PM",
    title: "Perfect for my needs",
    content:
      "This is amazing product I have. Exactly what I was looking for. The design is modern and functional.",
    topic: "Match with Description",
    helpful: 82,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    author: "Kathryn Murphy",
    rating: 4,
    date: "June 26, 2020 10:03 PM",
    title: "Good value for money",
    content:
      "This is amazing product I have. The product meets my expectations. Good quality for the price point.",
    topic: "Product Price",
    helpful: 9,
    verified: false,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    author: "Ronald Richards",
    rating: 5,
    date: "July 7, 2020 10:14 AM",
    title: "Best purchase this year!",
    content:
      "This is amazing product I have. Absolutely love this product! The design is beautiful and it works perfectly.",
    topic: "Product Quality",
    helpful: 124,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 5,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Outstanding service and quality!",
    content:
      "I'm really impressed with this product. The quality is outstanding and the seller service was excellent. Highly recommend!",
    topic: "Seller Services",
    helpful: 156,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 6,
    author: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Great shipping experience",
    content:
      "The product meets my expectations. Good quality and the shipment was very fast and well-packaged.",
    topic: "Shipment",
    helpful: 67,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 7,
    author: "Emily Rodriguez",
    rating: 5,
    date: "2024-01-08",
    title: "Perfect match with description",
    content:
      "Exactly what I was looking for. The product matches the description perfectly. Very satisfied with my purchase.",
    topic: "Match with Description",
    helpful: 89,
    verified: false,
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
  },
  {
    id: 8,
    author: "David Kim",
    rating: 3,
    date: "2024-01-05",
    title: "Decent but could be better",
    content:
      "The product works fine but I expected more features for the price. It's okay but not outstanding.",
    topic: "Product Price",
    helpful: 23,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    id: 9,
    author: "Lisa Thompson",
    rating: 5,
    date: "2024-01-03",
    title: "Amazing product quality!",
    content:
      "This exceeded all my expectations. The quality is premium and the customer service was excellent.",
    topic: "Product Quality",
    helpful: 234,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 10,
    author: "James Wilson",
    rating: 4,
    date: "2023-12-28",
    title: "Solid purchase with good service",
    content:
      "Good product overall. The build quality is solid and the seller service was very helpful.",
    topic: "Seller Services",
    helpful: 78,
    verified: false,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 11,
    author: "Maria Garcia",
    rating: 2,
    date: "2023-12-25",
    title: "Disappointed with shipment",
    content:
      "The product arrived damaged and the shipping was delayed. Customer service was helpful though.",
    topic: "Shipment",
    helpful: 45,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: 12,
    author: "Robert Brown",
    rating: 5,
    date: "2023-12-20",
    title: "Best purchase this year!",
    content:
      "Absolutely love this product! The design is beautiful and it works perfectly. Worth every penny.",
    topic: "Product Quality",
    helpful: 189,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 13,
    author: "Jennifer Lee",
    rating: 4,
    date: "2023-12-18",
    title: "Great value for money",
    content:
      "For the price, this is a great deal. Good quality and functionality. Would recommend to friends.",
    topic: "Product Price",
    helpful: 92,
    verified: false,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 14,
    author: "Thomas Anderson",
    rating: 3,
    date: "2023-12-15",
    title: "Average product quality",
    content:
      "It's okay, nothing special. Does the job but there are better options out there for similar price.",
    topic: "Product Quality",
    helpful: 34,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 15,
    author: "Amanda White",
    rating: 5,
    date: "2023-12-12",
    title: "Exceeded expectations!",
    content:
      "I was skeptical at first but this product is amazing! The quality is top-notch and it's very durable.",
    topic: "Product Quality",
    helpful: 167,
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
];

export default function ProductReviews() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 5;

  // Calculate review statistics
  const reviewsData = {
    totalReviews: allReviews.length,
    average:
      allReviews.reduce((sum, review) => sum + review.rating, 0) /
      allReviews.length,
    distribution: [
      { stars: 5, count: allReviews.filter((r) => r.rating === 5).length },
      { stars: 4, count: allReviews.filter((r) => r.rating === 4).length },
      { stars: 3, count: allReviews.filter((r) => r.rating === 3).length },
      { stars: 2, count: allReviews.filter((r) => r.rating === 2).length },
      { stars: 1, count: allReviews.filter((r) => r.rating === 1).length },
    ],
  };

  const maxCount = Math.max(...reviewsData.distribution.map((d) => d.count));

  // Filter reviews based on selected ratings and topics
  const filteredReviews = useMemo(() => {
    let reviews = [...allReviews];

    if (selectedRatings.length > 0) {
      reviews = reviews.filter((review) =>
        selectedRatings.includes(review.rating)
      );
    }

    if (selectedTopics.length > 0) {
      reviews = reviews.filter((review) =>
        selectedTopics.includes(review.topic)
      );
    }

    return reviews;
  }, [selectedRatings, selectedTopics]);

  // Paginate filtered reviews
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    return filteredReviews.slice(startIndex, startIndex + reviewsPerPage);
  }, [filteredReviews, currentPage]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Handlers for filters
  const toggleRating = (star: number) => {
    setSelectedRatings((r) =>
      r.includes(star) ? r.filter((s) => s !== star) : [...r, star]
    );
    setCurrentPage(1);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((t) =>
      t.includes(topic) ? t.filter((tp) => tp !== topic) : [...t, topic]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setSelectedTopics([]);
    setCurrentPage(1);
  };

  return (
    <div className="mt-20 bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-8">Product Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <aside className="md:col-span-1">
          {/* Average Rating Circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex flex-col items-center justify-center mb-2 border-4 border-orange-400">
              <span className="text-3xl font-bold text-orange-500">
                {reviewsData.average.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">/ 5</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              from {reviewsData.totalReviews.toLocaleString()} reviews
            </div>
            <DisplayStars rating={reviewsData.average} />
          </div>

          {/* Distribution Bar Chart */}
          <div className="mb-8">
            {reviewsData.distribution.map((d) => (
              <div key={d.stars} className="flex items-center mb-1">
                <span className="w-6 text-sm font-medium">{d.stars}.0</span>
                <div className="flex-1 mx-2 h-2 rounded bg-gray-200 relative">
                  <div
                    className="absolute left-0 top-0 h-2 bg-orange-400 rounded"
                    style={{ width: `${(d.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-xs text-gray-500 text-right">
                  {d.count}
                </span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Reviews Filter</div>
              {(selectedRatings.length > 0 || selectedTopics.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <div className="font-semibold text-sm mb-2">Rating</div>
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`star-${s}`}
                    checked={selectedRatings.includes(s)}
                    onChange={() => toggleRating(s)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label
                    htmlFor={`star-${s}`}
                    className="ml-2 flex items-center text-sm"
                  >
                    <DisplayStars rating={s} />
                    <span className="ml-1 text-xs text-gray-500">
                      (
                      {reviewsData.distribution.find((d) => d.stars === s)
                        ?.count || 0}
                      )
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* Topic Filter */}
            <div>
              <div className="font-semibold text-sm mb-2">Review Topics</div>
              {topics.slice(1).map((topic) => (
                <div key={topic} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`topic-${topic}`}
                    checked={selectedTopics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label
                    htmlFor={`topic-${topic}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {topic}
                    <span className="ml-1 text-xs text-gray-500">
                      ({allReviews.filter((r) => r.topic === topic).length})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Review List */}
        <main className="md:col-span-3">
          {/* Results Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {paginatedReviews.length} of {filteredReviews.length}{" "}
                reviews
                {selectedRatings.length > 0 && (
                  <span className="ml-2">
                    • Filtered by{" "}
                    {selectedRatings.map((r) => `${r}★`).join(", ")}
                  </span>
                )}
                {selectedTopics.length > 0 && (
                  <span className="ml-2">
                    • Topics: {selectedTopics.join(", ")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {paginatedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full mr-4 border"
                  />
                  <div>
                    <DisplayStars rating={review.rating} />
                    <div className="font-semibold mt-2">{review.title}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {review.date}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      {review.author}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {review.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Topic: {review.topic}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-black">
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
                        d="M14 9l-3 3m0 0l3 3m-3-3h12"
                      />
                    </svg>
                    {review.helpful}
                  </button>
                  <button className="flex items-center gap-1 hover:text-black">
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
                        d="M10 15l3-3m0 0l-3-3m3 3H2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
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
          )}
        </main>
      </div>
    </div>
  );
}
