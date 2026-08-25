import React, { useEffect, useState } from 'react';

const ProgressBar = ({ label, solved, total, color }: any) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between font-bold font-mono text-sm mb-1">
        <span>{label}</span>
        <span>{solved} / {total}</span>
      </div>
      <div className="w-full h-6 bg-white border-2 border-black rounded-full overflow-hidden">
        <div
          className={`h-full ${color} border-r-2 border-black`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const LeetCodeStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://leetcode-stats-api.herokuapp.com/TanujCode')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
        <div className="bg-white text-black px-8 py-3 rounded-full border-4 border-black shadow-neo">
            <h2 className="text-3xl font-shrikhand">LEETCODE PROGRESS</h2>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-6 md:p-10 rounded-3xl shadow-neo max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center font-bold font-mono py-10 animate-pulse text-lg">
            Fetching stats from LeetCode...
          </div>
        ) : stats && stats.status === 'success' ? (
          <div>
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-center">
              <div className="bg-custom-sky px-6 py-4 rounded-2xl border-4 border-black shadow-neo-sm hover:-translate-y-1 transition-transform flex-1 min-w-[140px]">
                <div className="text-4xl font-shrikhand mb-1">{stats.ranking}</div>
                <div className="font-bold font-mono text-xs uppercase">Global Rank</div>
              </div>
              <div className="bg-custom-green px-6 py-4 rounded-2xl border-4 border-black shadow-neo-sm hover:-translate-y-1 transition-transform flex-1 min-w-[140px]">
                <div className="text-4xl font-shrikhand mb-1">{stats.totalSolved}</div>
                <div className="font-bold font-mono text-xs uppercase">Total Solved</div>
              </div>
              <div className="bg-custom-yellow px-6 py-4 rounded-2xl border-4 border-black shadow-neo-sm hover:-translate-y-1 transition-transform flex-1 min-w-[140px]">
                <div className="text-4xl font-shrikhand mb-1">{stats.reputation}</div>
                <div className="font-bold font-mono text-xs uppercase">Reputation</div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl border-2 border-black">
              <ProgressBar label="Easy" solved={stats.easySolved} total={stats.totalEasy} color="bg-custom-green" />
              <ProgressBar label="Medium" solved={stats.mediumSolved} total={stats.totalMedium} color="bg-custom-yellow" />
              <ProgressBar label="Hard" solved={stats.hardSolved} total={stats.totalHard} color="bg-custom-red" />
            </div>
          </div>
        ) : (
          <div className="text-center font-bold font-mono text-custom-red py-10 text-lg">
            Failed to load stats. Check username!
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCodeStats;
