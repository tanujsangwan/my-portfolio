import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "SQL", "HTML/CSS"]
  },
  {
    category: "Frameworks & APIs",
    items: ["React", "FastAPI", "REST APIs", "Framer Motion"]
  },
  {
    category: "AI/ML & Data",
    items: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]
  },
  {
    category: "Databases & Tools",
    items: ["MySQL", "Git", "GitHub", "VS Code", "Jupyter", "Google Colab"]
  },
  {
    category: "Core Concepts",
    items: ["DSA", "OOP", "DBMS"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800">Technical Skills</h2>
          <div className="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span 
                    key={item} 
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
