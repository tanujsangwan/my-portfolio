import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Marquee from './components/ui/Marquee';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import ContactModal from './components/ui/ContactModal';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-indigo-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      
      <main>
        <Hero onContactClick={() => setIsContactModalOpen(true)} />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Marquee />
      </main>

      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default App;
