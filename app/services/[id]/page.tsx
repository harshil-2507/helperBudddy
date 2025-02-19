
// "use client";

// import React from "react";
// import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";

// export interface IService {
//   _id: string;
//   workerId: string;
//   title: string;
//   category: string;
//   place: string;
//   description: string;
//   images: string[];
//   price: number;
//   duration: string;
//   isApproved: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// const services = [
//   {
//     id: "1",
//     title: "Home Cleaning",
//     category: "Household",
//     place: "New York, NY",
//     description: "Professional cleaning at your service. Get a spotless home with our expert cleaners.",
//     images: ["/images/home1.jpg", "/images/home2.jpg", "/images/home3.jpg"],
//     price: "$50/hr",
//     details: "Our home cleaning services cover everything from dusting and vacuuming to deep sanitization, ensuring a clean and healthy environment."
//   },
//   {
//     id: "2",
//     title: "Office Cleaning",
//     category: "Corporate",
//     place: "Los Angeles, CA",
//     description: "Maintain a spotless workspace. Increase productivity with a clean and healthy office.",
//     images: ["/images/office1.jpg", "/images/office2.jpg", "/images/office3.jpg"],
//     price: "$75/hr",
//     details: "Our office cleaning services include workspace sanitization, carpet cleaning, and waste management to create a healthy work atmosphere."
//   },
//   {
//     id: "3",
//     title: "Deep Cleaning",
//     category: "Intensive",
//     place: "Chicago, IL",
//     description: "Get a thorough deep clean today. We ensure every nook and cranny is spotless.",
//     images: ["/images/deep1.jpg", "/images/deep2.jpg", "/images/deep3.jpg"],
//     price: "$100/hr",
//     details: "Deep cleaning tackles hidden dirt and grime, including kitchens, bathrooms, and behind furniture, leaving your space completely refreshed."
//   },
// ];

// const ServicePage = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const service = services.find(s => s.id === id);

//   if (!service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
//         <h2 className="text-2xl">Service Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-6 py-12">
//         <button className="mb-6 text-blue-400 hover:underline" onClick={() => router.back()}>Back</button>
//         <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
//         <p className="text-gray-400 text-lg">{service.category} - {service.place}</p>
//         <p className="text-gray-300 mt-4">{service.description}</p>
//         <p className="mt-4 text-xl font-semibold">{service.price}</p>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//           {service.images.map((img, index) => (
//             <div key={index} className="relative w-full h-64">
//               <Image src={img} alt={service.title} layout="fill" objectFit="cover" className="rounded-lg" />
//             </div>
//           ))}
//         </div>

//         <p className="mt-6 text-lg text-gray-300">{service.details}</p>

//         <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServicePage;

"use client";

import React, { useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Clock, MapPin, Tag } from "lucide-react";
import {CartContext} from "@/context/CartContext";

export interface IService {
  _id: string;
  workerId: string;
  title: string;
  category: string;
  place: string;
  description: string;
  images: string[];
  price: number;
  duration: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

const ServicePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cartContext = useContext(CartContext); // Use the CartContext
  const addToCart = cartContext?.addToCart; 

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${id}`);
        if (!response.ok) {
          throw new Error("Service not found");
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h2 className="text-2xl">{error}</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h2 className="text-2xl">Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Main Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={service.images[0]}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative -mt-20 bg-white rounded-t-3xl">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          {/* Service Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2" />
                  {service.category}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {service.place}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {service.duration}
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {service.images.slice(1).map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src={img}
                      alt={`${service.title} - Image ${index + 2}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">₹{service.price}</h2>
                  <p className="text-gray-500">per hour</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">Professional service providers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">100% satisfaction guaranteed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-700">Flexible scheduling available</p>
                  </div>
                </div>

                <button
                  className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click event
                    addToCart?.({
                      _id: service._id,
                      title: service.title,
                      price: service.price,
                      image: service.images[0] || "", // Assuming the first image is the main image
                    }); // Add the service to the cart
                  }}
                >
                  Add to Cart
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  No payment required to schedule
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;