import { useState } from 'react';
import { Shield, Info, Calendar, Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { T } from '@/i18n/translations';
import { LTCG_LOTS, LTCG_LIMIT } from '@/data/mockData';
import { formatINR, formatLakh } from '@/utils/formatters';

const LTCG_TAX_RATE = 0.125;

export default function LTCGHarvest() {
  const { language, isDark } = useApp();
  const t = T[language];
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const rowHover = isDark ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50';

  const eligibleLots = LTCG_LOTS.filter(l => l.isLTCG);

  const harvestedTotal = Array.from(selected).reduce((sum, id) => {
    const lot = LTCG_LOTS.find(l => l.id === id);
    return sum + (lot?.unrealizedGain ?? 0);
  }, 0);

  const withinLimit = Math.min(harvestedTotal, LTCG_LIMIT);
  const overLimit = Math.max(0, harvestedTotal - LTCG_LIMIT);
  const taxSaved = Math.round(withinLimit * LTCG_TAX_RATE);
  const taxOwed = Math.round(overLimit * LTCG_TAX_RATE);
  const pct = Math.min((harvestedTotal / LTCG_LIMIT) * 100, 100);
  const overPct = harvestedTotal > LTCG_LIMIT ? Math.min(((harvestedTotal - LTCG_LIMIT) / LTCG_LIMIT) * 100, 30) : 0;

  const toggleLot = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Budget 2024 Banner */}
      <div className={`flex items-start gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/30`}>
        <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <p className={`text-xs ${isDark ? 'text-cyan-200' : 'text-cyan-800'}`}>{t.ltcgExemption}</p>
      </div>

      {/* Progress Bar */}
      <div className={`${cardBg} border ${border} rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold ${text}`}>{t.ltcgLimit}</h3>
          <span className={`text-xs font-mono font-semibold ${harvestedTotal > LTCG_LIMIT ? 'text-danger' : 'text-accent'}`}>
            {formatINR(harvestedTotal)} / {formatINR(LTCG_LIMIT)}
          </span>
        </div>

        <div className={`h-3 rounded-full ${isDark ? 'bg-[#0B0F17]' : 'bg-gray-200'} overflow-hidden`}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: harvestedTotal > LTCG_LIMIT
                ? 'linear-gradient(to right, #00D09C, #EF4444)'
                : 'linear-gradient(to right, #00D09C, #06B6D4)',
            }}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs ${subtext}`}>₹0</span>
          <span className={`text-xs font-medium ${harvestedTotal > LTCG_LIMIT ? 'text-danger' : 'text-accent'}`}>
            {pct.toFixed(0)}% utilized
          </span>
          <span className={`text-xs ${subtext}`}>{formatINR(LTCG_LIMIT)}</span>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className={`p-4 rounded-xl bg-accent/10 border border-accent/30`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-accent" />
              <span className={`text-xs font-semibold ${subtext}`}>{t.taxSaved}</span>
            </div>
            <div className="text-xl font-bold text-accent font-mono">{formatINR(taxSaved)}</div>
            <div className={`text-xs ${subtext} mt-0.5`}>12.5% LTCG tax avoided</div>
          </div>
          {overLimit > 0 && (
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/30">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-danger" />
                <span className={`text-xs font-semibold ${subtext}`}>Tax Owed (Over Limit)</span>
              </div>
              <div className="text-xl font-bold text-danger font-mono">{formatINR(taxOwed)}</div>
              <div className={`text-xs ${subtext} mt-0.5`}>on {formatINR(overLimit)} excess gain</div>
            </div>
          )}
          {overLimit === 0 && harvestedTotal === 0 && (
            <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0B0F17]' : 'bg-gray-50'} border ${border}`}>
              <span className={`text-xs ${subtext}`}>Select LTCG lots below to simulate your harvest</span>
            </div>
          )}
        </div>
      </div>

      {/* Lots Table */}
      <div className={`${cardBg} border ${border} rounded-2xl overflow-hidden`}>
        <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
          <div>
            <h3 className={`text-sm font-bold ${text}`}>{t.ltcgLotsTitle}</h3>
            <p className={`text-xs ${subtext} mt-0.5`}>Only LTCG-eligible lots (held &gt; 365 days) contribute to the exemption</p>
          </div>
        </div>

        <div className="divide-y divide-[#1F2937]">
          {LTCG_LOTS.map(lot => {
            const isSelected = selected.has(lot.id);
            const canSelect = lot.isLTCG;
            return (
              <div
                key={lot.id}
                onClick={() => canSelect && toggleLot(lot.id)}
                className={`flex items-center gap-4 px-6 py-4 transition-colors
                  ${canSelect ? `cursor-pointer ${rowHover}` : 'opacity-50 cursor-not-allowed'}
                  ${isSelected ? (isDark ? 'bg-accent/5' : 'bg-green-50') : ''}
                `}
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all
                  ${isSelected ? 'bg-accent border-accent' : `border-[#374151]`}`}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-[#0B0F17]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${text}`}>{lot.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lot.type === 'MF' ? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'}`}>
                      {lot.type}
                    </span>
                  </div>
                  <div className={`flex items-center gap-4 mt-0.5`}>
                    <span className={`text-xs ${subtext} flex items-center gap-1`}>
                      <Calendar className="w-3 h-3" />{lot.purchaseDate}
                    </span>
                    <span className={`text-xs ${subtext} flex items-center gap-1`}>
                      <Clock className="w-3 h-3" />{lot.holdingDays}d held
                    </span>
                  </div>
                </div>

                {/* Gain */}
                <div className="text-right">
                  <div className={`text-sm font-bold ${lot.isLTCG ? 'text-accent' : 'text-warn'} font-mono`}>
                    +{formatINR(lot.unrealizedGain)}
                  </div>
                  <div className={`text-[10px] font-bold mt-0.5 ${lot.isLTCG ? 'text-accent/70' : 'text-warn/70'}`}>
                    {lot.isLTCG ? 'LTCG ✓' : 'STCG — not eligible'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
