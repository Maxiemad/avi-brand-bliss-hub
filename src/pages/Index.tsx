
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Hero from '../components/Hero';
import CardCarousel from '../components/CardCarousel';
import WhoIHelp from '../components/WhoIHelp';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import Comparison from '../components/Comparison';
import Results from '../components/Results';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    // Disable scroll initially
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#0e1016] text-[#e4ded7] overflow-x-hidden relative">
      {/* Fixed Navigation - Contact Form Link */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/contact"
          className="bg-[#e4ded7]/10 backdrop-blur-sm border border-[#e4ded7]/20 text-[#e4ded7] px-6 py-3 rounded-full hover:bg-[#e4ded7]/20 transition-all duration-300 font-medium"
          data-cursor
        >
          Get In Touch
        </Link>
      </div>

      {/* Simplified Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 600px 600px'
        }}
      />
      
      <div className="relative z-10">
        <CustomCursor />
        
        <AnimatePresence>
          {!preloaderComplete && (
            <Preloader onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        {preloaderComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-20"
          >
            <Hero />
            <CardCarousel />
            <WhoIHelp />
            <About />
            <Services />
            <Process />
            <Comparison />
            <Results />
            <Testimonials />
            <Contact />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
