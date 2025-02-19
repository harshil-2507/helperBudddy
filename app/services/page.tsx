// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export interface ISubService {
//     _id: string;
//     title: string;
//     category: string;
//     place: string;
//     description: string;
//     images: string[];
//     price: number;
//     duration: string;
//     createdAt: string;
//     updatedAt: string;
// }

// const ServicesPage = () => {
//     const router = useRouter();
//     const [services, setServices] = useState<ISubService[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch services from the API
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch("/api/services"); // Updated API endpoint
//                 const data = await response.json();
//                 console.log(data);
//                 setServices(data.services); // Updated key to match API response
//             } catch (error) {
//                 console.error("Error fetching services:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-white text-black">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="relative min-h-screen bg-white text-black">
//             <div className="relative z-10 container mx-auto px-6 py-16">
//                 <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {services.map((service) => {
//                         const validImages = service.images?.filter((image) => image.trim() !== "");

//                         return (
//                             <div
//                                 key={service._id}
//                                 className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
//                                 onClick={() => router.push(`/services/${service._id}`)}
//                             >
//                                 <div className="relative w-full h-48 mb-4">
//                                     {validImages.length > 0 ? (
//                                         <Image
//                                             src={validImages[0]}
//                                             alt={service.title}
//                                             layout="fill"
//                                             objectFit="cover"
//                                             className="rounded-md"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
//                                             <span className="text-gray-700">No Image Available</span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <h2 className="text-2xl font-semibold">{service.title}</h2>
//                                 <p className="text-sm text-gray-700">
//                                     {service.category} - {service.place}
//                                 </p>
//                                 <p className="text-gray-500 mt-2">{service.description}</p>
//                                 <p className="text-lg font-bold mt-2">₹{service.price}</p>
//                                 <p className="text-sm text-gray-400 mt-2">
//                                     Duration: {service.duration}
//                                 </p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServicesPage;

"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {CartContext} from "@/context/CartContext"; // We'll create this next

export interface ISubService {
    _id: string;
    title: string;
    category: string;
    place: string;
    description: string;
    images: string[];
    price: number;
    duration: string;
    createdAt: string;
    updatedAt: string;
}

const ServicesPage = () => {
    const router = useRouter();
    const [services, setServices] = useState<ISubService[]>([]);
    const [loading, setLoading] = useState(true);
    const cartContext = useContext(CartContext); // Use the CartContext
    const addToCart = cartContext?.addToCart; // Handle undefined case

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/api/services");
                const data = await response.json();
                setServices(data.services);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white text-black">
            <div className="relative z-10 container mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const validImages = service.images?.filter((image) => image.trim() !== "");

                        return (
                            <div
                                key={service._id}
                                className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
                            >
                                <div
                                    className="relative w-full h-48 mb-4"
                                    onClick={() => router.push(`/services/${service._id}`)}
                                >
                                    {validImages.length > 0 ? (
                                        <Image
                                            src={validImages[0]}
                                            alt={service.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                                            <span className="text-gray-700">No Image Available</span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-semibold">{service.title}</h2>
                                <p className="text-sm text-gray-700">
                                    {service.category} - {service.place}
                                </p>
                                <p className="text-gray-500 mt-2">{service.description}</p>
                                <p className="text-lg font-bold mt-2">₹{service.price}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Duration: {service.duration}
                                </p>
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;

