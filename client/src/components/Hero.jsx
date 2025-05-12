import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninContext } from './SigninContext';
import axios from 'axios';
import { motion, stagger } from 'framer-motion';

function Hero() {
  const testimonials = [
    { name: 'Emily Clark', text: 'I absolutely love my new dress! The fit is perfect, and the fabric feels amazing. Highly recommend!' },
    { name: 'Sarah Johnson', text: 'This was my first purchase, and Im so impressed with the quality and design  ll definitely be back for more!' },
    { name: 'Olivia Williams', text: 'The dress I bought was even more beautiful in person! Shipping was fast, and I couldncldcleart be happier with my purchase.' },
    { name: 'Michael Chen', text: 'Exceptional quality and minimalist design. Exactly what I was looking for in modern fashion.' },
  ];
  
  const { signIn } = useContext(SigninContext);
  const navigate = useNavigate();

  const [st, setSt] = useState([]);

  useEffect(() => {
    const handleRes = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/products?offset=1&limit=8');
        setSt(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    handleRes();
  }, []);

  const handleGetStarted = () => {
    if (signIn) {
      navigate('/products');
    } else {
      navigate('/signin');
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300';
  };

  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center overflow-hidden">

      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-16">
        {/* Header Chip */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 text-sm font-medium border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
            New Collections Unveiled
          </span>
        </div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Minimal Design, 
          <br />
          Maximum Impact
        </motion.h1>

        {/* Subheadline */}
        <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-10">
          Crafting timeless pieces that transcend trends. Our collection embodies simplicity, quality, and understated elegance.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 text-sm font-semibold border border-white/30 rounded-full 
                       bg-white/5 backdrop-blur-md hover:bg-white/10 
                       transition-all duration-300 ease-in-out"
          >
            Explore Collection
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {st.map((product, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden border border-white/10 rounded-lg"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                onError={handleImageError}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center">
                <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10">What Our Patrons Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-md"
              >
                <p className="text-white/80 italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-white/60">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center">
          <div className="flex justify-center space-x-6 mb-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-white/40">© 2025 Minimal Design Studio</p>
        </footer>
      </div>
    </div>
  );
}

export default Hero;