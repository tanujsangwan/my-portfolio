import { useEffect, useState, useRef } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const BASE = 'https://alfa-leetcode-api.onrender.com';

const LeetCodeStats = () => {
  const [stats,    setStats]    = useState<any>(null);
  const [badges,   setBadges]   = useState<any>(null);
  const [calData,  setCalData]  = useState<any>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const heatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/userProfile/TanujCode`).then(r => r.json()),
      fetch(`${BASE}/TanujCode/badges`).then(r => r.json()),
      fetch(`${BASE}/TanujCode/calendar`).then(r => r.json()),
    ])
      .then(([profile, badgeData, calendar]) => {
        if (!profile || profile.totalSolved === undefined) { setError(true); return; }
        setStats(profile);
        setBadges(badgeData);
        setCalData(calendar);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="text-center font-bold font-mono py-10 text-red-600 text-lg">
        Failed to load LeetCode stats. Please try again later.
      </div>
    </section>
  );

  if (loading) return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="text-center font-bold font-mono py-10 animate-pulse text-lg">
        Fetching real-time LeetCode profile…
      </div>
    </section>
  );

  // ── Circle ring ──────────────────────────────────────────────────────────
  const radius = 50;
  const circ   = 2 * Math.PI * radius;
  const pct    = stats.totalSolved / stats.totalQuestions;
  const offset = circ - pct * circ;

  // ── Heatmap ──────────────────────────────────────────────────────────────
  const toKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const rawCal: Record<string, number> =
    typeof calData?.submissionCalendar === 'string'
      ? JSON.parse(calData.submissionCalendar)
      : calData?.submissionCalendar || {};

  // Convert UNIX timestamps → YYYY-MM-DD map
  const activity: Record<string, number> = {};
  let totalSubs = 0;
  Object.entries(rawCal).forEach(([ts, cnt]: [string, any]) => {
    const d = new Date(parseInt(ts) * 1000);
    const k = toKey(d);
    activity[k] = (activity[k] || 0) + (cnt as number);
    totalSubs += cnt as number;
  });

  // Build 53-week grid starting from the Sunday 52 weeks ago
  const today = new Date();
  const gridStart = new Date(today);
  gridStart.setDate(today.getDate() - 364 - today.getDay()); // previous Sunday ≥ 52 wks ago

  interface Cell { key: string; level: number; future: boolean; count: number }
  const weeks: Cell[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  const cur = new Date(gridStart);

  for (let w = 0; w < 53; w++) {
    if (cur > today && w > 0) break;
    const week: Cell[] = [];
    const firstDay = new Date(cur);
    for (let d = 0; d < 7; d++) {
      const isFuture = cur > today;
      const k = toKey(cur);
      const count = activity[k] || 0;
      let level = 0;
      if (!isFuture && count > 0)  level = 1;
      if (!isFuture && count > 3)  level = 2;
      if (!isFuture && count > 6)  level = 3;
      if (!isFuture && count > 10) level = 4;
      week.push({ key: k, level, future: isFuture, count });
      cur.setDate(cur.getDate() + 1);
    }
    if (firstDay.getMonth() !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[firstDay.getMonth()], col: w });
      lastMonth = firstDay.getMonth();
    }
    weeks.push(week);
  }

  const CELL  = 13;
  const GAP   = 3;
  const STEP  = CELL + GAP;
  const PAD_L = 26;  // day-label width
  const PAD_T = 18;  // month-label height
  const svgW  = weeks.length * STEP + PAD_L;
  const svgH  = 7 * STEP + PAD_T;

  const COLORS = ['#2D2D2D', '#0E4429', '#006D32', '#26A641', '#39D353'];
  const DAY_LABELS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

  // ── Badge info ────────────────────────────────────────────────────────────
  const badgeCount   = badges?.badgesCount ?? 0;
  const activeBadge  = badges?.activeBadge;
  const upcomingList = badges?.upcomingBadges ?? [];

  return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="flex items-center justify-center lg:justify-start mb-8">
        <div className="bg-white text-black px-8 py-3 rounded-full border-4 border-black shadow-neo">
          <h2 className="text-3xl font-shrikhand">LEETCODE PROGRESS</h2>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border-4 border-black p-4 md:p-6 rounded-3xl shadow-neo max-w-5xl mx-auto text-white font-sans flex flex-col gap-5">

        {/* ── Top Row: Stats + Badges ── */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* Donut + difficulty bars */}
          <div className="flex-1 bg-[#282828] p-5 rounded-2xl flex items-center gap-5 border border-[#444]">
            <div className="relative flex-shrink-0">
              <svg width="120" height="120" className="-rotate-90">
                <circle cx="60" cy="60" r={radius} stroke="#3E3E3E" strokeWidth="7" fill="none" />
                <circle cx="60" cy="60" r={radius} stroke="#FFA116" strokeWidth="7" fill="none"
                  strokeDasharray={circ} strokeDashoffset={offset}
                  strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{stats.totalSolved}</span>
                <span className="text-[11px] text-gray-500">/{stats.totalQuestions}</span>
                <span className="text-[10px] text-green-500 mt-1">✓ Solved</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {[
                { label: 'Easy', color: '#00B8A3', solved: stats.easySolved,   total: stats.totalEasy   },
                { label: 'Med.',  color: '#FFC01E', solved: stats.mediumSolved, total: stats.totalMedium },
                { label: 'Hard', color: '#EF4743', solved: stats.hardSolved,   total: stats.totalHard   },
              ].map(({ label, color, solved, total }) => (
                <div key={label} className="bg-[#3A3A3A] rounded-lg py-1.5 px-3 border border-[#555]">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color }} className="font-bold">{label}</span>
                    <span className="font-bold">{solved}<span className="text-gray-500">/{total}</span></span>
                  </div>
                  <div className="w-full bg-[#555] rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all duration-700"
                      style={{ backgroundColor: color, width: `${(solved / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real badge panel */}
          <div className="flex-1 bg-[#282828] p-5 rounded-2xl border border-[#444] flex flex-col gap-3">
            <div>
              <div className="text-gray-400 text-sm">Badges</div>
              <div className="text-5xl font-bold mt-1">{badgeCount}</div>
            </div>

            {activeBadge && (
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={activeBadge.icon.startsWith('http') ? activeBadge.icon : `https://leetcode.com${activeBadge.icon}`}
                  alt={activeBadge.displayName}
                  className="w-12 h-12 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-wide">Active Badge</div>
                  <div className="text-white font-bold text-sm leading-snug">{activeBadge.displayName}</div>
                  <div className="text-gray-500 text-[10px]">{activeBadge.creationDate}</div>
                </div>
              </div>
            )}

            {upcomingList.length > 0 && (
              <div className="border-t border-[#444] pt-2">
                <div className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Upcoming</div>
                <div className="flex gap-2 flex-wrap">
                  {upcomingList.slice(0, 3).map((b: any, i: number) => (
                    <div key={i} className="text-[10px] bg-[#3A3A3A] px-2 py-1 rounded text-gray-300 border border-[#555]">
                      {b.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div className="bg-[#282828] p-5 rounded-2xl border border-[#444]">
          <div className="flex flex-wrap items-center justify-between mb-4 border-b border-[#444] pb-3 gap-2">
            <span className="font-bold text-base">
              {totalSubs} <span className="text-gray-400 font-normal text-sm">submissions in the past one year</span>
            </span>
            <span className="text-gray-400 text-xs">
              Active days: <strong className="text-white">{calData?.totalActiveDays ?? '—'}</strong>
              &nbsp;&nbsp;Max streak: <strong className="text-white">{calData?.streak ?? '—'}</strong>
            </span>
          </div>

          <div ref={heatRef} className="overflow-x-auto pb-1">
            <svg width={svgW} height={svgH} style={{ display: 'block' }}>

              {/* Month labels */}
              {monthLabels.map(({ label, col }, i) => (
                <text key={i} x={col * STEP + PAD_L} y={PAD_T - 5}
                  fontSize={10} fill="#6B7280" fontFamily="monospace">{label}</text>
              ))}

              {/* Day-of-week labels */}
              {DAY_LABELS.map((lbl, row) => lbl ? (
                <text key={row} x={0} y={PAD_T + row * STEP + CELL}
                  fontSize={9} fill="#6B7280" fontFamily="monospace">{lbl}</text>
              ) : null)}

              {/* Cells */}
              {weeks.map((week, col) =>
                week.map((cell, row) => (
                  <rect key={`${col}-${row}`}
                    x={col * STEP + PAD_L}
                    y={PAD_T + row * STEP}
                    width={CELL} height={CELL} rx={2} ry={2}
                    fill={cell.future ? 'transparent' : COLORS[cell.level]}>
                    <title>{cell.key}: {cell.count} submissions</title>
                  </rect>
                ))
              )}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 justify-end mt-2">
            <span className="text-[10px] text-gray-500 mr-1">Less</span>
            {COLORS.map((c, i) => (
              <div key={i} style={{ width: CELL, height: CELL, backgroundColor: c, borderRadius: 2, flexShrink: 0 }} />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">More</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
