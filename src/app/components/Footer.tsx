import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">
              JOHN LEWIS{" "}
              <span className="font-light text-gray-500">& PARTNERS</span>
            </h3>
            <p className="text-neutral-700 mb-4">
              Get latest offers to your inbox
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-transparent border-b-2 border-black focus:outline-none"
              />
              <button className="bg-black text-white px-4 py-2">&rarr;</button>
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.094 12 2.094m0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.612.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-7.612 0-5.923-.012-6.332-.07-7.612-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>
                <Link href="#" className="hover:text-black">
                  My account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Login
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>
                <Link href="#" className="hover:text-black">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Frequently asked
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>
                <Link href="#" className="hover:text-black">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; John Lewis plc 2001-2024</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="flex items-center gap-1">
              <span>English</span> &#9662;
            </button>
            <button className="flex items-center gap-1">
              <span>USD</span> &#9662;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
