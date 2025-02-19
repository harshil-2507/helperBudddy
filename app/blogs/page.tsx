// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import * as THREE from 'three';
// import { Camera, Sparkles, Pyramid } from 'lucide-react';
// import Link from 'next/link';

// const BlogList = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [hoveredBlog, setHoveredBlog] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const threeContainerRef = useRef<HTMLDivElement>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const particlesRef = useRef<THREE.Points | null>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const blogs = [
//     {
//       id: 1,
//       title: "The Future of Web Development",
//       excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
//       author: "Sarah Johnson",
//       date: "Feb 10, 2025",
//       readTime: "5 min read",
//       category: "Technology",
//       color: "#FF6B6B"
//     },
//     {
//       id: 2,
//       title: "Mastering Tailwind CSS",
//       excerpt: "A comprehensive guide to building beautiful interfaces with Tailwind CSS...",
//       author: "Michael Chen",
//       date: "Feb 8, 2025",
//       readTime: "7 min read",
//       category: "Design",
//       color: "#4ECDC4"
//     }
//   ];

//   useEffect(() => {
//     // Initialize Three.js scene
//     if (typeof window === "undefined") return; 
//     const container = threeContainerRef.current;
//     if (!container) return;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     // Scene setup with white background
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000); // White background
//     sceneRef.current = scene;

//     // Camera setup
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 5;
//     cameraRef.current = camera;

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     // Create particle system with black particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particleCount = 1500; // Increased particle count for better effect
//     const positions = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 10;
//       positions[i + 1] = (Math.random() - 0.5) * 10;
//       positions[i + 2] = (Math.random() - 0.5) * 10;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//     // Black particles with custom size and opacity
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       color: 0xFFFFFF, // Black particles
//       transparent: true,
//       opacity: 0.6,
//       sizeAttenuation: true
//     });

//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);
//     particlesRef.current = particles;

//     // Animation loop with smoother rotation
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       if (particlesRef.current) {
//         particlesRef.current.rotation.x += 0.0005;
//         particlesRef.current.rotation.y += 0.0007;
//       }

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       const newWidth = container.clientWidth;
//       const newHeight = container.clientHeight;

//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();

//       renderer.setSize(newWidth, newHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (renderer) {
//         renderer.dispose();
//         if (renderer.domElement && container.contains(renderer.domElement)) {
//           container.removeChild(renderer.domElement);
//         }
//       }
//       if (particlesGeometry) {
//         particlesGeometry.dispose();
//       }
//       if (particlesMaterial) {
//         particlesMaterial.dispose();
//       }
//     };
//   }, []);

//   // Mouse movement effect with smoother particle response
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1
//       });

//       if (particlesRef.current) {
//         particlesRef.current.rotation.x += e.movementY * 0.0001;
//         particlesRef.current.rotation.y += e.movementX * 0.0001;
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
//       {/* 3D Background */}
//       <div 
//         ref={threeContainerRef} 
//         className="fixed inset-0 pointer-events-none z-0"
//       />

//       {/* Content */}
//       <div className="relative z-10">
//         {/* Hero Section */}
//         <motion.div 
//           className="min-h-screen flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.5 }}
//         >
//           <div className="text-center space-y-8">
//             <h1 className="text-7xl pb-3 font-bold bg-clip-text text-transparent bg-white">
//               Our Blogs
//             </h1>
//             <p className="text-2xl text-gray-100 px-auto max-w-2xl">
//             Explore our universe of insights and practical tips for a sparkling clean home or business. From quick fixes to deep cleans, we've got you covered with expert advice. 
//             </p>
//           </div>
//         </motion.div>

//         {/* Blog Section */}
//         <div className="container mx-auto px-4 py-24">
//           {/* Category Filter */}
//           <motion.div 
//             className="flex flex-wrap gap-6 mb-16 justify-center"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             {isMounted && ['All', 'Technology', 'Design', 'Development'].map((category, index) => (
//               <motion.button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-8 py-4 rounded-full backdrop-blur-md ${
//                   selectedCategory === category
//                     ? 'bg-white/20 text-white'
//                     : 'bg-white/5 text-gray-400 hover:bg-white/10'
//                 } transition-all duration-300`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 custom={index}
//                 variants={{
//                   hidden: { opacity: 0, x: -50 },
//                   visible: i => ({
//                     opacity: 1,
//                     x: 0,
//                     transition: { delay: i * 0.1 }
//                   })
//                 }}
//               >
//                 {category}
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Blog Grid */}
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             layout
//           >
//             <AnimatePresence mode="wait">
//               {blogs
//                 .filter(blog => selectedCategory === 'All' || blog.category === selectedCategory)
//                 .map((blog) => (
//                   <motion.article
//                     key={blog.id}
//                     layout
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     // whileHover={{ y: -10 }}
//                     className="group relative"
//                   >
//                     <Link href={`/blogs/${blog.id}`} key={blog.id}>
//                     <div className="rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
//                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
//                       <motion.div
//                         initial={false}
//                         animate={{
//                           background: `linear-gradient(45deg, ${blog.color}22, transparent)`
//                         }}
//                         className="aspect-video rounded-xl mb-6 overflow-hidden relative"
//                       >
//                         <Sparkles
//                           className="absolute top-4 right-4 text-white/50 group-hover:text-white transition-colors duration-300"
//                           size={24}
//                         />
//                         <img
//                           src="/images/web1.jpg"
//                           alt={blog.title}
//                           className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </motion.div>

