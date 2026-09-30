import { lazy, Suspense } from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import MetricCards from '@/components/MetricCards';
import PRDDrawer from '@/components/PRDDrawer';
import { T } from '@/i18n/translations';
import { TabId } from '@/types';

const OverlapMatrix      = lazy(() => import('@/components/tabs/OverlapMatrix'));
const GoalSIPAllocator   = lazy(() => import('@/components/tabs/GoalSIPAllocator'));
const LTCGHarvest        = lazy(() => import('@/components/tabs/LTCGHarvest'));
const CrisisStressTester = lazy(() => import('@/components/tabs/CrisisStressTester'));

const TAB_KEYS = ['tab0', 'tab1', 'tab2', 'tab3'] as const;

function TabBar() {
  const { activeTab, setActiveTab, language, isDark } = useApp();
  const t = T[language];
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className={`flex gap-1 border-b ${border} overflow-x-auto`}>
      {TAB_KEYS.map((key, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i as TabId)}
          className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all
            ${activeTab === i
              ? 'border-accent text-accent'
              : `border-transparent ${subtext} hover:${text}`
            }`}
        >
          {t[key]}
        </button>
      ))}
    </div>
  );
}

function TabContent() {
  const { activeTab } = useApp();
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-500 text-sm">Loading...</div>}>
      {activeTab === 0 && <OverlapMatrix />}
      {activeTab === 1 && <GoalSIPAllocator />}
      {activeTab === 2 && <LTCGHarvest />}
      {activeTab === 3 && <CrisisStressTester />}
    </Suspense>
  );
}

function AppShell() {
  const { isDark } = useApp();
  const bgMain = isDark ? 'bg-[#0B0F17]' : 'bg-gray-100';
  const textColor = isDark ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgMain} ${textColor} font-sans`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <MetricCards />
        <div className={`rounded-2xl border ${isDark ? 'border-[#1F2937] bg-[#111827]' : 'border-gray-200 bg-white'}`}>
          <TabBar />
          <div className="p-6">
            <TabContent />
          </div>
        </div>
      </main>
      <PRDDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
