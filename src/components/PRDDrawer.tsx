import { useState } from 'react';
import { X, Copy, Check, Target, Users, ClipboardList, BarChart2, Cpu } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const PRD_CONTENT = {
  problem: {
    title: 'Problem Statement',
    icon: <Target className="w-4 h-4" />,
    content: `Most Indian retail investors face three invisible wealth destroyers:

1. FUND OVERLAP (42%+ avg.) — Investors hold 5-8 mutual funds unknowingly owning the same 12 stocks (HDFC Bank, Infosys, TCS) at 3x the concentration. No tool surfaces this clearly.

2. SILENT FEE DRAG (₹9,850–₹37,200/yr) — Redundant TER fees from overlapping active funds silently compound into lakhs of lost wealth over 20 years.

3. LTCG BLIND SPOT — The ₹1.25L tax-free LTCG exemption (Budget 2024) goes unutilized by 87% of investors who lack a harvest workflow, costing ₹15,625+ annually in avoidable taxes.

The gap: India has 8.5 Cr+ mutual fund folios but zero consumer-grade tools that unify overlap intelligence, goal planning, and tax optimization in a single OS-grade experience.`,
  },
  personas: {
    title: 'Target Personas',
    icon: <Users className="w-4 h-4" />,
    content: `PERSONA 1 — ANANYA (24, Growth SIP)
• Portfolio: ₹8.5L across 5 SIPs
• Pain: Doesn't know 3 of her funds hold identical top-10 stocks
• Goal: Buy a flat in Bangalore in 7 years
• Success: Overlap eliminated, SIP optimized for her goal

PERSONA 2 — RAJESH (34, Multi-Asset)  
• Portfolio: ₹32L across equity, debt, gold
• Pain: High TER drag eating ₹37K/year, misses LTCG harvest window
• Goal: Retirement corpus by 55
• Success: Fee drag cut by 60%, ₹1.25L LTCG harvested yearly

PERSONA 3 — AMIT (22, First-Timer)
• Portfolio: ₹1.2L, just started investing
• Pain: Overwhelmed by choice, afraid of market crashes
• Goal: ₹10L emergency + wealth foundation
• Success: Behavioral confidence, first SIP locked in with goal`,
  },
  stories: {
    title: 'User Stories & Acceptance Criteria',
    icon: <ClipboardList className="w-4 h-4" />,
    content: `US-01 OVERLAP DETECTION
As an investor, I want to see which stocks overlap across my mutual funds so I can eliminate concentration risk.
AC: Fund overlap % shown within 2s. Duplicate stocks ranked by aggregate weight. Rebalance simulation saves ≥ ₹4,200/yr.

US-02 GOAL-BASED SIP PLANNER
As an investor, I want inflation-adjusted SIP recommendations for my specific goals and risk profile.
AC: Inflation-adjusted target computed in real-time. SIP changes < 200ms on slider interaction. Donut chart updates immediately.

US-03 LTCG TAX HARVESTER
As an investor, I want to know which lots to sell before March 31 to maximize my ₹1.25L tax-free exemption.
AC: Lots filtered by LTCG eligibility (>365 days). Running total doesn't exceed ₹1.25L. Tax saved displayed in real-time.

US-04 CRISIS BEHAVIORAL COACH
As an investor, I want to understand how past market crashes resolved for SIP investors so I don't panic-sell.
AC: All 3 scenarios renderable < 300ms. Behavioral insight shown per scenario. Recovery delta between SIP vs no-SIP visible.`,
  },
  metrics: {
    title: 'Metrics Framework',
    icon: <BarChart2 className="w-4 h-4" />,
    content: `NORTH STAR METRIC
Rebalanced AUM (₹ assets optimized per user per year)

PRIMARY METRICS
• Overlap Elimination % — % of users who reduced overlap by ≥10 percentage points
• D90 Retention — 90-day active users post onboarding
• Goal SIP Lock-In Rate — % who lock a SIP within first session
• LTCG Harvest Activation — % of eligible users who initiate harvest workflow

GUARDRAIL METRICS
• Session crash rate < 0.1%
• P95 chart render latency < 400ms
• SIP calculation accuracy: ±0.5% vs actuary model

BEHAVIORAL FUNNEL
Onboard → Run Overlap Scan → Set Goal → Lock SIP → Tax Harvest → Rebalance
Target: 42% of users reach Rebalance in D30`,
  },
  architecture: {
    title: 'Architectural Trade-offs',
    icon: <Cpu className="w-4 h-4" />,
    content: `CLIENT-SIDE COMPUTATION vs. SERVER-SIDE
Decision: All SIP calculations, overlap scoring, and tax estimations run client-side.
Why: P95 latency < 50ms vs 300-800ms for API round-trips. No data egress risk.
Trade-off: Larger bundle (+80KB for Recharts). Mitigated by lazy-loading tab content.

DATA PERSISTENCE — SUPABASE
Decision: Portfolio data, persona state, and goal locks persisted to Supabase.
Why: Zero-config Postgres with Row-Level Security. Auth + storage in same platform.
Trade-off: Vendor lock-in. Mitigated by keeping domain logic in pure TS functions.

RECHARTS vs. D3
Decision: Recharts (declarative) over D3 (imperative).
Why: 5x faster dev velocity, React-native, accessible SVG output.
Trade-off: Less control over animations. Mitigated with CSS transitions on containers.

BILINGUAL TOGGLE STRATEGY
Decision: Static JSON translations keyed per UI string vs. i18next full library.
Why: Only 2 locales, <50 keys. Library overhead not justified.
Trade-off: No pluralization rules. Acceptable for MVP scope.

DARK / LIGHT THEMING
Decision: Tailwind class-based dark mode with conditional prop drilling.
Why: No flash of unstyled content, SSR-safe, zero CSS-in-JS runtime.
Trade-off: Prop drilling depth. Mitigated by React Context.`,
  },
};

