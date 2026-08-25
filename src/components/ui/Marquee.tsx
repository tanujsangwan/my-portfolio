import React from 'react';

const Marquee: React.FC = () => {
  const text = "B.Tech CSE @ VIT-AP • CGPA 8.97 • Python • React • FastAPI • AI/ML • Open to Opportunities • LeetCode DSA • Building Cool Stuff • ";
  
  return (
    <div className="py-8 bg-indigo-50 border-y border-indigo-100 overflow-hidden relative w-full -rotate-1 origin-center scale-110 my-10">
      <div className="whitespace-nowrap flex animate-marquee w-[200%]">
        <span className="text-xl font-bold text-indigo-600 mx-4 w-1/2 flex-shrink-0">
          {text}
        </span>
        <span className="text-xl font-bold text-indigo-600 mx-4 w-1/2 flex-shrink-0">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
