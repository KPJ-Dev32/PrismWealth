import { OverlapStock, LTCGLot, CrisisScenario } from '@/types';

export const OVERLAP_STOCKS: OverlapStock[] = [
  { name: 'HDFC Bank',  ppfc: 6.2,  uti: 12.8, malc: 8.4 },
  { name: 'ICICI Bank', ppfc: 5.8,  uti: 9.6,  malc: 7.2 },
  { name: 'Infosys',    ppfc: 4.1,  uti: 6.8,  malc: 5.9 },
  { name: 'Reliance',   ppfc: 7.3,  uti: 9.2,  malc: 8.1 },
  { name: 'TCS',        ppfc: 3.9,  uti: 7.4,  malc: 6.3 },
];

export const LTCG_LOTS: LTCGLot[] = [
  {
    id: 1,
    name: 'Infosys',
    type: 'Stock',
    purchaseDate: '2024-12-10',
    holdingDays: 660,
    unrealizedGain: 18500,
    isLTCG: true,
  },
  {
    id: 2,
    name: 'HDFC Bank',
    type: 'Stock',
    purchaseDate: '2025-03-05',
    holdingDays: 574,
    unrealizedGain: 12200,
    isLTCG: true,
  },
  {
    id: 3,
    name: 'Nifty 50 Index Fund',
    type: 'MF',
    purchaseDate: '2024-09-15',
    holdingDays: 745,
    unrealizedGain: 22400,
    isLTCG: true,
  },
  {
    id: 4,
    name: 'Mirae Large Cap',
    type: 'MF',
    purchaseDate: '2026-01-20',
    holdingDays: 253,
    unrealizedGain: 8900,
    isLTCG: false,
  },
  {
    id: 5,
    name: 'TCS',
    type: 'Stock',
    purchaseDate: '2024-06-01',
    holdingDays: 851,
    unrealizedGain: 31200,
    isLTCG: true,
  },
  {
    id: 6,
    name: 'Reliance Industries',
    type: 'Stock',
    purchaseDate: '2026-07-15',
    holdingDays: 77,
    unrealizedGain: 3400,
    isLTCG: false,
  },
];

export const LTCG_LIMIT = 125000;

function buildCrisisData(
  dropPct: number,
  durationMonths: number
): { month: number; withoutSIP: number; withSIP: number }[] {
  const pts = [];
  const dropFactor = 1 - dropPct / 100;
  for (let m = 0; m <= durationMonths; m++) {
    const progress = m / durationMonths;
    const withoutSIP = m === 0
      ? 100
      : m <= durationMonths * 0.35
        ? 100 * (1 - (1 - dropFactor) * (m / (durationMonths * 0.35)))
        : dropFactor * 100 * Math.pow(1.0095, m - durationMonths * 0.35);
    const sipBoost = progress * 28;
    pts.push({
      month: m,
      withoutSIP: Math.round(withoutSIP * 10) / 10,
      withSIP: Math.round((withoutSIP + sipBoost) * 10) / 10,
    });
  }
  return pts;
}

export const CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'covid',
    label: '2020 Covid Crash',
    labelHi: '2020 Covid Crash',
    drop: 38,
    color: '#EF4444',
    data: buildCrisisData(38, 18),
    insight:
      'Investors who paused SIPs in March 2020 missed the sharpest recovery in Nifty history. Disciplined SIP buyers bought at -38%, averaging down their cost.',
    insightHi:
      'Jo log March 2020 mein SIP band kar diye, unhone sabse badi recovery miss kar di. SIP continue karne walon ne -38% par kharida aur cost average kiya.',
  },
  {
    id: 'lehman',
    label: '2008 Lehman Crisis',
    labelHi: '2008 Lehman Crisis',
    drop: 52,
    color: '#F59E0B',
    data: buildCrisisData(52, 48),
    insight:
      'The 2008 crash took 4 years to recover for lump-sum holders, but SIP investors recovered 18 months faster due to rupee-cost averaging at depressed prices.',
    insightHi:
      '2008 crash ke baad lump-sum holders ko 4 saal lage recover karne mein, lekin SIP wale 18 mahine pehle recover kar gaye — cost averaging ki wajah se.',
  },
  {
    id: 'tech2022',
    label: '2022 Tech Pullback',
    labelHi: '2022 Tech Slowdown',
    drop: 18,
    color: '#06B6D4',
    data: buildCrisisData(18, 12),
    insight:
      'The 2022 tech correction was a shallow cycle. SIP investors barely felt the dip — their portfolios recovered within 8 months and outperformed lump-sum by 14%.',
    insightHi:
      '2022 ki correction bahut chhoti thi. SIP investors ko barely fark pada — portfolio 8 mahine mein recover ho gaya aur lump-sum se 14% aage raha.',
  },
];
