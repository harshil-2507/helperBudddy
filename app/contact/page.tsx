// "use client"

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Facebook, Instagram, Linkedin, Twitter, Send, Map, Phone, Mail, ArrowRight } from 'lucide-react';

// const ContactPage = () => {
//   const [formStep, setFormStep] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Simulated submission delay
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setIsSubmitting(false);
//     setFormStep(2); // Success state
//   };

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       {/* Content */}
//       <div className="relative z-10">
//         {/* Hero Section */}
//         <motion.div 
//           className="pt-20 pb-20 px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="max-w-6xl mx-auto text-center">
//             <motion.h1 
//               className="text-7xl font-bold mb-6"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               Let's Connect
//             </motion.h1>
//             <motion.p 
//               className="text-xl text-gray-400 max-w-2xl mx-auto"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//             >
//               Ready to transform your space? We're here to help with any questions about our cleaning services.
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 pb-24">
//           <div className="grid lg:grid-cols-2 gap-16">
//             {/* Contact Information */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//               className="space-y-12"
//             >
//               <div className="space-y-8">
//                 <motion.div 
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
//                     <Map className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Our Location</h3>
//                     <p className="text-gray-400">Amroli Cross Rd, near Santosh Electronics,</p>
//                     <p className="text-gray-400">Bhagu Nagar-1, Amroli, Surat, Gujarat-394107</p>
//                   </div>
//                 </motion.div>

//                 <motion.div 
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
//                     <Phone className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Phone</h3>
//                     <p className="text-gray-400">6359398479</p>
//                   </div>
//                 </motion.div>

//                 <motion.div 
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
//                     <Mail className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Email</h3>
//                     <p className="text-gray-400">hello@helperbuddy.in</p>
//                   </div>
//                 </motion.div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold">Connect With Us</h3>
//                 <div className="flex space-x-4">
//                   {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
//                     <motion.a
//                       key={index}
//                       href="#"
//                       className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Icon className="w-6 h-6" />
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="relative"
//             >
//               <AnimatePresence mode="wait">
//                 {formStep === 0 && (
//                   <motion.form
//                     key="form"
//                     onSubmit={handleSubmit}
//                     className="space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                   >
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">First Name</label>
//                         <input
//                           type="text"
//                           required
//                           className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all duration-300"
//                           value={formData.firstName}
//                           onChange={(e) => setFormData({...formData, firstName: e.target.value})}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all duration-300"
//                           value={formData.lastName}
//                           onChange={(e) => setFormData({...formData, lastName: e.target.value})}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Email</label>
//                       <input
//                         type="email"
//                         required
//                         className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all duration-300"
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Message</label>
//                       <textarea
//                         required
//                         rows={4}
//                         className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all duration-300"
//                         value={formData.message}
//                         onChange={(e) => setFormData({...formData, message: e.target.value})}
//                       />
//                     </div>

//                     <motion.button
//                       type="submit"
//                       className="group flex items-center justify-center w-full px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <div className="h-6 w-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Send Message
//                           <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                         </>
//                       )}
//                     </motion.button>
//                   </motion.form>
//                 )}

//                 {formStep === 2 && (
//                   <motion.div
//                     key="success"
//                     className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-center"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                   >
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
//                       className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
//                     >
//                       <Send className="w-8 h-8 text-green-500" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
//                     <p className="text-gray-400 mb-6">We'll get back to you as soon as possible.</p>
//                     <motion.button
//                       onClick={() => {
//                         setFormStep(0);
//                         setFormData({
//                           firstName: '',
//                           lastName: '',
//                           email: '',
//                           message: ''
//                         });
//                       }}
//                       className="text-sm text-white/60 hover:text-white transition-colors duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Send another message
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

// "use client"

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Facebook, Instagram, Linkedin, Twitter, Send, Map, Phone, Mail, ArrowRight, Link } from 'lucide-react';
// import Navbar from '../(components)/ui/Navbar';

// const ContactPage = () => {
//   const [formStep, setFormStep] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/contact/submitForm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       console.log(response);

