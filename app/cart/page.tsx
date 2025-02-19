"use client";
import React from "react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Redirect to login page if no user ID is found
      router.push("/login");
    } else {
      // Proceed with checkout if user ID is found
      const services = cart.map((item) => ({
        serviceId: item._id,
        dateTime: new Date().toISOString(), // Adjust dateTime as needed
        duration: "30m", // Adjust duration as needed
      }));

      const checkoutData = {
        services,
        userId,
        address: "User's address", // Fetch from user profile or input field
        area: "User's area", // Fetch from user profile or input field
      };

      console.log('Sending checkout data:', checkoutData);

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Checkout response data:', data);

        if (data.message) {
          // Create Razorpay order
          const amount = totalPrice; // Total amount from cart
          const currency = "INR";
          const receipt = `order_rcptid_${new Date().getTime()}`;

          const razorpayResponse = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, currency, receipt }),
          });

          if (!razorpayResponse.ok) {
            throw new Error('Failed to create Razorpay order');
          }

          const razorpayData = await razorpayResponse.json();
          console.log('Razorpay order data:', razorpayData);

          // Initialize Razorpay payment
          const options = {
            key: process.env.RAZORPAY_KEY_ID, // Use your test key_id
            amount: razorpayData.order.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo", // Replace with your logo URL
            order_id: razorpayData.order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
              alert(`Payment successful: ${response.razorpay_payment_id}`);
              clearCart();
              router.push("/cart/success");
            },
            prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp = new Razorpay(options);
          rzp.open();
        } else {
          alert(data.message || "Checkout failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        alert("Checkout failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
                        fill
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
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors" onClick={handleCheckout}>
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