
// "use client";
//
// import { useState, useEffect, useRef } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { ShoppingCart, Users, Star, Clock, Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Zap } from "lucide-react";
// import CleaningLoader from "../(components)/ui/CleaningLoader";

// export default function AboutUs() {
//     const [clientCount, setClientCount] = useState(0);
//     const [typedText, setTypedText] = useState("");
//     const controls = useAnimation();
//     const statsRef = useRef(null);
//     const isStatsInView = useInView(statsRef);

//     const fullText = "Fast Service";
//     let index = 0;

//     const stats = [
//         { icon: <Users size={32} className="text-gray-300" />, value: `${clientCount}+`, label: "Happy Clients" },
//         { icon: <Star size={32} className="text-yellow-400 animate-pulse" />, value: "4.9 / 5", label: "Average Rating" },
//         { icon: <Zap size={32} className="text-blue-400 rotate-6" />, value: typedText, label: "Support" },
//     ];

//     const services = [
//         { title: "House Cleaning", description: "Deep cleaning for homes of all sizes" },
//         { title: "Office Cleaning", description: "Professional workplace maintenance" },
//         { title: "AC Cleaning", description: "Expert air conditioning servicing" },
//     ];

//     const gallery = [
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//     ];

//     useEffect(() => {
//         if (isStatsInView) {
//             controls.start("visible");
//             let count = 1;
//             const interval = setInterval(() => {
//                 setClientCount((prev) => {
//                     if (prev >= 500) {
//                         clearInterval(interval);
//                         return 500;
//                     }
//                     return prev + Math.floor(Math.random() * 2) + 10;
//                 });
//             }, 30);
//             return () => clearInterval(interval);
//         }
//     }, [isStatsInView, controls]);

//     useEffect(() => {
//         let typingInterval = setInterval(() => {
//             setTypedText((prev) => {
//                 if (index === fullText.length) {
//                     clearInterval(typingInterval);
//                     return fullText;
//                 }
//                 return fullText.substring(0, index++);
//             });
//         }, 300);
//         return () => clearInterval(typingInterval);
//     }, []);

//     return (
//         <div className="bg-black text-white relative">
//             {/* Hero Section */}
//             <section className="relative h-[50vh] flex flex-col items-center justify-center bg-black text-center">
//                 <div className="absolute inset-0 bg-black/70"></div>
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="relative z-10 px-4 mt-8"
//                 >
//                     <h1 className="text-5xl md:text-6xl font-bold mb-8">HelperBuddy</h1>
//                     <p className="text-xl max-w-2xl mx-auto text-gray-300 mt-9">
//                         Your All-Round support Partner in Professional Cleaning Services
//                     </p>
//                 </motion.div>
//             </section>

