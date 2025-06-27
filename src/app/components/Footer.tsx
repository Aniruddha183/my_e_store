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
              >
                F
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors"
              >
                I
              </a>
              <a
                href="#"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white transition-colors"
              >
                T
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
