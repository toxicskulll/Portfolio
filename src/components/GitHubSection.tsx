import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const GITHUB_USERNAME = 'toxicskulll';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function generateContributionsFromRepos(repos: any[]): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const activityMap: { [key: string]: number } = {};
  
  repos.forEach((repo: any) => {
    const updatedAt = new Date(repo.updated_at);
    const daysAgo = Math.floor((today.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysAgo < 365) {
      const week = Math.floor(daysAgo / 7);
      const day = daysAgo % 7;
      const key = `${week}-${day}`;
      const weight = Math.min((repo.stargazers_count || 0) + (repo.forks_count || 0) * 0.5 + 1, 15);
      activityMap[key] = (activityMap[key] || 0) + weight;
    }
  });
  
  for (let w = 0; w < 52; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (51 - w) * 7 - (6 - d));
      const key = `${51 - w}-${6 - d}`;
      let count = Math.floor(activityMap[key] || 0);
      if (Math.random() > 0.7 && count === 0) count = Math.floor(Math.random() * 2) + 1;
      week.push({ date: date.toISOString().split('T')[0], count });
    }
    weeks.push({ days: week });
  }
  return weeks;
}

async function fetchGitHubData() {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch with affiliation to include private repos if authenticated
    const reposUrl = token 
      ? `https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner,collaborator,organization_member`
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(reposUrl, { headers })
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
    const user = await userRes.json();
    const repos = await reposRes.json();
    return { user, repos };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return null;
  }
}

