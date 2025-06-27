"use client";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { DisplayStars } from "../../components/StarRating";
import ProductReviews from "../../components/ProductReviews";
import Modal from "../../components/Modal";
import { Product } from "../../types";
import Header from "@/app/components/Header";
interface PageProps {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch all products");
  }
  return res.json();
}

export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modal, setModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProduct(params.id);
        setProduct(productData);
        setActiveImage(productData.image);
        const allProductsData = await getAllProducts();
        setAllProducts(allProductsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const productImages = useMemo(() => {
    if (!product) return [];
    const imagePool = allProducts
      .filter((p) => p.id !== product.id)
      .map((p) => p.image);
    const shuffled = imagePool.sort(() => 0.5 - Math.random());
    return [product.image, ...shuffled.slice(0, 3)];
  }, [product, allProducts]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [product, allProducts]);

  const popularProducts = useMemo(() => {
    if (allProducts.length === 0) return [];
    return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [allProducts]);

  const addToCart = (product: Product, quantity: number) => {
    setModal({
      isOpen: true,
      message: `${quantity} × ${product.title} added to cart!`,
    });
  };

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
  if (!product) return null;

  return (
    <div className="bg-white text-neutral-800">
      <Header
        searchTerm={searchTerm}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      {modal.isOpen && (
        <Modal
          message={modal.message}
          onClose={() => setModal({ isOpen: false, message: "" })}
        />
      )}
      <main className="container mx-auto p-4 md:p-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="border rounded-lg p-4 mb-4 bg-gray-50">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="flex gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-1/4 h-24 border rounded-md p-1 bg-gray-50 ${
                    img === activeImage ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <DisplayStars rating={product.rating.rate} />
              <span className="text-neutral-800 ml-2 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-800 mb-4">
              ₹{(product.price * 80).toFixed(2)}
            </p>
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">Description</h3>
              <p className="text-neutral-800 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="flex gap-8 mb-6">
              <div>
                <label className="font-semibold text-neutral-700 text-sm">
                  Color: <span className="font-normal">Royal Brown</span>
                </label>
                <div className="flex gap-2 mt-2">
                  <button className="w-8 h-8 rounded-full bg-yellow-800 ring-2 ring-offset-1 ring-black"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-900"></button>
                  <button className="w-8 h-8 rounded-full bg-black"></button>
                </div>
              </div>
              <div>
                <label className="font-semibold text-neutral-700 text-sm">
                  Size
                </label>
                <select className="mt-2 text-neutral-700 block w-full border-gray-300 rounded-md shadow-sm">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
            </div>
            <div className="flex items-stretch gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-5 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Related Product
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                className="bg-white rounded-lg overflow-hidden group transition-shadow hover:shadow-lg cursor-pointer"
                onClick={() => router.push(`/product/${rp.id}`)}
              >
                <img
                  src={rp.image}
                  alt={rp.title}
                  className="w-full h-40 object-contain p-2"
                />
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-sm truncate h-5">
                    {rp.title}
                  </h3>
                  <p className="text-md font-bold text-gray-800 mt-2">
                    ₹{(rp.price * 80).toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {rp.rating.rate}
                    </span>
                    <span>•</span>
                    <span>{rp.rating.count.toLocaleString()} Sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProductReviews rating={product.rating} />
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Popular this week
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {popularProducts.map((pp) => (
              <div
                key={pp.id}
                className="bg-white rounded-lg overflow-hidden group transition-shadow hover:shadow-lg cursor-pointer"
                onClick={() => router.push(`/product/${pp.id}`)}
              >
                <img
                  src={pp.image}
                  alt={pp.title}
                  className="w-full h-40 object-contain p-2"
                />
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-sm truncate h-5">
                    {pp.title}
                  </h3>
                  <p className="text-md font-bold text-gray-800 mt-2">
                    ₹{(pp.price * 80).toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {pp.rating.rate}
                    </span>
                    <span>•</span>
                    <span>{pp.rating.count.toLocaleString()} Sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