//       if (response.ok) {
//         setFormStep(2); // Success state
//       } else {
//         console.error('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black relative overflow-hidden">
//       <Navbar />
//       {/* Content */}
//       <div className="relative z-10">
//         {/* Hero Section */}
//         <motion.div
//           className="pt-20 pb-20 px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="max-w-6xl mx-auto text-center">
//             <motion.h1
//               className="text-7xl font-bold mb-6"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               Let's Connect
//             </motion.h1>
//             <motion.p
//               className="text-xl text-gray-600 max-w-2xl mx-auto"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//             >
//               Ready to transform your space? We're here to help with any questions about our cleaning services.
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 pb-24">
//           <div className="grid lg:grid-cols-2 gap-16">
//             {/* Contact Information */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//               className="space-y-12"
//             >
//               <div className="space-y-8">
//                 <motion.div
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <a
//                     className="p-4 rounded-2xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300"
//                     href="https://www.google.com/maps/place/Helper+Buddy/@21.2435001,72.8479034,16.87z/data=!4m6!3m5!1s0xaf2e30a69314d2c9:0x801c0b6392faabac!8m2!3d21.243603!4d72.8507302!16s%2Fg%2F11wp17_k54?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" // Direct link to Google Maps
//                     target="_blank" // Opens the link in a new tab
//                     rel="noopener noreferrer" // Security best practice for target="_blank"
//                   >
//                     <Map className="w-6 h-6" />
//                   </a>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Our Location</h3>
//                     <p className="text-gray-600">Amroli Cross Rd, near Santosh Electronics,</p>
//                     <p className="text-gray-600">Bhagu Nagar-1, Amroli, Surat, Gujarat-394107</p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="p-4 rounded-2xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
//                     <Phone className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Phone</h3>
//                     <p className="text-gray-600">+ 91 6359398479</p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="group flex items-start space-x-4"
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div className="p-4 rounded-2xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
//                     <Mail className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Email</h3>
//                     <p className="text-gray-600">hello@helperbuddy.in</p>
//                   </div>
//                 </motion.div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold">Connect With Us</h3>
//                 <div className="flex space-x-4">
//                 <a href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black">
//                     <Facebook className="h-6 w-6" />
//                   </a>
//                   <a href="https://www.instagram.com/helperbuddy.in/reels/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black">
//                     <Instagram className="h-6 w-6" />
//                   </a>
//                   <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black">
//                     <Linkedin className="h-6 w-6" />
//                   </a>
//                   <a href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black">
//                     <Twitter className="h-6 w-6" />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="relative"
//             >
//               <AnimatePresence mode="wait">
//                 {formStep === 0 && (
//                   <motion.form
//                     key="form"
//                     onSubmit={handleSubmit}
//                     className="space-y-6 p-8 rounded-2xl bg-gray-100 backdrop-blur-lg border border-gray-200"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                   >
//                     <div className="grid grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">First Name</label>
//                         <input
//                           type="text"
//                           required
//                           className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300"
//                           value={formData.firstName}
//                           onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300"
//                           value={formData.lastName}
//                           onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Email</label>
//                       <input
//                         type="email"
//                         required
//                         className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Message</label>
//                       <textarea
//                         required
//                         rows={4}
//                         className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300"
//                         value={formData.message}
//                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       />
//                     </div>

//                     <motion.button
//                       type="submit"
//                       className="group flex items-center justify-center w-full px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <div className="h-6 w-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Send Message
//                           <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                         </>
//                       )}
//                     </motion.button>
//                   </motion.form>
//                 )}

//                 {formStep === 2 && (
//                   <motion.div
//                     key="success"
//                     className="p-8 rounded-2xl bg-gray-100 backdrop-blur-lg border border-gray-200 text-center"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                   >
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
//                       className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
//                     >
//                       <Send className="w-8 h-8 text-green-500" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
//                     <p className="text-gray-600 mb-6">We'll get back to you as soon as possible.</p>
//                     <motion.button
//                       onClick={() => {
//                         setFormStep(0);
//                         setFormData({
//                           firstName: '',
//                           lastName: '',
//                           email: '',
//                           message: ''
//                         });
//                       }}
//                       className="text-sm text-gray-600 hover:text-black transition-colors duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Send another message
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Send, Map, Phone, Mail, ArrowRight } from 'lucide-react';
import Navbar from '../(components)/ui/Navbar';

const ContactPage = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (response.ok) {
        setFormStep(2); // Success state
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          className="pt-20 pb-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              className="text-7xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Let&apos;s Connect
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ready to transform your space? We&apos;re here to help with any questions about our cleaning services.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <motion.div
                  className="group flex items-start space-x-4"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    className="p-4 rounded-2xl bg-black group-hover:bg-gray-800 transition-colors duration-300"
                    href="https://www.google.com/maps/place/Helper+Buddy/@21.2435001,72.8479034,16.87z/data=!4m6!3m5!1s0xaf2e30a69314d2c9:0x801c0b6392faabac!8m2!3d21.243603!4d72.8507302!16s%2Fg%2F11wp17_k54?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D" // Direct link to Google Maps
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                  >
                    <Map className="w-6 h-6 text-white" />
                  </a>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                    <p className="text-gray-300">Amroli Cross Rd, near Santosh Electronics,</p>
                    <p className="text-gray-300">Bhagu Nagar-1, Amroli, Surat, Gujarat-394107</p>
                  </div>
                </motion.div>

                <motion.div
                  className="group flex items-start space-x-4"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 rounded-2xl bg-black group-hover:bg-gray-800 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">+ 91 6359398479</p>
                  </div>
                </motion.div>

                <motion.div
                  className="group flex items-start space-x-4"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 rounded-2xl bg-black group-hover:bg-gray-800 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">hello@helperbuddy.in</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="https://www.instagram.com/helperbuddy.in/reels/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {formStep === 0 && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8 rounded-2xl bg-black backdrop-blur-lg border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">First Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300 text-white"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300 text-white"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300 text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Message</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 transition-all duration-300 text-white"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="group flex items-center justify-center w-full px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="h-6 w-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="success"
                    className="p-8 rounded-2xl bg-black backdrop-blur-lg border border-gray-800 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <Send className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
                    <p className="text-gray-300 mb-6">We&apos;ll get back to you as soon as possible.</p>
                    <motion.button
                      onClick={() => {
                        setFormStep(0);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          message: ''
                        });
                      }}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;