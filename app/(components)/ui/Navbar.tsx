// "use client"

// import React, { useState } from 'react';
// import { Menu, X, ShoppingCart, User } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import SearchBar from '../SearchBar';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="border-b bg-black py-4 shadow-sm relative z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center gap-2">
//               <Image
//                 src="/asserts/helperBuddyLogo.avif"
//                 alt="Helper Buddy Logo"
//                 width={40}
//                 height={40}
//                 className="h-10 w-auto"
//               />
//               <span className="text-xl font-bold text-white"></span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link href="/services" className="text-gray-300 hover:text-white">
//               Services
//             </Link>
//             <Link href="/blogs" className="text-gray-300 hover:text-white">
//               Blog
//             </Link>
//             <Link href="/contact" className="text-gray-300 hover:text-white">
//               Contact
//             </Link>
//             <Link href="/about" className="text-gray-300 hover:text-white">
//               About
//             </Link>
//           </div>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex items-center gap-6">
//             <SearchBar />
//             <Link href="/cart" className="text-gray-300 hover:text-white">
//               <ShoppingCart className="h-6 w-6" />
//             </Link>
//             <Link href="/profile" className="text-gray-300 hover:text-white">
//               <User className="h-6 w-6" />
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-4">
//             <Link href="/cart" className="text-gray-300 hover:text-white">
//               <ShoppingCart className="h-6 w-6" />
//             </Link>
//             <button
//               onClick={toggleMenu}
//               className="text-gray-300 hover:text-white focus:outline-none"
//             >
//               {isOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden mt-4 pb-4">
//             <div className="flex flex-col gap-4">
//               <Link
//                 href="/services"
//                 className="text-gray-300 hover:text-white block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Services
//               </Link>
//               <Link
//                 href="/blogs"
//                 className="text-gray-300 hover:text-white block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Blog
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-gray-300 hover:text-white block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Contact
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-gray-300 hover:text-white block"
//                 onClick={() => setIsOpen(false)}
//               >
//                 About
//               </Link>
//               <div className="pt-4">
//                 <SearchBar />
//               </div>
//               <Link
//                 href="/profile"
//                 className="text-gray-300 hover:text-white flex items-center gap-2"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <User className="h-6 w-6" />
//                 <span>Profile</span>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client"

import React, { useState, useContext } from 'react';
import { Menu, X, ShoppingCart, User, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';

interface ICartItem {
  _id: string;
  images: string[];
  title: string;
  quantity: number;
  price: number;
}

interface CartItem extends ICartItem {}

const MiniCart = ({ items, total }: { items: CartItem[]; total: number }) => {
  const { removeFromCart } = useContext(CartContext) || {};

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
      {items.length === 0 ? (
        <div className="text-center py-6">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-64 overflow-auto">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-3 py-3 border-b">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={item.images?.[0] || '/placeholder.jpg'}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">₹{item.price}</p>
                  <button 
                    onClick={() => removeFromCart && removeFromCart(item._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
            </div>
            <Link 
              href="/cart"
              className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const CartButton = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const cartContext = useContext(CartContext);
  const cart = cartContext ? cartContext.cart : [];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="relative group">
      <Link 
        href="/cart" 
        className="relative text-gray-300 hover:text-white transition-colors"
        onMouseEnter={() => setShowMiniCart(true)}
        onMouseLeave={() => setShowMiniCart(false)}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale">
            {totalItems}
          </div>
        )}
      </Link>
      
      {showMiniCart && (
        <div 
          className="absolute z-50"
          onMouseEnter={() => setShowMiniCart(true)}
        >
          <MiniCart items={cart as unknown as CartItem[]} total={totalPrice} />
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b bg-black py-4 shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/asserts/helperBuddyLogo.avif"
                alt="Helper Buddy Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-gray-300 hover:text-white">
              Services
            </Link>
            <Link href="/blogs" className="text-gray-300 hover:text-white">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <CartButton />
            <Link href="/profile" className="text-gray-300 hover:text-white">
              <User className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <CartButton />
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/services"
                className="text-gray-300 hover:text-white block"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/blogs"
                className="text-gray-300 hover:text-white block"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white block"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white block"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-6 w-6" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-scale {
          animation: scale 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
