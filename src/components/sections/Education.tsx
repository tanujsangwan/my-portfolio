import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    institution: "Vellore Institute of Technology - Andhra Pradesh (VIT-AP)",
    degree: "B.Tech CSE (Core)",
    score: "CGPA: 8.97",
    period: "Sep 2023 – Present",
    status: "active"
  },
  {
    institution: "Rao Pahlad Singh Sr. Sec. School",
    degree: "Class XII",
    score: "82.8%",
    period: "2022 – 2023",
    status: "completed"
  },
  {
    institution: "Rao Pahlad Singh Sr. Sec. School",
    degree: "Class X",
    score: "87.4%",
    period: "2020 – 2021",
    status: "completed"
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800">Education</h2>
          <div className="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-8">
          {educationData.map((item, index) => (
            <motion.div 
              key={index}
              className="mb-10 ml-8 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <span className={`absolute -left-[41px] top-1 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white ${item.status === 'active' ? 'bg-indigo-600 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]' : 'bg-indigo-300'}`}></span>
              
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{item.institution}</h3>
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2 md:mt-0 w-max">
                    {item.period}
                  </span>
                </div>
                <div className="text-lg text-slate-700 font-medium mb-2">{item.degree}</div>
                <div className="text-slate-500 font-medium bg-slate-50 inline-block px-2 py-1 rounded text-sm">
                  {item.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
