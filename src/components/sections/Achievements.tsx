import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate } from 'react-icons/fa';

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800">Achievements & Certifications</h2>
          <div className="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Achievements Card */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-slate-100"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mr-4">
                <FaTrophy size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Achievements</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">🏆</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Academic Excellence</h4>
                  <p className="text-slate-600 text-sm">Maintained an outstanding 8.97 CGPA at VIT-AP</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">⚔️</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Problem Solving</h4>
                  <p className="text-slate-600 text-sm">Active LeetCode problem solver focusing on Data Structures and Algorithms</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Certifications Card */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-slate-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mr-4">
                <FaCertificate size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Certifications</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">🛡️</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Ethical Hacking Certificate</h4>
                  <p className="text-slate-600 text-sm">Demonstrated knowledge in network security and vulnerability assessment</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">☕</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Oracle Java Professional Certificate</h4>
                  <p className="text-slate-600 text-sm">Certified proficiency in Java programming and Object-Oriented principles</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