//                       <div className="space-y-4 relative z-10">
//                         <div className="flex items-center gap-4 text-sm">
//                           <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
//                             {blog.category}
//                           </span>
//                           <span className="text-white/60">{blog.readTime}</span>
//                         </div>

//                         <h2 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">
//                           {blog.title}
//                         </h2>

//                         <p className="text-gray-400 line-clamp-2">
//                           {blog.excerpt}
//                         </p>

//                         <div className="flex items-center gap-4 pt-4 border-t border-white/10">
//                           <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
//                             <img 
//                               src="/api/placeholder/40/40" 
//                               alt={blog.author}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium text-white/90">{blog.author}</p>
//                             <p className="text-sm text-white/60">{blog.date}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     </Link>
//                   </motion.article>
//                 ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogList;

// "use client"

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sparkles, ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// const BlogList = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [scrollY, setScrollY] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const blogs = [
//     {
//       id: 1,
//       title: "The Future of Web Development",
//       excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
//       author: "Sarah Johnson",
//       date: "Feb 10, 2025",
//       readTime: "5 min read",
//       category: "Technology",
//       color: "#FF6B6B"
//     },
//     {
//       id: 2,
//       title: "Mastering Tailwind CSS",
//       excerpt: "A comprehensive guide to building beautiful interfaces with Tailwind CSS...",
//       author: "Michael Chen",
//       date: "Feb 8, 2025",
//       readTime: "7 min read",
//       category: "Design",
//       color: "#4ECDC4"
//     },
//     {
//       id: 3,
//       title: "The Rise of Prem Jaiswar",
//       excerpt: "Exploring the marvelous journey of web development of Prem Jaiswar...",
//       author: "Shabbir Hussainy",
//       date: "Feb 18, 2025",
//       readTime: "5 min read",
//       category: "Friendship",
//       color: "#FF6B6B"
//     }
//   ];

