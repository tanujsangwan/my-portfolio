import { FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, tools, description, link, color, live }: any) => (
  <div className={`bg-white border-4 border-black rounded-3xl p-6 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden flex flex-col h-full`}>
    
    <div className={`absolute top-0 left-0 right-0 h-4 ${color} border-b-4 border-black`}></div>
    
    <div className="mt-4 flex justify-between items-start mb-4">
        <div>
            <h3 className="text-2xl font-shrikhand">{title}</h3>
            {live && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 border border-black rounded-md ml-1 animate-pulse">
                    LIVE PROJECT
                </span>
            )}
        </div>
        {link && (
            <a href={link} target="_blank" rel="noreferrer" className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <FaExternalLinkAlt />
            </a>
        )}
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
        {tools.map((t: string) => (
            <span key={t} className="bg-gray-100 border border-black px-2 py-1 text-xs font-bold font-mono rounded-md">
                {t}
            </span>
        ))}
    </div>

    <ul className="list-disc list-inside space-y-2 text-sm font-medium border-t-2 border-black pt-4 flex-grow">
        {description.map((point: string, i: number) => (
            <li key={i}>{point}</li>
        ))}
    </ul>
  </div>
);

const Projects = () => {
    const projects = [
      {
        title: "Interactive Portfolio",
        color: "bg-custom-bg", 
        tools: ["React", "JavaScript", "Framer Motion", "REST APIs", "CSS"],
        link: "https://github.com/tanujsangwan/portfolio", 
        live: true,
        description: [
          "Developed a responsive personal portfolio website using React and reusable component-based UI structure.",
          "Added Framer Motion animations to create a polished, engaging user experience across portfolio sections.",
          "Integrated a public REST API to display live LeetCode problem-solving statistics and linked GitHub profiles."
        ]
      },
      {
        title: "Coming Soon",
        color: "bg-custom-blue",
        tools: ["React", "Node.js", "MongoDB"],
        link: "", 
        live: false,
        description: [
          "A full-stack application currently under development.",
          "Will integrate AI and modern web technologies to solve real-world problems.",
          "Stay tuned for updates on GitHub!"
        ]
      },
      {
        title: "More Projects",
        color: "bg-custom-red",
        tools: ["Python", "FastAPI", "Machine Learning"],
        link: "", 
        live: false,
        description: [
          "Building and exploring machine learning models.",
          "Learning applied AI concepts and deploying them via APIs.",
          "Check my GitHub for upcoming repositories!"
        ]
      }
    ];

  return (
    <section id="projects" className="py-10 px-4 mx-auto max-w-7xl bg-custom-yellow border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo">
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
        <div className="bg-custom-green px-8 py-3 rounded-full border-4 border-black shadow-neo">
            <h2 className="text-3xl font-shrikhand text-white">PROJECTS</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
