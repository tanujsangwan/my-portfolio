import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-custom-yellow border-y-4 border-black py-3 overflow-hidden whitespace-nowrap relative rotate-[-2deg] scale-105 z-20 my-10">
      <div className="animate-marquee inline-block font-sans font-bold text-xl uppercase tracking-wide">
        <span className="mx-4">Currently a 4th-year B.Tech CSE student at VIT-AP with an 8.97 CGPA. • </span>
        <span className="mx-4">Strong foundation in Data Structures and Algorithms, AI, ML, and web development. • </span>
        <span className="mx-4">Skilled in Python, Java, SQL, React, REST APIs, and FastAPI. • </span>
        <span className="mx-4">Eager to build reliable, data-driven software solutions. • </span>
        <span className="mx-4">Open to Software Engineering opportunities. • </span>
        <span className="mx-4">📩 Contact: tanujsangwan1770@gmail.com</span>
      </div>

      <div className="animate-marquee inline-block font-sans font-bold text-xl uppercase tracking-wide absolute top-3 left-0" aria-hidden="true">
        <span className="mx-4">Currently a 4th-year B.Tech CSE student at VIT-AP with an 8.97 CGPA. • </span>
        <span className="mx-4">Strong foundation in Data Structures and Algorithms, AI, ML, and web development. • </span>
        <span className="mx-4">Skilled in Python, Java, SQL, React, REST APIs, and FastAPI. • </span>
        <span className="mx-4">Eager to build reliable, data-driven software solutions. • </span>
        <span className="mx-4">Open to Software Engineering opportunities. • </span>
        <span className="mx-4">📩 Contact: tanujsangwan1770@gmail.com</span>
      </div>
    </div>
  );
};

export default Marquee;
