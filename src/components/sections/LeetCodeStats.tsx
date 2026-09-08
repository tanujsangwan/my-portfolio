import { useEffect, useState, useRef } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VERCEL_API = 'https://leetcode-api-faisalshohag.vercel.app';
const ALFA_API   = 'https://alfa-leetcode-api.onrender.com';

const LeetCodeStats = () => {
  const [stats,   setStats]   = useState<any>(null);
  const [badges,  setBadges]  = useState<any>(null);
  const [calData, setCalData] = useState<any>(null);
  const [error,   setError]   = useState(false);
  const heatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ① Fast Vercel API for stats — loads in ~1-2s
    fetch(`${VERCEL_API}/TanujCode`)
      .then(r => r.json())
      .then(d => {
        if (d?.totalSolved !== undefined) setStats(d);
        else setError(true);
      })
      .catch(() => setError(true));

    // ② Alfa API for badges — loads independently (may take 30-60s on cold start)
    fetch(`${ALFA_API}/TanujCode/badges`)
      .then(r => r.json())
      .then(d => setBadges(d))
      .catch(() => {}); // fail silently, badge panel stays loading

    // ③ Alfa API for calendar — loads independently
    fetch(`${ALFA_API}/TanujCode/calendar`)
      .then(r => r.json())
      .then(d => setCalData(d))
      .catch(() => {}); // fail silently, heatmap still works from vercel calendar
  }, []);

  if (error) return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="text-center font-bold font-mono py-10 text-red-600 text-lg">
        Failed to load LeetCode stats. Please try again later.
      </div>
    </section>
  );

  if (!stats) return (
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

  // ── Heatmap: prefer alfa calendar (has streak/active), fallback to vercel ──
  const rawCalSrc = calData?.submissionCalendar ?? stats.submissionCalendar;
  const rawCal: Record<string, number> =
    typeof rawCalSrc === 'string' ? JSON.parse(rawCalSrc) : rawCalSrc || {};

  const toKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const activity: Record<string, number> = {};
  let totalSubs = 0;
  Object.entries(rawCal).forEach(([ts, cnt]: [string, any]) => {
    const d = new Date(parseInt(ts) * 1000);
    const k = toKey(d);
    activity[k] = (activity[k] || 0) + (cnt as number);
    totalSubs += cnt as number;
  });

  // Build 53-week grid (Sunday-aligned)
  const today = new Date();
  const gridStart = new Date(today);
  gridStart.setDate(today.getDate() - 364 - today.getDay());

  interface Cell { key: string; level: number; future: boolean; count: number }
  const weeks: Cell[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  const cur = new Date(gridStart);

  for (let w = 0; w < 54; w++) {
    if (cur > today && w > 1) break;
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

  const CELL   = 10;
  const GAP    = 2;
  const STEP   = CELL + GAP;
  const COLORS = ['#2D2D2D', '#0E4429', '#006D32', '#26A641', '#39D353'];

  // ── Badge info (may still be loading) ────────────────────────────────────
  const badgeCount  = badges?.badgesCount ?? null;
  const activeBadge = badges?.activeBadge;
  const upcoming    = badges?.upcomingBadges ?? [];

  return (
    <section id="leetcode" className="py-10 px-4 mx-auto max-w-7xl bg-custom-orange border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo my-10">
      <div className="flex items-center justify-center lg:justify-start mb-8">
        <div className="bg-white text-black px-8 py-3 rounded-full border-4 border-black shadow-neo">
          <h2 className="text-3xl font-shrikhand">LEETCODE PROGRESS</h2>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border-4 border-black p-4 md:p-6 rounded-3xl shadow-neo max-w-5xl mx-auto text-white font-sans flex flex-col gap-5">

        {/* ── Top Row ── */}
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

          {/* Badge panel — shows spinner while alfa loads */}
          <div className="flex-1 bg-[#282828] p-5 rounded-2xl border border-[#444] flex flex-col gap-3">
            <div>
              <div className="text-gray-400 text-sm">Badges</div>
              {badgeCount === null ? (
                <div className="text-gray-500 text-sm animate-pulse mt-2">Loading…</div>
              ) : (
                <div className="text-5xl font-bold mt-1">{badgeCount}</div>
              )}
            </div>

            {activeBadge ? (
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={activeBadge.icon.startsWith('http') ? activeBadge.icon : `https://leetcode.com${activeBadge.icon}`}
                  alt={activeBadge.displayName}
                  className="w-14 h-14 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-wide">Active Badge</div>
                  <div className="text-white font-bold text-sm leading-snug">{activeBadge.displayName}</div>
                  <div className="text-gray-400 text-[10px]">{activeBadge.creationDate}</div>
                </div>
              </div>
            ) : badgeCount !== null && badgeCount === 0 ? (
              <div className="text-gray-500 text-sm mt-auto">No active badge yet</div>
            ) : badgeCount !== null ? (
              <div className="text-gray-500 text-sm mt-auto animate-pulse">Loading badge…</div>
            ) : null}

            {upcoming.length > 0 && (
              <div className="border-t border-[#444] pt-2">
                <div className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">Upcoming</div>
                <div className="flex gap-1 flex-wrap">
                  {upcoming.slice(0, 3).map((b: any, i: number) => (
                    <div key={i} className="text-[10px] bg-[#3A3A3A] px-2 py-0.5 rounded text-gray-300 border border-[#555]">
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
              {totalSubs}{' '}
              <span className="text-gray-400 font-normal text-sm">submissions in the past one year</span>
            </span>
            <span className="text-gray-400 text-xs">
              {calData ? (
                <>
                  Total active days: <strong className="text-white">{calData.totalActiveDays}</strong>
                  &nbsp;&nbsp;Max streak: <strong className="text-white">{calData.streak}</strong>
                </>
              ) : (
                <span className="animate-pulse">Loading streak…</span>
              )}
            </span>
          </div>

          <div ref={heatRef} className="overflow-x-auto pb-1">
            <svg width={weeks.length * STEP} height={7 * STEP + 18} style={{ display: 'block' }}>
              {/* Cells */}
              {weeks.map((week, col) =>
                week.map((cell, row) => (
                  <rect key={`${col}-${row}`}
                    x={col * STEP} y={row * STEP}
                    width={CELL} height={CELL} rx={2} ry={2}
                    fill={cell.future ? 'transparent' : COLORS[cell.level]}>
                    <title>{cell.key}: {cell.count} submissions</title>
                  </rect>
                ))
              )}
              {/* Month labels at BOTTOM */}
              {monthLabels.map(({ label, col }, i) => (
                <text key={i} x={col * STEP} y={7 * STEP + 14}
                  fontSize={10} fill="#6B7280" fontFamily="monospace">{label}</text>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 justify-end mt-2">
            <span className="text-[10px] text-gray-500 mr-1">Less</span>
            {COLORS.map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2, flexShrink: 0 }} />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">More</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