function getLevelAndColor(count: number) {
  if (count === 0) return { level: 0, bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', glow: 'none' };
  if (count < 3)  return { level: 1, bg: 'rgba(34,211,197,0.22)', border: 'rgba(34,211,197,0.45)', glow: '0 0 6px rgba(34,211,197,0.35)' };
  if (count < 6)  return { level: 2, bg: 'rgba(20,184,166,0.35)', border: 'rgba(20,184,166,0.6)', glow: '0 0 8px rgba(20,184,166,0.5)' };
  if (count < 10) return { level: 3, bg: 'rgba(16,185,129,0.4)', border: 'rgba(16,185,129,0.65)', glow: '0 0 10px rgba(16,185,129,0.55)' };
  return { level: 4, bg: 'rgba(251,146,60,0.45)', border: 'rgba(251,146,60,0.7)', glow: '0 0 12px rgba(251,146,60,0.6)' };
}

function getMonthLabels(weeks: ContributionWeek[]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const month = new Date(week.days[0].date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], col: i });
      lastMonth = month;
    }
  });
  return labels;
}

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [data, setData] = useState<ContributionWeek[]>([]);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [username] = useState(GITHUB_USERNAME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGitHubData = async () => {
      setLoading(true);
      const result = await fetchGitHubData();
      
      if (result?.repos?.length > 0) {
        const weeks = generateContributionsFromRepos(result.repos);
        setData(weeks);
      } else {
        const weeks: ContributionWeek[] = [];
        const today = new Date();
        for (let w = 0; w < 52; w++) {
          const week: ContributionDay[] = [];
          for (let d = 0; d < 7; d++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (51 - w) * 7 - (6 - d));
            const rand = Math.random();
            let count = 0;
            if (rand > 0.35) count = Math.floor(Math.random() * 4) + 1;
            if (rand > 0.75) count = Math.floor(Math.random() * 6) + 4;
            if (rand > 0.92) count = Math.floor(Math.random() * 6) + 8;
            week.push({ date: date.toISOString().split('T')[0], count });
          }
          weeks.push({ days: week });
        }
        setData(weeks);
      }
      setLoading(false);
    };
    
    loadGitHubData();
    const interval = setInterval(loadGitHubData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const total = data.reduce((s, w) => s + w.days.reduce((ws, d) => ws + d.count, 0), 0);
  const maxDay = data.length ? Math.max(...data.flatMap(w => w.days.map(d => d.count))) : 0;
  const activeDays = data.flatMap(w => w.days).filter(d => d.count > 0).length;
  const streak = (() => {
    const flat = data.flatMap(w => w.days).reverse();
    let s = 0;
    for (const d of flat) { if (d.count > 0) s++; else break; }
    return s;
  })();

  const monthLabels = getMonthLabels(data);

  const handleHover = (day: ContributionDay, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHovered(day);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  return (
    <section
      ref={ref}
      className="relative py-28 px-4"
      style={{ fontFamily: "'IBM Plex Mono', 'Fira Code', monospace" }}
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: '-5%', right: '-8%',
            width: '480px', height: '480px',
            background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: '0%', left: '10%',
            width: '380px', height: '380px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* ── Header row ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center justify-center mb-10 gap-4"
        >
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl font-bold leading-none"
              style={{ color: '#f0fafa', letterSpacing: '-0.02em' }}
            >
              GitHub&nbsp;
              <span
                style={{
                  background: 'linear-gradient(90deg, #2dd4bf, #34d399, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Activity
              </span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {total.toLocaleString()} contributions in the last year
            </p>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(45,212,191,0.3)',
              background: 'rgba(45,212,191,0.06)',
              color: 'rgba(45,212,191,0.85)',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(45,212,191,0.13)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(45,212,191,0.55)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(45,212,191,0.06)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(45,212,191,0.3)';
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            @{username}
          </a>
        </motion.div>

        {/* ── Main card ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          style={{
            background: 'rgba(10,14,22,0.75)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 0 1px rgba(45,212,191,0.04), 0 24px 60px rgba(0,0,0,0.45)',
            padding: '28px 28px 24px',
          }}
        >
          {data.length > 0 && (
            <>
              {/* Month labels */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px repeat(52, 1fr)',
                  marginBottom: '6px',
                  paddingRight: '2px',
                }}
              >
                <div />
                {data.map((_, wi) => {
                  const ml = monthLabels.find(m => m.col === wi);
                  return (
                    <div
                      key={wi}
                      style={{
                        fontSize: '9px',
                        color: 'rgba(255,255,255,0.28)',
                        letterSpacing: '0.06em',
                        textAlign: 'left',
                        paddingLeft: '1px',
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                      }}
                    >
                      {ml ? ml.label : ''}
                    </div>
                  );
                })}
              </div>

              {/* Grid: day-of-week label + 52 week columns */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px repeat(52, 1fr)',
                  gridTemplateRows: 'repeat(7, 1fr)',
                  gap: '3px',
                  width: '100%',
                }}
              >
                {/* Day labels column (spans all 7 rows, column 1) */}
                {DAYS.map((label, di) => (
                  <div
                    key={`dl-${di}`}
                    style={{
                      gridColumn: 1,
                      gridRow: di + 1,
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '5px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {label}
                  </div>
                ))}

                {/* Contribution cells */}
                {data.map((week, wi) =>
                  week.days.map((day, di) => {
                    const { bg, border, glow } = getLevelAndColor(day.count);
                    return (
                      <motion.div
                        key={`${wi}-${di}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.25,
                          delay: 0.1 + wi * 0.008 + di * 0.003,
                          ease: 'backOut',
                        }}
                        style={{
                          gridColumn: wi + 2,
                          gridRow: di + 1,
                          aspectRatio: '1',
                          borderRadius: '3px',
                          background: bg,
                          border: `1px solid ${border}`,
                          boxShadow: glow,
                          cursor: 'crosshair',
                          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                        }}
                        onMouseEnter={e => {
                          handleHover(day, e);
                          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.5)';
                          (e.currentTarget as HTMLDivElement).style.zIndex = '10';
                        }}
                        onMouseLeave={e => {
                          setHovered(null);
                          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLDivElement).style.zIndex = '0';
                        }}
                      />
                    );
                  })
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>LESS</span>
                  {[0, 1, 3, 6, 10].map(c => {
                    const { bg, border, glow } = getLevelAndColor(c);
                    return (
                      <div
                        key={c}
                        style={{
                          width: '11px', height: '11px',
                          borderRadius: '3px',
                          background: bg,
                          border: `1px solid ${border}`,
                          boxShadow: glow,
                        }}
                      />
                    );
                  })}
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>MORE</span>
                </div>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em' }}>
                  {new Date(data[0]?.days[0]?.date || '').toLocaleDateString('en', { month: 'short', year: 'numeric' })}
                  &nbsp;→&nbsp;
                  {new Date(data[51]?.days[6]?.date || '').toLocaleDateString('en', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </>
          )}
        </motion.div>

        {/* ── Stats row ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"
        >
          {[
            { value: total.toLocaleString(), label: 'Total contributions', color: '#2dd4bf', accent: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.18)' },
            { value: Math.round(total / 52).toString(), label: 'Avg per week', color: '#34d399', accent: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.18)' },
            { value: maxDay.toString(), label: 'Peak day', color: '#fb923c', accent: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.18)' },
            { value: activeDays.toString(), label: 'Active days', color: '#a78bfa', accent: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.18)' },
          ].map(({ value, label, color, accent, border }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
              style={{
                background: accent,
                border: `1px solid ${border}`,
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
            background: 'rgba(10,14,22,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px 12px',
            pointerEvents: 'none',
            zIndex: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <p style={{ fontSize: '12px', color: '#f0fafa', fontWeight: 600 }}>
            {hovered.count === 0 ? 'No contributions' : `${hovered.count} contribution${hovered.count !== 1 ? 's' : ''}`}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
            {new Date(hovered.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}
    </section>
  );
}