//   const fadeInUp = {
//     initial: { y: 60, opacity: 0 },
//     animate: { y: 0, opacity: 1 },
//     exit: { y: 60, opacity: 0 }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
//       {/* Hero Section with Parallax */}
//       <motion.div 
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)"
//         }}
//       >
//         <motion.div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: "url('/api/placeholder/1920/1080')",
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             y: scrollY * 0.5
//           }}
//         />
//         <div className="relative z-10 text-center space-y-8 px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-6"
//           >
//             <h1 className="text-7xl font-bold tracking-tight">
//               <span className="inline-block border-b-2 border-white pb-2 text-black">Our Blogs</span>
//             </h1>
//             <p className="text-2xl text-black max-w-2xl mx-auto leading-relaxed">
//               Explore our universe of insights and practical tips for a sparkling clean home or business.
//             </p>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="animate-bounce"
//           >
//             <ArrowRight className="mx-auto transform rotate-90" size={32} />
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Blog Section */}
//       <div className="container mx-auto px-4 py-24">
//         {/* Category Filter */}
//         <motion.div 
//           className="flex flex-wrap gap-4 mb-16 justify-center"
//           variants={fadeInUp}
//           initial="initial"
//           animate="animate"
//         >
//           {isMounted && ['All', 'Technology', 'Design', 'Development'].map((category) => (
//             <motion.button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-6 py-3 rounded-full border ${
//                 selectedCategory === category
//                   ? 'bg-white text-black border-white'
//                   : 'border-white/20 hover:border-white'
//               } transition-all duration-300`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Blog Grid */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           layout
//         >
//           <AnimatePresence mode="wait">
//             {blogs
//               .filter(blog => selectedCategory === 'All' || blog.category === selectedCategory)
//               .map((blog) => (
//                 <motion.article
//                   key={blog.id}
//                   layout
//                   variants={fadeInUp}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   className="group"
//                 >
//                   <Link href={`/blogs/${blog.id}`}>
//                     <div className="h-full rounded-2xl border border-white/10 hover:border-white/10 p-6 transition-all duration-500 hover:bg-white/5">
//                       <div className="aspect-video rounded-xl mb-6 overflow-hidden relative">
//                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           transition={{ duration: 0.6 }}
//                           className="h-full"
//                         >
//                           <img
//                             src="/api/placeholder/600/400"
//                             alt={blog.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </motion.div>
//                         <Sparkles
//                           className="absolute top-4 right-4 z-20 text-black group-hover:text-black transition-colors duration-300"
//                           size={24}
//                         />
//                       </div>

//                       <div className="space-y-4">
//                         <div className="flex items-center gap-4 text-sm">
//                           <span className="px-3 py-1 rounded-full bg-white/10 text-black">
//                             {blog.category}
//                           </span>
//                           <span className="text-black">{blog.readTime}</span>
//                         </div>

//                         <h2 className="text-2xl font-bold group-hover:text-black transition-colors duration-300">
//                           {blog.title}
//                         </h2>

//                         <p className="text-black line-clamp-2 group-hover:text-black transition-colors duration-300">
//                           {blog.excerpt}
//                         </p>

//                         <div className="flex items-center gap-4 pt-4 border-t border-white/10">
//                           <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
//                             <img 
//                               src="/api/placeholder/40/40" 
//                               alt={blog.author}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium text-black">{blog.author}</p>
//                             <p className="text-sm text-black">{blog.date}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.article>
//               ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BlogList;

// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
// import { Sparkles, ArrowRight, Circle, MousePointer, ArrowDown } from 'lucide-react';
// import Link from 'next/link';
// import Navbar from '../(components)/ui/Navbar';

// const BlogList = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorVariant, setCursorVariant] = useState("default");
//   const [isMounted, setIsMounted] = useState(false);
//   const { scrollY } = useScroll();
//   const blogRef = useRef<HTMLDivElement>(null);

//   // Parallax and scroll effects
//   const y = useSpring(useTransform(scrollY, [0, 1000], [0, 400]), {
//     stiffness: 100,
//     damping: 30
//   });
  
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);
//   const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