//             {/* Stats Section */}
//             <section ref={statsRef} className="py-1 bg-black">
//                 <div className="container mx-auto px-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                         {stats.map((stat, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                                 viewport={{ once: true, amount: 0.5 }}
//                                 className="p-6 bg-black rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
//                             >
//                                 <div className="flex justify-center mb-4">{stat.icon}</div>
//                                 <h3 className="text-3xl font-bold">{stat.value}</h3>
//                                 <p className="text-gray-400">{stat.label}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section className="py-16 bg-black">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-12">Our Services</h2>
//                     <h3 className="text-xl max-w-4xl mx-auto text-gray-300 mb-12">
//                         HelperBuddy offers professional house, office, and AC cleaning services across India, delivering top-quality, eco-friendly solutions tailored to your needs. Our trusted team ensures your spaces are spotless, fresh, and well-maintained.
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {services.map((service, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition-all"
//                             >
//                                 <h3 className="text-xl font-bold mb-4">{service.title}</h3>
//                                 <p className="text-gray-400">{service.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Gallery Section */}
//             <section className="py-16 bg-black">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-12">Our Work</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {gallery.map((image, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 className="overflow-hidden rounded-lg shadow-lg"
//                             >
//                                 <img
//                                     src={image}
//                                     alt={`Gallery image ${index + 1}`}
//                                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                                 />
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Social Media Section */}
//             <section className="py-2 bg-black">
//                 <div className="container mx-auto text-center">
//                     <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
//                     <div className="flex justify-center space-x-6">
//                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
//                             <Instagram size={30} />
//                         </a>
//                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
//                             <Facebook size={30} />
//                         </a>
//                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
//                             <Twitter size={30} />
//                         </a>
//                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
//                             <Linkedin size={30} />
//                         </a>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Section */}
//             <section className="py-16 bg-black">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-9">Contact Us</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//                         {[{ Icon: Phone, text: "+91 1234567890" }, { Icon: Mail, text: "contact@helperbuddy.com" }, { Icon: MapPin, text: "Surat, Mumbai" }].map(
//                             (contact, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.2 }}
//                                     className="flex items-center justify-center space-x-2 text-gray-300"
//                                 >
//                                     <contact.Icon className="text-gray-400" />
//                                     <span>{contact.text}</span>
//                                 </motion.div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { ShoppingCart, Users, Star, Clock, Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Zap } from "lucide-react";
// import CleaningLoader from "../(components)/ui/CleaningLoader";
// import Navbar from "../(components)/ui/Navbar";

// export default function AboutUs() {
//     const [clientCount, setClientCount] = useState(0);
//     const [typedText, setTypedText] = useState("");
//     const controls = useAnimation();
//     const statsRef = useRef(null);
//     const isStatsInView = useInView(statsRef);

//     const fullText = "Fast Service";
//     let index = 0;

//     const stats = [
//         { icon: <Users size={32} className="text-gray-600" />, value: `${clientCount}+`, label: "Happy Clients" },
//         { icon: <Star size={32} className="text-yellow-400 animate-pulse" />, value: "4.9 / 5", label: "Average Rating" },
//         { icon: <Zap size={32} className="text-blue-400 rotate-6" />, value: typedText, label: "Support" },
//     ];

//     const services = [
//         { title: "House Cleaning", description: "Deep cleaning for homes of all sizes" },
//         { title: "Office Cleaning", description: "Professional workplace maintenance" },
//         { title: "AC Cleaning", description: "Expert air conditioning servicing" },
//     ];

//     const gallery = [
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//         "/images/web1.jpg",
//         "/images/web2.jpg",
//         "/images/web3.jpg",
//     ];

//     useEffect(() => {
//         if (isStatsInView) {
//             controls.start("visible");
//             let count = 1;
//             const interval = setInterval(() => {
//                 setClientCount((prev) => {
//                     if (prev >= 500) {
//                         clearInterval(interval);
//                         return 500;
//                     }
//                     return prev + Math.floor(Math.random() * 2) + 10;
//                 });
//             }, 30);
//             return () => clearInterval(interval);
//         }
//     }, [isStatsInView, controls]);

//     useEffect(() => {
//         let typingInterval = setInterval(() => {
//             setTypedText((prev) => {
//                 if (index === fullText.length) {
//                     clearInterval(typingInterval);
//                     return fullText;
//                 }
//                 return fullText.substring(0, index++);
//             });
//         }, 300);
//         return () => clearInterval(typingInterval);
//     }, []);

//     return (
//         <div className="bg-white text-black relative">
//             <Navbar />
//             {/* Hero Section */}
//             <section className="relative h-[50vh] flex flex-col items-center justify-center bg-white text-center">
//                 <div className="absolute inset-0 bg-white/70"></div>
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="relative z-10 px-4 mt-8"
//                 >
//                     <h1 className="text-5xl md:text-6xl font-bold mb-8">HelperBuddy</h1>
//                     <p className="text-xl max-w-2xl mx-auto text-gray-600 mt-9">
//                         Your All-Round support Partner in Professional Cleaning Services
//                     </p>
//                 </motion.div>
//             </section>

//             {/* Stats Section */}
//             <section ref={statsRef} className="py-1 bg-white">
//                 <div className="container mx-auto px-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                         {stats.map((stat, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                                 viewport={{ once: true, amount: 0.5 }}
//                                 className="p-6 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
//                             >
//                                 <div className="flex justify-center mb-4">{stat.icon}</div>
//                                 <h3 className="text-3xl font-bold">{stat.value}</h3>
//                                 <p className="text-gray-600">{stat.label}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Services Section */}
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-12">Our Services</h2>
//                     <h3 className="text-xl max-w-4xl mx-auto text-gray-600 mb-12">
//                         HelperBuddy offers professional house, office, and AC cleaning services across India, delivering top-quality, eco-friendly solutions tailored to your needs. Our trusted team ensures your spaces are spotless, fresh, and well-maintained.
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {services.map((service, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all"
//                             >
//                                 <h3 className="text-xl font-bold mb-4">{service.title}</h3>
//                                 <p className="text-gray-600">{service.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Gallery Section */}
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-12">Our Work</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {gallery.map((image, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 className="overflow-hidden rounded-lg shadow-lg"
//                             >
//                                 <img
//                                     src={image}
//                                     alt={`Gallery image ${index + 1}`}
//                                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                                 />
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Social Media Section */}
//             <section className="py-2 bg-white">
//                 <div className="container mx-auto text-center">
//                     <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
//                     <div className="flex justify-center space-x-6">
//                         <a href="https://www.instagram.com/helperbuddy.in/reels/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
//                             <Instagram size={30} />
//                         </a>
//                         <a href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
//                             <Facebook size={30} />
//                         </a>
//                         <a href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
//                             <Twitter size={30} />
//                         </a>
//                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
//                             <Linkedin size={30} />
//                         </a>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Section */}
//             <section className="py-16 bg-white">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-3xl font-bold mb-9">Contact Us</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//                         {[{ Icon: Phone, text: "+91 1234567890" }, { Icon: Mail, text: "contact@helperbuddy.com" }, { Icon: MapPin, text: "Surat, Mumbai" }].map(
//                             (contact, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.2 }}
//                                     className="flex items-center justify-center space-x-2 text-gray-600"
//                                 >
//                                     <contact.Icon className="text-gray-600" />
//                                     <span>{contact.text}</span>
//                                 </motion.div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ShoppingCart, Users, Star, Clock, Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Zap } from "lucide-react";
// import CleaningLoader from "../(components)/ui/CleaningLoader";
import Navbar from "../(components)/ui/Navbar";
import Image from 'next/image'

export default function AboutUs() {
    const [clientCount, setClientCount] = useState(0);
    const [typedText, setTypedText] = useState("");
    const controls = useAnimation();
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef);
    console.log(ShoppingCart)
    console.log(Clock)
    const fullText = "Fast Service";
    let index = 0;

    const stats = [
        { icon: <Users size={32} className="text-gray-400" />, value: `${clientCount}+`, label: "Happy Clients" },
        { icon: <Star size={32} className="text-yellow-400 animate-pulse" />, value: "4.9 / 5", label: "Average Rating" },
        { icon: <Zap size={32} className="text-blue-400 rotate-6" />, value: typedText, label: "Support" },
    ];

    const services = [
        { title: "House Cleaning", description: "Deep cleaning for homes of all sizes" },
        { title: "Office Cleaning", description: "Professional workplace maintenance" },
        { title: "AC Cleaning", description: "Expert air conditioning servicing" },
    ];

    const gallery = [
        "/asserts/ac.webp",
        "/asserts/fullhome.jpg",
        "/asserts/watermain.webp",
        "/asserts/refrigerator.jpg",
        "/asserts/electrical.jpg",
        "/asserts/plumber.webp",
        "/asserts/washingmachine.jpg",
        "/asserts/carenter.jpg",
        "/asserts/waterservice.webp",
    ];

    useEffect(() => {
        if (isStatsInView) {
            controls.start("visible");
            // let count = 1;
            const interval = setInterval(() => {
                setClientCount((prev) => {
                    if (prev >= 500) {
                        clearInterval(interval);
                        return 500;
                    }
                    return prev + Math.floor(Math.random() * 2) + 10;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isStatsInView, controls]);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            setTypedText((prev) => {
                if (index === fullText.length) {
                    clearInterval(typingInterval);
                    console.log(prev)
                    return fullText;
                }
                return fullText.substring(0, index++);
            });
        }, 300);
        return () => clearInterval(typingInterval);
    }, [index]);

    return (
        <div className="bg-black text-white relative">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-[50vh] flex flex-col items-center justify-center bg-black text-center">
                <div className="absolute inset-0 bg-black/70"></div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 px-4 mt-8"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-8">HelperBuddy</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300 mt-9">
                        Your All-Round support Partner in Professional Cleaning Services
                    </p>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-1 bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="p-6 bg-black rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
                            >
                                <div className="flex justify-center mb-4">{stat.icon}</div>
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Our Services</h2>
                    <h3 className="text-xl max-w-4xl mx-auto text-gray-300 mb-12">
                        HelperBuddy offers professional house, office, and AC cleaning services across India, delivering top-quality, eco-friendly solutions tailored to your needs. Our trusted team ensures your spaces are spotless, fresh, and well-maintained.
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition-all"
                            >
                                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                                <p className="text-gray-400">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Our Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="overflow-hidden rounded-lg shadow-lg"
                            >
                                <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="py-2 bg-black">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                    <div className="flex justify-center space-x-6">
                        <a href="https://www.instagram.com/helperbuddy.in/reels/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <Instagram size={30} />
                        </a>
                        <a href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <Facebook size={30} />
                        </a>
                        <a href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <Twitter size={30} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <Linkedin size={30} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-9">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[{ Icon: Phone, text: "+91 1234567890" }, { Icon: Mail, text: "contact@helperbuddy.com" }, { Icon: MapPin, text: "Surat, Mumbai" }].map(
                            (contact, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="flex items-center justify-center space-x-2 text-gray-400"
                                >
                                    <contact.Icon className="text-gray-400" />
                                    <span>{contact.text}</span>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