type TabKey = keyof typeof PRD_CONTENT;

export default function PRDDrawer() {
  const { prdOpen, setPrdOpen, isDark } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>('problem');
  const [copied, setCopied] = useState(false);

  const bg = isDark ? 'bg-[#111827]' : 'bg-white';
  const headerBg = isDark ? 'bg-[#0B0F17]' : 'bg-gray-50';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const tabActive = isDark ? 'bg-[#1F2937] text-white' : 'bg-white text-gray-900 shadow-sm';
  const tabInactive = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900';

  const handleCopy = () => {
    const section = PRD_CONTENT[activeTab];
    navigator.clipboard.writeText(`# ${section.title}\n\n${section.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prdOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setPrdOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl ${bg} border-l ${border} z-50 flex flex-col animate-slide-in-right`}
      >
        {/* Header */}
        <div className={`${headerBg} border-b ${border} px-6 py-4 flex items-center justify-between`}>
          <div>
            <h2 className={`text-lg font-bold ${text}`}>PM Case Study & PRD</h2>
            <p className={`text-xs ${subtext} mt-0.5`}>PrismWealth — Product Requirements Document</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/30 text-xs font-medium hover:bg-accent/20 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy PRD'}
            </button>
            <button
              onClick={() => setPrdOpen(false)}
              className={`p-2 rounded-lg border ${border} ${subtext} hover:text-white transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`${headerBg} border-b ${border} px-4 pt-3`}>
          <div className="flex gap-1 overflow-x-auto">
            {(Object.keys(PRD_CONTENT) as TabKey[]).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all
                  ${activeTab === key ? tabActive : tabInactive}`}
              >
                {PRD_CONTENT[key].icon}
                {PRD_CONTENT[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className={`text-base font-bold ${text} mb-4 flex items-center gap-2`}>
            <span className="text-accent">{PRD_CONTENT[activeTab].icon}</span>
            {PRD_CONTENT[activeTab].title}
          </h3>
          <pre className={`${subtext} text-sm leading-relaxed whitespace-pre-wrap font-sans`}>
            {PRD_CONTENT[activeTab].content}
          </pre>
        </div>

        {/* Footer */}
        <div className={`${headerBg} border-t ${border} px-6 py-3 flex items-center justify-between`}>
          <span className={`text-xs ${subtext}`}>PrismWealth v1.0 — Built for Indian Wealth Management</span>
          <span className="text-xs text-accent font-mono">CONFIDENTIAL</span>
        </div>
      </div>
    </>
  );
}
