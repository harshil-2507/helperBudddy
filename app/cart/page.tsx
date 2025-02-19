// "use client";
// import React from "react";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";

// const CartPage = () => {
//     const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

//     const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//     return (
//         <div className="min-h-screen bg-white text-black p-6">
//             <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
//             {cart.length === 0 ? (
//                 <p className="text-gray-500">Your cart is empty.</p>
//             ) : (
//                 <div className="space-y-6">
//                     {cart.map((item) => (
//                         <div key={item._id} className="flex items-center justify-between border-b pb-4">
//                             <div className="flex items-center space-x-4">
//                                 <div className="relative w-20 h-20">
//                                     <Image
//                                         src={item.image}
//                                         alt={item.title}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         className="rounded-md"
//                                     />
//                                 </div>
//                                 <div>
//                                     <h2 className="text-xl font-semibold">{item.title}</h2>
//                                     <p className="text-gray-500">₹{item.price}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <input
//                                     type="number"
//                                     value={item.quantity}
//                                     onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
//                                     className="w-16 px-2 py-1 border rounded"
//                                     min="1"
//                                 />
//                                 <button
//                                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                                     onClick={() => removeFromCart(item._id)}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="flex justify-between items-center mt-8">
//                         <button
//                             className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                             onClick={clearCart}
//                         >
//                             Clear Cart
//                         </button>
//                         <div className="text-2xl font-bold">Total: ₹{totalPrice}</div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;

"use client"
import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} in cart
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-slate-900 transition-colors" onClick={() => router.push("/services")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 mt-1">₹{item.price}</p>
                      
                      <div className="flex items-center mt-4 space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                            className="w-12 text-center border-x py-1 text-gray-900"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;