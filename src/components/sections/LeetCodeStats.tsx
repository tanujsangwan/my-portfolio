import { useEffect, useState } from 'react';

const LeetCodeStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Switch to a fast Vercel Leetcode API to avoid cold starts
    fetch('https://leetcode-api-faisalshohag.vercel.app/TanujCode')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalSolved !== undefined) {
          setStats(data);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
         <div className="text-center font-bold font-mono py-10 text-red-600 text-lg">
            Failed to load stats directly from LeetCode. Please try again later.
          </div>
      </section>
    );
  }

  if (!stats) {
    return (
      <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
         <div className="text-center font-bold font-mono py-10 animate-pulse text-lg">
            Fetching real-time LeetCode Profile...
          </div>
      </section>
    );
  }

  const percentage = stats.totalQuestions > 0 ? (stats.totalSolved / stats.totalQuestions) * 100 : 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Real Heatmap Processing
  const calendar = typeof stats.submissionCalendar === 'string' ? JSON.parse(stats.submissionCalendar) : stats.submissionCalendar;
  
  const getLocalYYYYMMDD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const activityMap: Record<string, number> = {};
  let totalSubmissions = 0;
  
  if (calendar) {
      Object.entries(calendar).forEach(([timestamp, count]: [string, any]) => {
          const date = new Date(parseInt(timestamp) * 1000);
          const dateString = getLocalYYYYMMDD(date);
          activityMap[dateString] = (activityMap[dateString] || 0) + count;
          totalSubmissions += count;
      });
  }

  const weeks = [];
  const today = new Date();
  let startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);
  // Roll back to the nearest Sunday to align the grid
  startDate.setDate(startDate.getDate() - startDate.getDay());

  let currentDay = new Date(startDate);
  while (currentDay <= today || currentDay.getDay() !== 0) {
      if (currentDay > today && currentDay.getDay() === 0) break;
      
      const week = [];
      for (let j = 0; j < 7; j++) {
          if (currentDay > today) {
              week.push(-1);
          } else {
              const dateString = getLocalYYYYMMDD(currentDay);
              const count = activityMap[dateString] || 0;
              let level = 0;
              if (count > 0) level = 1;
              if (count > 2) level = 2;
              if (count > 4) level = 3;
              if (count > 6) level = 4;
              week.push(level);
          }
          currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
  }

  return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
        <div className="bg-white text-black px-8 py-3 rounded-full border-4 border-black shadow-neo">
            <h2 className="text-3xl font-shrikhand">LEETCODE PROGRESS</h2>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border-4 border-black p-4 md:p-8 rounded-3xl shadow-neo max-w-5xl mx-auto text-white font-sans flex flex-col gap-6">

        <div className="flex flex-col md:flex-row gap-6">
            {/* Left Circle Area */}
            <div className="flex-1 bg-[#282828] p-6 rounded-2xl flex items-center justify-center gap-6 border-2 border-black shadow-neo-sm">
                <div className="relative flex items-center justify-center">
                    <svg width="120" height="120" className="transform -rotate-90">
                        <circle cx="60" cy="60" r={radius} stroke="#444" strokeWidth="6" fill="none" />
                        <circle
                            cx="60" cy="60" r={radius}
                            stroke="#FFA116" strokeWidth="6" fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-white flex items-baseline">
                            {stats.totalSolved} <span className="text-sm text-gray-500 ml-1">/{stats.totalQuestions}</span>
                        </div>
                        <span className="text-xs text-green-500 border-t border-gray-600 pt-1 mt-1 font-mono">✓ Solved</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                    <div className="bg-[#333] p-2 rounded-lg text-sm font-bold flex flex-col justify-center items-center border border-black shadow-sm">
                        <span className="text-[#00B8A3] mb-1">Easy</span>
                        <span className="text-white">{stats.easySolved}<span className="text-gray-500 text-xs">/{stats.totalEasy}</span></span>
                    </div>
                    <div className="bg-[#333] p-2 rounded-lg text-sm font-bold flex flex-col justify-center items-center border border-black shadow-sm">
                        <span className="text-[#FFC01E] mb-1">Med.</span>
                        <span className="text-white">{stats.mediumSolved}<span className="text-gray-500 text-xs">/{stats.totalMedium}</span></span>
                    </div>
                    <div className="bg-[#333] p-2 rounded-lg text-sm font-bold flex flex-col justify-center items-center border border-black shadow-sm">
                        <span className="text-[#EF4743] mb-1">Hard</span>
                        <span className="text-white">{stats.hardSolved}<span className="text-gray-500 text-xs">/{stats.totalHard}</span></span>
                    </div>
                </div>
            </div>

            {/* Right Badges Area */}
            <div className="flex-1 bg-[#282828] p-6 rounded-2xl border-2 border-black shadow-neo-sm flex flex-col items-start relative overflow-hidden">
                <div className="text-gray-400 font-sans text-sm mb-2">Badges</div>
                <div className="text-5xl font-bold mb-4">{stats.badges || 0}</div>
                <div className="mt-auto">
                    <div className="text-gray-500 text-xs">Locked Badge</div>
                    <div className="text-white font-bold text-lg">Aug LeetCoding Challenge</div>
                </div>
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-10">
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
            </div>
        </div>

        {/* Heatmap Area */}
        <div className="bg-[#282828] p-6 rounded-2xl border-2 border-black shadow-neo-sm overflow-hidden">
            <div className="text-sm font-bold mb-6 flex justify-between items-end border-b border-gray-700 pb-2">
                <span className="text-xl">{totalSubmissions} <span className="text-gray-400 text-sm font-normal">submissions in the past one year</span></span>
            </div>
            
            <div className="flex gap-1 overflow-x-auto pb-4 custom-scrollbar">
                {weeks.map((week, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        {week.map((level, j) => (
                            level === -1 ? (
                                <div key={j} className="w-3 h-3 rounded-sm bg-transparent"></div>
                            ) : (
                                <div 
                                    key={j} 
                                    className={`w-3 h-3 rounded-sm ${level === 0 ? 'bg-[#333]' : level === 1 ? 'bg-[#0E4429]' : level === 2 ? 'bg-[#006D32]' : level === 3 ? 'bg-[#26A641]' : 'bg-[#39D353]'}`}
                                ></div>
                            )
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-gray-500 text-xs mt-2 font-mono">
                <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
