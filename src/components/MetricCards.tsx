import { TrendingUp, AlertTriangle, DollarSign, Leaf } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { T } from '@/i18n/translations';
import { formatINR, formatLakh, formatPercent } from '@/utils/formatters';
import { LTCG_LIMIT } from '@/data/mockData';

export default function MetricCards() {
  const { persona, language, isDark } = useApp();
  const t = T[language];

  const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  const metrics = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      iconColor: 'text-accent bg-accent/10',
      label: t.netWorth,
      value: formatLakh(persona.portfolio),
      sub: formatPercent(persona.returns) + ' ' + t.returns,
      subColor: 'text-accent',
      badge: null,
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      iconColor: 'text-warn bg-warn/10',
      label: t.overlapIndex,
      value: `${persona.overlapIndex}%`,
      sub: t.duplicateExposure,
      subColor: 'text-warn',
      badge: persona.overlapIndex > 50 ? 'High Risk' : persona.overlapIndex > 35 ? 'Moderate' : 'Healthy',
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      iconColor: 'text-danger bg-danger/10',
      label: t.annualFeeDrag,
      value: formatINR(persona.feeDrag) + '/yr',
      sub: t.redundantTER,
      subColor: 'text-danger',
      badge: null,
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      iconColor: 'text-secondary bg-secondary/10',
      label: t.ltcgPool,
      value: formatLakh(persona.ltcgPool),
      sub: `${t.taxFreeGain} (under ${formatINR(LTCG_LIMIT)} limit)`,
      subColor: 'text-secondary',
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className={`${cardBg} border ${border} rounded-2xl p-5 hover:border-accent/30 transition-all duration-300 animate-fade-up`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-xl ${m.iconColor}`}>{m.icon}</div>
            {m.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${m.badge === 'High Risk' ? 'bg-danger/20 text-danger' : m.badge === 'Moderate' ? 'bg-warn/20 text-warn' : 'bg-accent/20 text-accent'}
              `}>
                {m.badge}
              </span>
            )}
          </div>
          <div className={`text-xs font-medium mb-1 ${subtext}`}>{m.label}</div>
          <div className={`text-2xl font-bold ${text} tracking-tight mb-1`}>{m.value}</div>
          <div className={`text-xs ${m.subColor} font-medium`}>{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
