import { useEffect, useState, useRef } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LeetCodeStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState(false);
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://leetcode-api-faisalshohag.vercel.app/TanujCode')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalSolved !== undefined) {
          setStats(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
        <div className="text-center font-bold font-mono py-10 text-red-600 text-lg">
          Failed to load stats. Please try again later.
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

  // ── Heatmap: build a Sunday-aligned grid ────────────────────────────────
  const toKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const calendar =
    typeof stats.submissionCalendar === 'string'
      ? JSON.parse(stats.submissionCalendar)
      : stats.submissionCalendar || {};

  const activityMap: Record<string, number> = {};
  let totalSubmissions = 0;

  Object.entries(calendar).forEach(([ts, count]: [string, any]) => {
    const d = new Date(parseInt(ts) * 1000);
    const key = toKey(d);
    activityMap[key] = (activityMap[key] || 0) + (count as number);
    totalSubmissions += count as number;
  });

  const today = new Date();
  const start = new Date(today);
  start.setFullYear(today.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay()); // snap to Sunday

  // Build 53 weeks max
  interface WeekCell { level: number; month: number; date: Date; future: boolean }
  const weeks: WeekCell[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  const cur = new Date(start);
  let lastMonth = -1;

  for (let w = 0; w < 54; w++) {
    if (cur > today && cur.getDay() === 0) break;
    const week: WeekCell[] = [];
    for (let d = 0; d < 7; d++) {
      const isFuture = cur > today;
      const key = toKey(cur);
      const count = activityMap[key] || 0;
      let level = 0;
      if (!isFuture && count > 0)  level = 1;
      if (!isFuture && count > 3)  level = 2;
      if (!isFuture && count > 6)  level = 3;
      if (!isFuture && count > 10) level = 4;
      week.push({ level, month: cur.getMonth(), date: new Date(cur), future: isFuture });
      cur.setDate(cur.getDate() + 1);
    }
    const firstDay = week[0].date;
    if (firstDay.getMonth() !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[firstDay.getMonth()], col: w });
      lastMonth = firstDay.getMonth();
    }
    weeks.push(week);
  }

  // SVG dimensions - bigger cells with clear gaps
  const CELL = 13;  // cell size px
  const GAP  = 3;   // gap between cells px
  const STEP = CELL + GAP;
  const LABEL_TOP = 16;   // height reserved for month labels
  const LABEL_LEFT = 28;  // width reserved for day-of-week labels

  const svgW = weeks.length * STEP + LABEL_LEFT;
  const svgH = 7 * STEP + LABEL_TOP;

  const COLORS = ['#2D2D2D', '#0E4429', '#006D32', '#26A641', '#39D353'];
  const DAY_LABELS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

  return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
        <div className="bg-white text-black px-8 py-3 rounded-full border-4 border-black shadow-neo">
          <h2 className="text-3xl font-shrikhand">LEETCODE PROGRESS</h2>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border-4 border-black p-4 md:p-6 rounded-3xl shadow-neo max-w-5xl mx-auto text-white font-sans flex flex-col gap-5">

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* Circle + Easy/Med/Hard */}
          <div className="flex-1 bg-[#282828] p-5 rounded-2xl flex items-center justify-center gap-5 border-2 border-[#444]">
            <div className="relative flex-shrink-0">
              <svg width="120" height="120" className="-rotate-90">
                <circle cx="60" cy="60" r={radius} stroke="#444" strokeWidth="7" fill="none" />
                <circle cx="60" cy="60" r={radius} stroke="#FFA116" strokeWidth="7" fill="none"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold leading-none">{stats.totalSolved}</div>
                <div className="text-[11px] text-gray-500">/{stats.totalQuestions}</div>
                <div className="text-[10px] text-green-500 mt-1">✓ Solved</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {[
                { label: 'Easy', color: '#00B8A3', solved: stats.easySolved, total: stats.totalEasy },
                { label: 'Med.',  color: '#FFC01E', solved: stats.mediumSolved, total: stats.totalMedium },
                { label: 'Hard', color: '#EF4743', solved: stats.hardSolved,  total: stats.totalHard },
              ].map(({ label, color, solved, total }) => (
                <div key={label} className="bg-[#333] rounded-lg py-1.5 px-3 border border-[#555]">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span style={{ color }} className="font-bold">{label}</span>
                    <span className="text-white font-bold">{solved}<span className="text-gray-500">/{total}</span></span>
                  </div>
                  <div className="w-full bg-[#444] rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: color, width: `${(solved / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges — badge count is hardcoded to 1 since API doesn't expose it */}
          <div className="flex-1 bg-[#282828] p-5 rounded-2xl border-2 border-[#444] flex flex-col relative overflow-hidden">
            <div className="text-gray-400 text-sm mb-1">Badges</div>
            <div className="text-5xl font-bold">1</div>
            <div className="mt-auto">
              <div className="text-gray-500 text-xs mb-1">Recent Badge</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-300 flex items-center justify-center text-xs font-bold text-black">🏅</div>
                <div className="text-white font-bold text-sm">Aug LeetCoding Challenge</div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-[0.07]">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-[#282828] p-5 rounded-2xl border-2 border-[#444]">
          <div className="flex items-center justify-between mb-4 border-b border-[#444] pb-3 flex-wrap gap-2">
            <span className="font-bold text-lg whitespace-nowrap">
              {totalSubmissions} <span className="text-gray-400 text-sm font-normal">submissions in the past one year</span>
            </span>
          </div>

          {/* SVG Heatmap with proper gaps and month labels */}
          <div ref={heatmapRef} className="overflow-x-auto pb-2">
            <svg width={svgW} height={svgH} style={{ display: 'block', minWidth: svgW }}>

              {/* Month labels */}
              {monthLabels.map(({ label, col }, i) => (
                <text
                  key={i}
                  x={col * STEP + LABEL_LEFT}
                  y={LABEL_TOP - 4}
                  fontSize={10}
                  fill="#8B8B8B"
                  fontFamily="monospace"
                >
                  {label}
                </text>
              ))}

              {/* Day-of-week labels */}
              {DAY_LABELS.map((label, row) =>
                label ? (
                  <text
                    key={row}
                    x={2}
                    y={LABEL_TOP + row * STEP + CELL - 1}
                    fontSize={9}
                    fill="#8B8B8B"
                    fontFamily="monospace"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {/* Cells */}
              {weeks.map((week, col) =>
                week.map((cell, row) => (
                  <rect
                    key={`${col}-${row}`}
                    x={col * STEP + LABEL_LEFT}
                    y={LABEL_TOP + row * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    ry={2}
                    fill={cell.future ? 'transparent' : COLORS[cell.level]}
                  >
                    <title>{toKey(cell.date)}: {cell.future ? '' : `${activityMap[toKey(cell.date)] || 0} submissions`}</title>
                  </rect>
                ))
              )}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 justify-end mt-1">
            <span className="text-[10px] text-gray-500 mr-1">Less</span>
            {COLORS.map((c, i) => (
              <rect key={i} style={{ display: 'inline-block', backgroundColor: c, width: 13, height: 13, borderRadius: 2 }} />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">More</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
