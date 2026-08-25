import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import MiniTerminal from '../ui/MiniTerminal';

interface HeroProps {
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column: Profile Card */}
        <motion.div 
          className="lg:col-span-4 bg-white rounded-3xl p-8 shadow-[0_2px_24px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background element */}
          <div className="absolute top-0 w-full h-32 bg-indigo-50/50 -z-10"></div>
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-6 border-4 border-white">
            TS
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-1">TANUJ SANGWAN</h1>
          <p className="text-indigo-600 font-medium mb-6">B.Tech CSE Student & Developer</p>
          
          <div className="w-full space-y-3 mb-8">
            <div className="flex items-center justify-center text-slate-500 bg-slate-50 py-2 rounded-lg">
              <FaMapMarkerAlt className="mr-2 text-indigo-400" />
              <span className="text-sm">Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center justify-center text-slate-500 bg-slate-50 py-2 rounded-lg">
              <FaEnvelope className="mr-2 text-indigo-400" />
              <span className="text-sm">tanujsangwan1770@gmail.com</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 w-full mb-8">
            <a href="https://github.com/tanujsangwan" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/tanuj-sangwan-3801bb32a/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/TanujCode" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
              <FaCode size={18} />
            </a>
          </div>
          
          <div className="w-full flex flex-col space-y-3">
            <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-md shadow-indigo-200">
              Download Resume
            </button>
            <button onClick={onContactClick} className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div 
          className="lg:col-span-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 w-max">
            <span>🎓 Open to internships & opportunities</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Hi, I'm Tanuj <span className="inline-block animate-bounce">👋</span>
          </h2>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
            Motivated B.Tech Computer Science student with an 8.97 CGPA. I have a strong foundation in DSA, AI, ML, and web development. Skilled in Python, Java, SQL, React, and FastAPI. I love building clean, efficient, and user-friendly applications.
          </p>
          
          <div className="w-full max-w-2xl">
            <MiniTerminal />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