//   useEffect(() => {
//     setIsMounted(true);
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const blogs = [
//     {
//       id: 1,
//       title: "The Future of Web Development",
//       excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
//       author: "Sarah Johnson",
//       date: "Feb 10, 2025",
//       readTime: "5 min read",
//       category: "Technology",
//       color: "#FF6B6B"
//     },
//     {
//       id: 2,
//       title: "Mastering Tailwind CSS",
//       excerpt: "A comprehensive guide to building beautiful interfaces with Tailwind CSS...",
//       author: "Michael Chen",
//       date: "Feb 8, 2025",
//       readTime: "7 min read",
//       category: "Design",
//       color: "#4ECDC4"
//     }
//   ];

//   // Custom cursor animations
//   const variants = {
//     default: {
//       x: mousePosition.x - 16,
//       y: mousePosition.y - 16,
//       scale: 1
//     },
//     text: {
//       x: mousePosition.x - 16,
//       y: mousePosition.y - 16,
//       scale: 1.5
//     }
//   };

//   const scrollToBlogs = () => {
//     blogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };


//   return (
//     <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
//       <Navbar />
//       {/* Custom Cursor */}
//       <motion.div
//         className="fixed top-0 left-0 w-8 h-8 z-50 pointer-events-none mix-blend-difference"
//         variants={variants}
//         animate={cursorVariant}
//         transition={{ type: "spring", stiffness: 500, damping: 28 }}
//       >
//         <Circle className="text-black" size={32} />
//       </motion.div>

//       {/* Hero Section with Enhanced UI */}
//       <div className="relative min-h-screen overflow-hidden">
//         {/* Animated Background Pattern */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute h-px w-px bg-black/10"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 scale: [1, 2, 1],
//                 opacity: [0.3, 1, 0.3],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </div>

//         {/* Main Hero Content */}
//         <motion.div 
//           className="relative min-h-screen flex items-center justify-center"
//           style={{ opacity, scale }}
//         >
//           <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
//             {/* Spotlight Effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-radial from-black/5 to-transparent rounded-full blur-3xl"
//               style={{
//                 x: mousePosition.x / 20,
//                 y: mousePosition.y / 20,
//               }}
//             />

//             {/* Title Section */}
//             <motion.div
//               className="space-y-8"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               onMouseEnter={() => setCursorVariant("text")}
//               onMouseLeave={() => setCursorVariant("default")}
//             >
//               <motion.div
//                 className="relative inline-block"
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               >
//                 <h1 className="text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-black/70">
//                   Our Blogs
//                 </h1>
//                 <motion.div
//                   className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                 />
//               </motion.div>

//               <motion.p
//                 className="text-2xl text-black/80 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.7 }}
//               >
//                 Explore our universe of insights and practical tips for a 
//                 <motion.span
//                   className="inline-block px-2 mx-1 relative bg-black text-white"
//                   // whileHover={{ scale: 1.1 }}
//                 >
//                   sparkling
//                   <Sparkles className="absolute -top-4 -right-4 text-black/40" size={16} />
//                 </motion.span>
//                 clean home or business.
//               </motion.p>
//             </motion.div>

//             {/* Interactive Elements */}
//             <motion.div
//               className="flex justify-center gap-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 1 }}
//             >
//               <motion.button
//                 className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-2 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={scrollToBlogs}
//               >
//                 Explore Blogs
//                 <motion.span
//                   className="inline-block"
//                   animate={{ y: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   <ArrowDown className="group-hover:translate-y-1 transition-transform" />
//                 </motion.span>
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Blog Section */}
//       <div className="container mx-auto px-4 py-24">
//         {/* Category Filter */}
//         <motion.div 
//           className="flex flex-wrap gap-4 mb-16 justify-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {isMounted && ['All', 'Technology', 'Design', 'Development'].map((category) => (
//             <motion.button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-6 py-3 rounded-full border ${
//                 selectedCategory === category
//                   ? 'bg-black text-white border-black'
//                   : 'border-black/20 hover:border-black'
//               } transition-all duration-300`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Blog Grid */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           ref={blogRef}
//           layout
//         >
//           <AnimatePresence mode="wait">
//             {blogs
//               .filter(blog => selectedCategory === 'All' || blog.category === selectedCategory)
//               .map((blog) => (
//                 <motion.article
//                   key={blog.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="group"
//                 >
//                   <Link href={`/blogs/${blog.id}`}>
//                     <div className="h-full rounded-2xl border border-black/10 hover:border-black/30 p-6 transition-all duration-500 hover:bg-black/5">
//                       <div className="aspect-video rounded-xl mb-6 overflow-hidden relative">
//                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           transition={{ duration: 0.6 }}
//                           className="h-full"
//                         >
//                           <img
//                             src="/api/placeholder/600/400"
//                             alt={blog.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </motion.div>
//                         <Sparkles
//                           className="absolute top-4 right-4 z-20 text-white/70 group-hover:text-white transition-colors duration-300"
//                           size={24}
//                         />
//                       </div>

