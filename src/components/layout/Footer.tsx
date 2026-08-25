import React from 'react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex space-x-6 mb-6">
          <a
            href="https://github.com/tanujsangwan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/tanuj-sangwan-3801bb32a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://leetcode.com/u/TanujCode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="LeetCode"
          >
            <FaCode size={24} />
          </a>
        </div>
        
        <p className="text-slate-500 font-medium mb-2 text-center">
          Built with ❤️ by Tanuj Sangwan
        </p>
        <p className="text-slate-400 text-sm">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
