import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800">Projects</h2>
          <div className="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Project */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-48 bg-indigo-50 flex items-center justify-center p-6">
               <div className="w-full h-full bg-white rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-300 font-medium text-lg">Portfolio Preview</span>
               </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">Interactive Personal Portfolio</h3>
              <p className="text-slate-600 text-sm mb-4 flex-grow">
                Responsive portfolio website built with React. Added Framer Motion animations and integrated LeetCode REST API for live stats.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'JavaScript', 'Framer Motion', 'REST APIs', 'CSS'].map(tech => (
                  <span key={tech} className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/tanujsangwan/portfolio" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <FaGithub /> Source
                </a>
                <button disabled className="flex items-center justify-center gap-2 flex-1 py-2 bg-indigo-600 text-white rounded-lg opacity-80 cursor-not-allowed text-sm font-medium">
                  <FaExternalLinkAlt /> Live
                </button>
              </div>
            </div>
          </motion.div>

          {/* Placeholder 1 */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-center items-center p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Coming Soon</div>
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-slate-300">🛠️</span>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">ML Model API</h3>
            <p className="text-slate-400 text-sm text-center">FastAPI backend serving a trained machine learning model with documentation.</p>
          </motion.div>

          {/* Placeholder 2 */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-center items-center p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">Coming Soon</div>
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-slate-300">📊</span>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">Data Dashboard</h3>
            <p className="text-slate-400 text-sm text-center">Interactive dashboard visualizing datasets using React and various charting libraries.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
