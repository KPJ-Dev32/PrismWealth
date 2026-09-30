import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { AlertTriangle, TrendingUp, Brain } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { T } from '@/i18n/translations';
import { CRISIS_SCENARIOS } from '@/data/mockData';

export default function CrisisStressTester() {
  const { language, isDark } = useApp();
  const t = T[language];
  const [activeId, setActiveId] = useState('covid');

  const scenario = CRISIS_SCENARIOS.find(s => s.id === activeId)!;

  const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const gridColor = isDark ? '#1F2937' : '#E5E7EB';
  const axisColor = isDark ? '#4B5563' : '#9CA3AF';

  const insight = language === 'hi' ? scenario.insightHi : scenario.insight;
  const scenarioLabel = language === 'hi' ? scenario.labelHi : scenario.label;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-3">
        {CRISIS_SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
              ${activeId === s.id
                ? 'border-transparent text-[#0B0F17]'
                : `${border} ${subtext} ${isDark ? 'hover:border-gray-600' : 'hover:border-gray-400'}`
              }`}
            style={activeId === s.id ? { background: s.color } : {}}
          >
            <AlertTriangle className="w-4 h-4" />
            {language === 'hi' ? s.labelHi : s.label}
            <span className={`text-xs font-bold ${activeId === s.id ? 'text-[#0B0F17]/80' : 'text-danger'}`}>
              -{s.drop}%
            </span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className={`${cardBg} border ${border} rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h3 className={`text-sm font-bold ${text}`}>{t.crisisTitle}</h3>
            <p className={`text-xs ${subtext} mt-0.5`}>{scenarioLabel} — Portfolio Value (Indexed to 100)</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-accent rounded-full" />
              <span className={`text-xs ${subtext}`}>{t.continuedsip}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-danger rounded-full opacity-60" style={{ borderTop: '1px dashed #EF4444', background: 'none', height: 0 }} />
              <span className={`text-xs ${subtext}`}>{t.panicSell}</span>
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scenario.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke={axisColor}
                tick={{ fontSize: 11, fill: axisColor }}
                tickLine={false}
                tickFormatter={v => `M${v}`}
              />
              <YAxis
                stroke={axisColor}
                tick={{ fontSize: 11, fill: axisColor }}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={v => `${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: isDark ? '#111827' : '#fff',
                  border: `1px solid ${isDark ? '#1F2937' : '#E5E7EB'}`,
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  color: isDark ? '#fff' : '#111',
                }}
                formatter={(value, name) => [
                  `${value}`,
                  name === 'withSIP' ? t.continuedsip : t.panicSell,
                ]}
                labelFormatter={l => `Month ${l}`}
              />
              <ReferenceLine y={100} stroke={isDark ? '#374151' : '#CBD5E1'} strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="withoutSIP"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 3"
                opacity={0.7}
              />
              <Line
                type="monotone"
                dataKey="withSIP"
                stroke="#00D09C"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Delta callout */}
        <div className={`flex items-center gap-3 mt-4 p-3 rounded-xl ${isDark ? 'bg-[#0B0F17]' : 'bg-gray-50'}`}>
          <TrendingUp className="w-4 h-4 text-accent shrink-0" />
          <p className={`text-xs ${subtext}`}>
            Disciplined SIP investors recovered{' '}
            <span className="text-accent font-semibold">
              {scenario.drop > 40 ? '18 months' : scenario.drop > 25 ? '9 months' : '4 months'}
            </span>{' '}
            faster than those who paused contributions during the crash.
          </p>
        </div>
      </div>

      {/* Behavioral Insight */}
      <div className={`${cardBg} border border-accent/30 rounded-2xl p-6`}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-accent/10 shrink-0">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${text} mb-2`}>{t.behaviorInsight}</h4>
            <p className={`text-sm leading-relaxed ${subtext}`}>{insight}</p>
          </div>
        </div>
      </div>

      {/* Scenario Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CRISIS_SCENARIOS.map(s => (
          <div
            key={s.id}
            className={`${cardBg} border rounded-xl p-4 cursor-pointer transition-all
              ${activeId === s.id ? 'border-accent/50' : border}`}
            onClick={() => setActiveId(s.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold ${text}`}>{language === 'hi' ? s.labelHi : s.label}</span>
              <span className="text-xs font-bold text-danger">-{s.drop}%</span>
            </div>
            <div
              className="h-1 rounded-full"
              style={{
                background: `linear-gradient(to right, ${s.color}, transparent)`,
                opacity: activeId === s.id ? 1 : 0.4,
              }}
            />
            <p className={`text-xs ${subtext} mt-2`}>
              Recovery: {s.drop > 40 ? '~4 yrs' : s.drop > 25 ? '~18 mos' : '~8 mos'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