//                       <div className="space-y-4">
//                         <div className="flex items-center gap-4 text-sm">
//                           <span className="px-3 py-1 rounded-full bg-black/10 text-black/90">
//                             {blog.category}
//                           </span>
//                           <span className="text-black/60">{blog.readTime}</span>
//                         </div>

//                         <h2 className="text-2xl font-bold group-hover:text-black transition-colors duration-300">
//                           {blog.title}
//                         </h2>

//                         <p className="text-gray-600 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
//                           {blog.excerpt}
//                         </p>

//                         <div className="flex items-center gap-4 pt-4 border-t border-black/10">
//                           <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden">
//                             <img 
//                               src="/api/placeholder/40/40" 
//                               alt={blog.author}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div>
//                             <p className="font-medium text-black/90">{blog.author}</p>
//                             <p className="text-sm text-black/60">{blog.date}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.article>
//               ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BlogList;

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { Sparkles, Circle, ArrowDown } from "lucide-react"
import Link from "next/link"
import Navbar from "../(components)/ui/Navbar"

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const blogRef = useRef<HTMLDivElement>(null)

  // Parallax and scroll effects
  const y = useSpring(useTransform(scrollY, [0, 1000], [0, 400]), {
    stiffness: 100,
    damping: 30,
  })

  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const blogs = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development...",
      author: "Sarah Johnson",
      date: "Feb 10, 2025",
      readTime: "5 min read",
      category: "Technology",
      color: "#FF6B6B",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "A comprehensive guide to building beautiful interfaces with Tailwind CSS...",
      author: "Michael Chen",
      date: "Feb 8, 2025",
      readTime: "7 min read",
      category: "Design",
      color: "#4ECDC4",
    },
  ]

  // Custom cursor animations
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
    },
  }

  const scrollToBlogs = () => {
    blogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Hero Section with Enhanced UI */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-px bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <motion.div className="relative min-h-screen flex items-center justify-center" style={{ opacity, scale }}>
          <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
            {/* Spotlight Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl"
              style={{
                x: mousePosition.x / 20,
                y: mousePosition.y / 20,
              }}
            />

            {/* Title Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <motion.div
                className="relative inline-block"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h1 className="text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  Our Blogs
                </h1>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              <motion.p
                className="text-2xl text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Explore our universe of insights and practical tips for a
                <motion.span className="inline-block px-2 mx-1 relative bg-white text-black">
                  sparkling
                  <Sparkles className="absolute -top-4 -right-4 text-white/40" size={16} />
                </motion.span>
                clean home or business.
              </motion.p>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-black rounded-full flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToBlogs}
              >
                Explore Blogs
                <motion.span
                  className="inline-block"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowDown className="group-hover:translate-y-1 transition-transform" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto px-4 py-24">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-4 mb-16 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isMounted &&
            ["All", "Technology", "Design", "Development"].map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border ${
                  selectedCategory === category
                    ? "bg-white text-black border-white"
                    : "border-white/20 hover:border-white"
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={blogRef} layout>
          <AnimatePresence mode="wait">
            {blogs
              .filter((blog) => selectedCategory === "All" || blog.category === selectedCategory)
              .map((blog) => (
                <motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group"
                >
                  <Link href={`/blogs/${blog.id}`}>
                    <div className="h-full rounded-2xl border border-white/10 hover:border-white/30 p-6 transition-all duration-500 hover:bg-white/5">
                      <div className="aspect-video rounded-xl mb-6 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="h-full">
                          <img src="/api/placeholder/600/400" alt={blog.title} className="w-full h-full object-cover" />
                        </motion.div>
                        <Sparkles
                          className="absolute top-4 right-4 z-20 text-white/70 group-hover:text-white transition-colors duration-300"
                          size={24}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-white/10 text-white/90">{blog.category}</span>
                          <span className="text-white/60">{blog.readTime}</span>
                        </div>

                        <h2 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">
                          {blog.title}
                        </h2>

                        <p className="text-gray-400 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                            <img
                              src="/api/placeholder/40/40"
                              alt={blog.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white/90">{blog.author}</p>
                            <p className="text-sm text-white/60">{blog.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogList

