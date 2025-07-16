
// "use client";
// import React, { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { CartContext } from "@/context/CartContext";
// import { Search } from "lucide-react";

// export interface ISubService {
//   _id: string;
//   title: string;
//   category: string;
//   place: string;
//   description: string;
//   images: string[];
//   price: number;
//   duration: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const ServicesPage = () => {
//   const router = useRouter();
//   const [services, setServices] = useState<ISubService[]>([]);
//   const [filteredServices, setFilteredServices] = useState<ISubService[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const cartContext = useContext(CartContext);
//   const addToCart = cartContext?.addToCart;

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("/api/services");
//         const data = await response.json();
//         setServices(data.services);
//         setFilteredServices(data.services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   useEffect(() => {
//     const filtered = services.filter((service) =>
//       service.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredServices(filtered);
//   }, [searchQuery, services]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white text-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-white text-black">
//       <div className="relative z-10 container mx-auto px-6 py-16">
//         <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>

//         <div className="mb-8 flex justify-center">
//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search services..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10" // Added pr-10 for padding on the right
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent hover:bg-gray-100 rounded-r-lg focus:outline-none"
//             >
//               <Search /> {/* Assuming Search is an icon component */}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.map((service) => {
//             const validImages = service.images?.filter((image) => image.trim() !== "");

//             return (
//               <div
//                 key={service._id}
//                 className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <div
//                   className="relative w-full h-48 mb-4"
//                   onClick={() => router.push(`/services/${service._id}`)}
//                 >
//                   {validImages.length > 0 ? (
//                     <Image
//                       src={validImages[0]}
//                       alt={service.title}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
//                       <span className="text-gray-700">No Image Available</span>
//                     </div>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-semibold">{service.title}</h2>
//                 <p className="text-sm text-gray-700">
//                   {service.category} - {service.place}
//                 </p>
//                 <p className="text-gray-500 mt-2">{service.description}</p>
//                 <p className="text-lg font-bold mt-2">₹{service.price}</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Duration: {service.duration}
//                 </p>
//                 <button
//                   className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 transition"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart?.({
//                       _id: service._id,
//                       title: service.title,
//                       price: service.price,
//                       image: service.images[0] || "",
//                     });
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;


// "use client";
// import React, { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { CartContext } from "@/context/CartContext";
// import { Search } from "lucide-react"; // Assuming you use Lucide for icons
// import Link from "next/link";

// export interface ISubService {
//   _id: string;
//   title: string;
//   category: string;
//   place: string;
//   description: string;
//   images: string[];
//   price: number;
//   duration: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const ServicesPage = () => {
//   const router = useRouter();
//   const [services, setServices] = useState<ISubService[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<ISubService[]>([]);
//   const [nonAvailableServices, setNonAvailableServices] = useState<string[]>([]);
//   const cartContext = useContext(CartContext);
//   const addToCart = cartContext?.addToCart;

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("/api/services");
//         const data = await response.json();
//         setServices(data.services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() !== "") {
//       const filteredSuggestions = services.filter(service =>
//         service.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchQuery, services]);

//   const handleSearch = async () => {
//     const filteredServices = services.filter(service =>
//       service.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (filteredServices.length === 0) {
//       try {
//         await fetch("/api/nonavailable-services", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ serviceName: searchQuery , searchCount: 1 }), // Added searchCount
//         });
//       } catch (error) {
//         console.error("Failed to store non-available service:", error);
//       }
//     }
//   };



//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white text-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-white text-black">
//       <div className="relative z-10 container mx-auto px-6 py-16">
//         <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>

//         {/* Search Bar */}
//         <div className="relative w-full max-w-md mx-auto mb-6">
//           <input
//             type="text"
//             placeholder="Search services..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent hover:bg-gray-100 rounded-r-lg focus:outline-none"
//           >
//             <Search />
//           </button>
//           {/* Dropdown Suggestions */}
//           {suggestions.length > 0 && (
//             <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion._id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     setSearchQuery(suggestion.title);
//                     router.push(`/services/${suggestion._id}`);
//                   }}
//                 >
//                   {suggestion.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Non-Available Services */}
//         {nonAvailableServices.length > 0 && (
//           <div className="mb-6 text-center">
//             <p className="text-red-500 font-semibold">The following services were searched but not found:</p>
//             <ul className="mt-2 text-gray-700">
//               {nonAvailableServices.map((service, index) => (
//                 <li key={index} className="text-sm">
//                   {service}
//                 </li>
//               ))}
//             </ul>
//             <Link href="/admin/nonavailservice" className="text-blue-500 underline mt-2 block">
//               View all non-available services
//             </Link>
//           </div>
//         )}

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services
//             .filter(service => service.title.toLowerCase().includes(searchQuery.toLowerCase()))
//             .map((service) => {
//               const validImages = service.images?.filter((image) => image.trim() !== "");

//               return (
//                 <div
//                   key={service._id}
//                   className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
//                 >
//                   <div
//                     className="relative w-full h-48 mb-4"
//                     onClick={() => router.push(`/services/${service._id}`)}
//                   >
//                     {validImages.length > 0 ? (
//                       <Image
//                         src={validImages[0]}
//                         alt={service.title}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-md"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
//                         <span className="text-gray-700">No Image Available</span>
//                       </div>
//                     )}
//                   </div>
//                   <h2 className="text-2xl font-semibold">{service.title}</h2>
//                   <p className="text-sm text-gray-700">{service.category} - {service.place}</p>
//                   <p className="text-gray-500 mt-2">{service.description}</p>
//                   <p className="text-lg font-bold mt-2">₹{service.price}</p>
//                   <p className="text-sm text-gray-400 mt-2">Duration: {service.duration}</p>
//                   <button
//                     className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 transition"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart?.({
//                         _id: service._id,
//                         title: service.title,
//                         price: service.price,
//                         image: service.images[0] || "",
//                       });
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;

// "use client";
// import React, { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { CartContext } from "@/context/CartContext";
// import { Search } from "lucide-react";
// import Link from "next/link";

// export interface ISubService {
//   _id: string;
//   title: string;
//   category: string;
//   place: string;
//   description: string;
//   images: string[];
//   price: number;
//   duration: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const NotFoundIcon = () => (
//   <svg viewBox="0 0 240 240" className="w-40 h-40 mx-auto mb-4">
//   <defs>
//     <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stopColor="#f87171" />
//       <stop offset="100%" stopColor="#ef4444" />
//     </linearGradient>
//     <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//       <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
//     </filter>
//   </defs>

//   <circle cx="120" cy="120" r="110" fill="#fef2f2" />

//   <circle cx="120" cy="120" r="80" fill="url(#searchGradient)" filter="url(#shadow)" />
  
//   <g transform="translate(85, 85) scale(0.8)" fill="none" stroke="white" stroke-width="16" stroke-linecap="round">
//     <circle cx="60" cy="60" r="35" />
//     <line x1="105" y1="105" x2="85" y2="85" />
//   </g>
  
//   <g transform="translate(120, 120)">
//     <circle cx="0" cy="0" r="24" fill="white" />
//     <g transform="translate(-12, -12)" stroke="url(#searchGradient)" stroke-width="4" stroke-linecap="round">
//       <line x1="6" y1="6" x2="18" y2="18" />
//       <line x1="18" y1="6" x2="6" y2="18" />
//     </g>
//   </g>
// </svg>
// );

// const ServicesPage = () => {
//   const router = useRouter();
//   const [services, setServices] = useState<ISubService[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<ISubService[]>([]);
//   const [filteredServices, setFilteredServices] = useState<ISubService[]>([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const cartContext = useContext(CartContext);
//   const addToCart = cartContext?.addToCart;

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("/api/services");
//         const data = await response.json();
//         setServices(data.services);
//         setFilteredServices(data.services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() !== "") {
//       const matchingSuggestions = services.filter(service =>
//         service.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSuggestions(matchingSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchQuery, services]);

//   const handleSearch = async () => {
//     setHasSearched(true);
//     const searchResults = services.filter(service =>
//       service.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredServices(searchResults);

