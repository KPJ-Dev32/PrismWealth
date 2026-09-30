import { useState } from 'react';
import { CheckSquare, Square, Zap, Info } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { T } from '@/i18n/translations';
import { OVERLAP_STOCKS } from '@/data/mockData';
import { formatINR } from '@/utils/formatters';

const FUNDS = [
  { id: 'ppfc', label: 'Parag Parikh Flexi Cap', ter: 0.61, shortLabel: 'PPFC' },
  { id: 'uti',  label: 'UTI Nifty 50 Index',    ter: 0.20, shortLabel: 'UTI N50' },
  { id: 'malc', label: 'Mirae Asset Large Cap',  ter: 0.54, shortLabel: 'MALC' },
];

type FundId = 'ppfc' | 'uti' | 'malc';

function OverlapArc({ percent, isDark }: { percent: number; isDark: boolean }) {
  const r = 64;
  const cx = 80, cy = 80;
  const total = Math.PI * r;
  const dash = (percent / 100) * total;
  const color = percent > 50 ? '#EF4444' : percent > 35 ? '#F59E0B' : '#00D09C';
  const label = percent > 50 ? 'High Risk' : percent > 35 ? 'Moderate' : 'Healthy';

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="100" viewBox="0 0 160 100">
        <path
          d={`M 16 84 A 64 64 0 0 1 144 84`}
          fill="none"
          stroke={isDark ? '#1F2937' : '#E5E7EB'}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M 16 84 A 64 64 0 0 1 144 84`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${total}`}
          style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={color} fontSize="22" fontWeight="700">
          {percent}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={isDark ? '#9CA3AF' : '#6B7280'} fontSize="10">
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function OverlapMatrix() {
  const { persona, language, isDark } = useApp();
  const t = T[language];
  const [selected, setSelected] = useState<Set<FundId>>(new Set(['ppfc', 'uti', 'malc']));
  const [simulated, setSimulated] = useState(false);

  const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const rowHover = isDark ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50';
  const theadBg = isDark ? 'bg-[#0B0F17]' : 'bg-gray-50';

  const toggle = (id: FundId) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
    setSimulated(false);
  };

  const overlapPct = persona.overlapIndex;
  const activeFunds = FUNDS.filter(f => selected.has(f.id as FundId));
  const visibleStocks = OVERLAP_STOCKS.filter(() => selected.size >= 2);

  const annualSaving = 4200;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fund Chips + Gauge */}
        <div className={`${cardBg} border ${border} rounded-2xl p-6`}>
          <h3 className={`text-sm font-bold ${text} mb-4`}>{t.overlapGauge}</h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {FUNDS.map(f => (
              <button
                key={f.id}
                onClick={() => toggle(f.id as FundId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
                  ${selected.has(f.id as FundId)
                    ? 'bg-accent/10 border-accent text-accent'
                    : `border-[#1F2937] ${subtext} ${isDark ? 'hover:border-gray-600' : 'hover:border-gray-400'}`
                  }`}
              >
                {selected.has(f.id as FundId)
                  ? <CheckSquare className="w-3 h-3" />
                  : <Square className="w-3 h-3" />}
                {f.shortLabel}
                <span className={`ml-1 ${selected.has(f.id as FundId) ? 'text-accent/70' : subtext}`}>
                  TER {f.ter}%
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <OverlapArc percent={selected.size < 2 ? 0 : overlapPct} isDark={isDark} />
            <p className={`text-xs text-center ${subtext} mt-2 max-w-xs`}>
              {selected.size < 2
                ? 'Select at least 2 funds to see overlap'
                : `${activeFunds.map(f => f.shortLabel).join(' + ')} share ${overlapPct}% stock overlap`}
            </p>
          </div>
        </div>

        {/* Simulate Rebalance */}
        <div className={`${cardBg} border ${border} rounded-2xl p-6 flex flex-col justify-between`}>
          <div>
            <h3 className={`text-sm font-bold ${text} mb-2`}>{t.simulateRebalance}</h3>
            <div className={`flex items-start gap-2 p-3 rounded-xl bg-warn/10 border border-warn/30 mb-4`}>
              <Info className="w-4 h-4 text-warn shrink-0 mt-0.5" />
              <p className={`text-xs ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                {t.savingsNote}
              </p>
            </div>

            {simulated && (
              <div className="space-y-3 animate-fade-up">
                <div className={`p-4 rounded-xl bg-accent/10 border border-accent/30`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${subtext}`}>Annual Fee Savings</span>
                    <span className="text-accent font-bold">{formatINR(annualSaving)}/yr</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${subtext}`}>20-Year Compounded Saving</span>
                    <span className="text-accent font-bold">{formatINR(annualSaving * 20 * 1.4)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${subtext}`}>Recommendation</span>
                    <span className="text-secondary font-bold text-xs">Consolidate to UTI N50</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F2937]' : 'bg-gray-100'}`}>
                  <p className={`text-xs ${subtext}`}>Replace PPFC + MALC overlap exposure with a single <span className="text-accent">UTI Nifty 50 Index Fund</span> at 0.20% TER to eliminate duplicate holdings and save {formatINR(annualSaving)}/yr in redundant fees.</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setSimulated(v => !v)}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-[#0B0F17] font-bold text-sm hover:bg-accent-hover transition-all"
          >
            <Zap className="w-4 h-4" />
            {simulated ? 'Reset Simulation' : t.simulateRebalance}
          </button>
        </div>
      </div>

      {/* Common Holdings Table */}
      <div className={`${cardBg} border ${border} rounded-2xl overflow-hidden`}>
        <div className="px-6 py-4 border-b border-[#1F2937]">
          <h3 className={`text-sm font-bold ${text}`}>{t.commonStocks}</h3>
          <p className={`text-xs ${subtext} mt-0.5`}>Stocks held across multiple selected funds</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${theadBg}`}>
                <th className={`px-6 py-3 text-left text-xs font-semibold ${subtext}`}>Stock</th>
                <th className={`px-6 py-3 text-center text-xs font-semibold ${subtext}`}>PPFC</th>
                <th className={`px-6 py-3 text-center text-xs font-semibold ${subtext}`}>UTI N50</th>
                <th className={`px-6 py-3 text-center text-xs font-semibold ${subtext}`}>MALC</th>
                <th className={`px-6 py-3 text-center text-xs font-semibold ${subtext}`}>Aggregate</th>
              </tr>
            </thead>
            <tbody>
              {visibleStocks.map((stock, i) => {
                const total = stock.ppfc + stock.uti + stock.malc;
                return (
                  <tr key={i} className={`border-t ${border} ${rowHover} transition-colors`}>
                    <td className={`px-6 py-3.5 text-sm font-semibold ${text}`}>{stock.name}</td>
                    {[stock.ppfc, stock.uti, stock.malc].map((w, j) => (
                      <td key={j} className="px-6 py-3.5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-xs font-mono font-semibold ${w > 9 ? 'text-warn' : 'text-secondary'}`}>{w}%</span>
                          <div className={`h-1 w-12 rounded-full ${isDark ? 'bg-[#1F2937]' : 'bg-gray-200'}`}>
                            <div
                              className="h-1 rounded-full transition-all duration-700"
                              style={{ width: `${(w / 15) * 100}%`, background: w > 9 ? '#F59E0B' : '#06B6D4' }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-xs font-bold font-mono text-danger">{total.toFixed(1)}%</span>
                    </td>
                  </tr>
                );
              })}
              {visibleStocks.length === 0 && (
                <tr>
                  <td colSpan={5} className={`px-6 py-8 text-center text-sm ${subtext}`}>
                    Select 2 or more funds to see common holdings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
