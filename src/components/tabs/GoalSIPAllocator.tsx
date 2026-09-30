import { useState, useCallback } from 'react';
import { Lock, Target, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import confetti from 'canvas-confetti';
import { useApp } from '@/contexts/AppContext';
import { T } from '@/i18n/translations';
import { formatINR, formatLakh } from '@/utils/formatters';
import { calculateSIP } from '@/utils/calculations';

const RISK_PROFILES = [
  { id: 'conservative', labelKey: 'conservative' as const, rate: 10 },
  { id: 'moderate',     labelKey: 'moderate'     as const, rate: 13 },
  { id: 'aggressive',   labelKey: 'aggressive'   as const, rate: 16 },
];

const ALLOCATION_MAP: Record<string, { equity: number; debt: number; gold: number }> = {
  conservative: { equity: 40, debt: 50, gold: 10 },
  moderate:     { equity: 60, debt: 30, gold: 10 },
  aggressive:   { equity: 80, debt: 15, gold: 5  },
};

function RangeSlider({ min, max, value, onChange, step = 1, isDark }: {
  min: number; max: number; value: number; onChange: (v: number) => void; step?: number; isDark: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative">
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00D09C ${pct}%, ${isDark ? '#1F2937' : '#E5E7EB'} ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function GoalSIPAllocator() {
  const { language, isDark } = useApp();
  const t = T[language];

  const [target, setTarget] = useState(5000000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [risk, setRisk] = useState('moderate');
  const [locked, setLocked] = useState(false);

  const selectedRisk = RISK_PROFILES.find(r => r.id === risk)!;
  const { adjustedTarget, monthlySIP } = calculateSIP(target, years, selectedRisk.rate, inflation);
  const alloc = ALLOCATION_MAP[risk];

  const pieData = [
    { name: t.equity, value: alloc.equity, color: '#00D09C' },
    { name: t.debt,   value: alloc.debt,   color: '#06B6D4' },
    { name: t.gold,   value: alloc.gold,   color: '#F59E0B' },
  ];

  const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const innerBg = isDark ? 'bg-[#0B0F17]' : 'bg-gray-50';

  const handleLock = useCallback(() => {
    setLocked(true);
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00D09C', '#06B6D4', '#F59E0B', '#ffffff'],
    });
    setTimeout(() => setLocked(false), 4000);
  }, []);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className={`${cardBg} border ${border} rounded-2xl p-6 space-y-6`}>
          <h3 className={`text-sm font-bold ${text}`}>Configure Your Goal</h3>

          {/* Target Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className={`text-xs font-semibold ${subtext}`}>{t.targetAmount}</label>
              <span className="text-sm font-bold text-accent font-mono">{formatLakh(target)}</span>
            </div>
            <RangeSlider min={100000} max={20000000} step={100000} value={target} onChange={setTarget} isDark={isDark} />
            <div className={`flex justify-between text-[10px] ${subtext} mt-1`}>
              <span>₹1 Lakh</span><span>₹2 Crore</span>
            </div>
          </div>

          {/* Time Horizon */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className={`text-xs font-semibold ${subtext}`}>{t.timeHorizon}</label>
              <span className="text-sm font-bold text-accent font-mono">{years} {t.years}</span>
            </div>
            <RangeSlider min={1} max={30} value={years} onChange={setYears} isDark={isDark} />
            <div className={`flex justify-between text-[10px] ${subtext} mt-1`}>
              <span>1 yr</span><span>30 yrs</span>
            </div>
          </div>

          {/* Inflation */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className={`text-xs font-semibold ${subtext}`}>{t.inflation}</label>
              <span className="text-sm font-bold text-warn font-mono">{inflation}%</span>
            </div>
            <RangeSlider min={4} max={9} value={inflation} onChange={setInflation} isDark={isDark} />
            <div className={`flex justify-between text-[10px] ${subtext} mt-1`}>
              <span>4%</span><span>9%</span>
            </div>
          </div>

          {/* Risk Profile */}
          <div>
            <label className={`text-xs font-semibold ${subtext} block mb-2`}>{t.riskProfile}</label>
            <div className="flex gap-2">
              {RISK_PROFILES.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRisk(r.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all
                    ${risk === r.id
                      ? 'bg-accent/10 border-accent text-accent'
                      : `${border} ${subtext} ${isDark ? 'hover:border-gray-600' : 'hover:border-gray-400'}`
                    }`}
                >
                  {r.rate}%
                  <div className="text-[10px] opacity-70 mt-0.5">
                    {r.id === 'conservative' ? 'Safe' : r.id === 'moderate' ? 'Balanced' : 'Bold'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output + Donut */}
        <div className="flex flex-col gap-4">
          {/* Result Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${cardBg} border ${border} rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-warn" />
                <span className={`text-xs font-semibold ${subtext}`}>{t.adjustedTarget}</span>
              </div>
              <div className={`text-2xl font-bold ${text} font-mono`}>{formatLakh(adjustedTarget)}</div>
              <div className={`text-xs ${subtext} mt-1`}>at {inflation}% inflation, {years} yrs</div>
            </div>
            <div className={`${cardBg} border border-accent/40 rounded-2xl p-5 bg-accent/5`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className={`text-xs font-semibold ${subtext}`}>{t.monthlySIP}</span>
              </div>
              <div className="text-2xl font-bold text-accent font-mono">{formatINR(monthlySIP)}</div>
              <div className={`text-xs ${subtext} mt-1`}>at {selectedRisk.rate}% p.a. returns</div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className={`${cardBg} border ${border} rounded-2xl p-5 flex-1`}>
            <h4 className={`text-xs font-bold ${text} mb-3`}>{t.assetAllocation}</h4>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [`${v}%`, '']}
                    contentStyle={{
                      background: isDark ? '#111827' : '#fff',
                      border: `1px solid ${isDark ? '#1F2937' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: isDark ? '#fff' : '#111',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: isDark ? '#9CA3AF' : '#6B7280', fontSize: '11px' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lock in Button */}
          <button
            onClick={handleLock}
            disabled={locked}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all
              ${locked
                ? 'bg-accent/20 text-accent border border-accent cursor-default'
                : 'bg-accent text-[#0B0F17] hover:bg-accent-hover animate-pulse-glow'
              }`}
          >
            <Lock className="w-4 h-4" />
            {locked ? `SIP of ${formatINR(monthlySIP)}/mo Locked In!` : t.lockGoal}
          </button>
        </div>
      </div>
    </div>
  );
}