//     if (searchResults.length === 0 && searchQuery.trim() !== "") {
//       try {
//         await fetch("/api/nonavailable-services", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ serviceName: searchQuery, searchCount: 1 }),
//         });
//       } catch (error) {
//         console.error("Failed to store non-available service:", error);
//       }
//     }
//   };

//   const handleSuggestionClick = (title: string) => {
//     setSearchQuery(title);
//     setSuggestions([]);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white text-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-white text-black">
//       <div className="relative z-10 container mx-auto px-6 py-16">
//         <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>

//         {/* Search Bar */}
//         <div className="relative w-full max-w-md mx-auto mb-6">
//           <input
//             type="text"
//             placeholder="Search services..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleSearch();
//               }
//             }}
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent hover:bg-gray-100 rounded-r-lg focus:outline-none"
//           >
//             <Search />
//           </button>
          
//           {/* Suggestions Dropdown */}
//           {suggestions.length > 0 && (
//             <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion._id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => handleSuggestionClick(suggestion.title)}
//                 >
//                   {suggestion.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* No Results Message */}
//         {hasSearched && filteredServices.length === 0 && searchQuery && (
//           <div className="text-center mb-8">
//             <NotFoundIcon />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Oops! Service Not Found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Sorry, we don't offer that service yet. We're working on making this service available soon!
//             </p>
//           </div>
//         )}

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.map((service) => {
//             const validImages = service.images?.filter((image) => image.trim() !== "");

//             return (
//               <div
//                 key={service._id}
//                 className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <div
//                   className="relative w-full h-48 mb-4"
//                   onClick={() => router.push(`/services/${service._id}`)}
//                 >
//                   {validImages.length > 0 ? (
//                     <Image
//                       src={validImages[0]}
//                       alt={service.title}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
//                       <span className="text-gray-700">No Image Available</span>
//                     </div>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-semibold">{service.title}</h2>
//                 <p className="text-sm text-gray-700">{service.category} - {service.place}</p>
//                 <p className="text-gray-500 mt-2">{service.description}</p>
//                 <p className="text-lg font-bold mt-2">₹{service.price}</p>
//                 <p className="text-sm text-gray-400 mt-2">Duration: {service.duration}</p>
//                 <button
//                   className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 transition"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart?.({
//                       _id: service._id,
//                       title: service.title,
//                       price: service.price,
//                       image: service.images[0] || "",
//                     });
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;

// "use client";
// import React, { useEffect, useState, useContext, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { CartContext } from "@/context/CartContext";
// import { Search } from "lucide-react";
// import Link from "next/link";
// import Navbar from "../(components)/ui/Navbar";

// export interface ISubService {
//   _id: string;
//   title: string;
//   category: string;
//   place: string;
//   description: string;
//   images: string[];
//   price: number;
//   duration: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const NotFoundIcon = () => (
//   <svg viewBox="0 0 240 240" className="w-40 h-40 mx-auto mb-4">
//   <defs>
//     <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stopColor="#f87171" />
//       <stop offset="100%" stopColor="#ef4444" />
//     </linearGradient>
//     <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//       <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15"/>
//     </filter>
//   </defs>

//   <circle cx="120" cy="120" r="110" fill="#fef2f2" />

//   <circle cx="120" cy="120" r="80" fill="url(#searchGradient)" filter="url(#shadow)" />
  
//   <g transform="translate(85, 85) scale(0.8)" fill="none" stroke="white" strokeWidth="16" strokeLinecap="round">
//     <circle cx="60" cy="60" r="35" />
//     <line x1="105" y1="105" x2="85" y2="85" />
//   </g>
  
//   <g transform="translate(120, 120)">
//     <circle cx="0" cy="0" r="24" fill="white" />
//     <g transform="translate(-12, -12)" stroke="url(#searchGradient)" strokeWidth="4" strokeLinecap="round">
//       <line x1="6" y1="6" x2="18" y2="18" />
//       <line x1="18" y1="6" x2="6" y2="18" />
//     </g>
//   </g>
// </svg>
// );

// const ServicesPage = () => {
//   const router = useRouter();
//   const [services, setServices] = useState<ISubService[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<ISubService[]>([]);
//   const [filteredServices, setFilteredServices] = useState<ISubService[]>([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const cartContext = useContext(CartContext);
//   const addToCart = cartContext?.addToCart;

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("/api/services");
//         const data = await response.json();
//         setServices(data.services);
//         setFilteredServices(data.services);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     // Handle click outside of search container
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchContainerRef.current &&
//         !searchContainerRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() !== "") {
//       const matchingSuggestions = services.filter(service =>
//         service.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSuggestions(matchingSuggestions);
//       setIsDropdownOpen(true);
//     } else {
//       setSuggestions([]);
//       setIsDropdownOpen(false);
//     }
//   }, [searchQuery, services]);

//   const handleSearch = async () => {
//     setHasSearched(true);
//     setIsDropdownOpen(false);
//     const searchResults = services.filter(service =>
//       service.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredServices(searchResults);

//     if (searchResults.length === 0 && searchQuery.trim() !== "") {
//       try {
//         await fetch("/api/nonavailable-services", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ serviceName: searchQuery, searchCount: 1 }),
//         });
//       } catch (error) {
//         console.error("Failed to store non-available service:", error);
//       }
//     }
//   };

//   const handleSuggestionClick = (title: string) => {
//     setSearchQuery(title);
//     setSuggestions([]); // Clear suggestions immediately
//     setIsDropdownOpen(false); // Explicitly close dropdown
//     // We don't want to trigger search automatically here
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white text-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-white text-black">
//       <Navbar />
//       <div className="relative z-10 container mx-auto px-6 py-16">
//         <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>

//         {/* Search Bar */}
//         <div ref={searchContainerRef} className="relative w-full max-w-md mx-auto mb-6">
//           <input
//             type="text"
//             placeholder="Search services..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleSearch();
//               }
//             }}
//             onClick={() => {
//               if (searchQuery.trim() !== "") {
//                 setIsDropdownOpen(true);
//               }
//             }}
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent hover:bg-gray-100 rounded-r-lg focus:outline-none"
//           >
//             <Search />
//           </button>
          
//           {/* Suggestions Dropdown */}
//           {isDropdownOpen && suggestions.length > 0 && (
//             <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion._id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => handleSuggestionClick(suggestion.title)}
//                 >
//                   {suggestion.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* No Results Message */}
//         {hasSearched && filteredServices.length === 0 && searchQuery && (
//           <div className="text-center mb-8">
//             <NotFoundIcon />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               Oops! Service Not Found
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Sorry, we don't offer that service yet. We're working on making this service available soon!
//             </p>
//           </div>
//         )}

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.map((service) => {
//             const validImages = service.images?.filter((image) => image.trim() !== "");

//             return (
//               <div
//                 key={service._id}
//                 className="p-6 border rounded-lg bg-white text-black shadow-md cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <div
//                   className="relative w-full h-48 mb-4"
//                   onClick={() => router.push(`/services/${service._id}`)}
//                 >
//                   {validImages.length > 0 ? (
//                     <Image
//                       src={validImages[0]}
//                       alt={service.title}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-300 rounded-md flex items-center justify-center">
//                       <span className="text-gray-700">No Image Available</span>
//                     </div>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-semibold">{service.title}</h2>
//                 <p className="text-sm text-gray-700">{service.category} - {service.place}</p>
//                 <p className="text-gray-500 mt-2">{service.description}</p>
//                 <p className="text-lg font-bold mt-2">₹{service.price} / hour</p>
//                 <p className="text-sm text-gray-700 mt-2">Duration: {service.duration}</p>
//                 <button
//                   className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-900 transition"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart?.({
//                       _id: service._id,
//                       title: service.title,
//                       price: service.price,
//                       image: service.images[0] || "",
//                     });
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;

"use client"

import { useEffect, useState, useContext, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CartContext } from "@/context/CartContext"
import { Search } from "lucide-react"
// import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "../(components)/ui/Navbar"

export interface ISubService {
  _id: string
  title: string
  category: string
  place: string
  description: string
  images: string[]
  price: number
  duration: string
  createdAt: string
  updatedAt: string
}

const NotFoundIcon = () => (
  <motion.svg
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    viewBox="0 0 240 240"
    className="w-40 h-40 mx-auto mb-4"
  >
    <defs>
      <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
      </filter>
    </defs>

    <circle cx="120" cy="120" r="110" fill="#1f2937" />

    <circle cx="120" cy="120" r="80" fill="url(#searchGradient)" filter="url(#shadow)" />

    <g transform="translate(85, 85) scale(0.8)" fill="none" stroke="white" strokeWidth="16" strokeLinecap="round">
      <circle cx="60" cy="60" r="35" />
      <line x1="105" y1="105" x2="85" y2="85" />
    </g>

    <g transform="translate(120, 120)">
      <circle cx="0" cy="0" r="24" fill="white" />
      <g transform="translate(-12, -12)" stroke="url(#searchGradient)" strokeWidth="4" strokeLinecap="round">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </g>
    </g>
  </motion.svg>
)

const ServicesPage = () => {
  const router = useRouter()
  const [services, setServices] = useState<ISubService[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<ISubService[]>([])
  const [filteredServices, setFilteredServices] = useState<ISubService[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const cartContext = useContext(CartContext)
  const addToCart = cartContext?.addToCart

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()
        setServices(data.services)
        setFilteredServices(data.services)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const matchingSuggestions = services.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSuggestions(matchingSuggestions)
      setIsDropdownOpen(true)
    } else {
      setSuggestions([])
      setIsDropdownOpen(false)
    }
  }, [searchQuery, services])

  const handleSearch = async () => {
    setHasSearched(true)
    setIsDropdownOpen(false)
    const searchResults = services.filter((service) => service.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredServices(searchResults)

    if (searchResults.length === 0 && searchQuery.trim() !== "") {
      try {
        await fetch("/api/nonavailable-services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serviceName: searchQuery, searchCount: 1 }),
        })
      } catch (error) {
        console.error("Failed to store non-available service:", error)
      }
    }
  }

  const handleSuggestionClick = (title: string) => {
    setSearchQuery(title)
    setSuggestions([])
    setIsDropdownOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative z-10 container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-12">Discover Our Services</h1>

        <div ref={searchContainerRef} className="relative w-full max-w-md mx-auto mb-6">
          <Input
            type="text"
            placeholder="Search services..."
            className="w-full pr-10 bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            onClick={() => {
              if (searchQuery.trim() !== "") {
                setIsDropdownOpen(true)
              }
            }}
          />
          <Button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 px-3 bg-transparent hover:bg-gray-700 rounded-r-lg focus:outline-none"
          >
            <Search className="h-5 w-5" />
          </Button>

          <AnimatePresence>
            {isDropdownOpen && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
              >
                {suggestions.map((suggestion) => (
                  <motion.li
                    key={suggestion._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion.title)}
                  >
                    {suggestion.title}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {hasSearched && filteredServices.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <NotFoundIcon />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Oops! Service Not Found</h3>
              <p className="text-gray-400 mb-4">
                Sorry, we don&apos;t offer that service yet. We&apos;re working on making this service available soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => {
            const validImages = service.images?.filter((image) => image.trim() !== "")

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border rounded-lg bg-gray-200 text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="relative w-full h-48 mb-4 overflow-hidden rounded-md"
                  onClick={() => router.push(`/services/${service._id}`)}
                >
                  {validImages.length > 0 ? (
                    <Image
                      src={validImages[0] || "/placeholder.svg"}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center">
                      <span className="text-gray-400">No Image Available</span>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
                <p className="text-sm text-gray-800">
                  {service.category} - {service.place}
                </p>
                <p className="text-gray-900 mt-2 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold">₹{service.price} / hour</p>
                  <p className="text-sm text-gray-700">Duration: {service.duration}</p>
                </div>
                <Button
                  className="mt-4 w-full bg-black hover:bg-black text-white transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart?.({
                      _id: service._id,
                      title: service.title,
                      price: service.price,
                      image: service.images[0] || "",
                    })
                  }}
                >
                  Add to Cart
                </Button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default ServicesPage

