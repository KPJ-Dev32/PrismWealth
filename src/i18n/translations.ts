export type TranslationKey =
  | 'netWorth'
  | 'returns'
  | 'overlapIndex'
  | 'duplicateExposure'
  | 'annualFeeDrag'
  | 'redundantTER'
  | 'ltcgPool'
  | 'taxFreeGain'
  | 'tab0'
  | 'tab1'
  | 'tab2'
  | 'tab3'
  | 'simulateRebalance'
  | 'overlapGauge'
  | 'commonStocks'
  | 'fundWeight'
  | 'targetAmount'
  | 'timeHorizon'
  | 'inflation'
  | 'riskProfile'
  | 'adjustedTarget'
  | 'monthlySIP'
  | 'lockGoal'
  | 'ltcgLimit'
  | 'taxSaved'
  | 'ltcgLotsTitle'
  | 'crisisTitle'
  | 'continuedsip'
  | 'panicSell'
  | 'behaviorInsight'
  | 'years'
  | 'conservative'
  | 'moderate'
  | 'aggressive'
  | 'equity'
  | 'debt'
  | 'gold'
  | 'assetAllocation'
  | 'savingsNote'
  | 'ltcgExemption';

type Translations = Record<TranslationKey, string>;

const en: Translations = {
  netWorth: 'Total Portfolio Net Worth',
  returns: 'Overall Return',
  overlapIndex: 'Portfolio Overlap Index',
  duplicateExposure: 'Duplicate Exposure',
  annualFeeDrag: 'Annual Fee Drag',
  redundantTER: 'in redundant TER fees',
  ltcgPool: 'LTCG Tax Harvest Pool',
  taxFreeGain: 'tax-free gain available',
  tab0: 'Overlap & Health Matrix',
  tab1: 'Smart Goal-SIP Allocator',
  tab2: 'LTCG Tax Harvest',
  tab3: 'Crisis Stress-Tester',
  simulateRebalance: 'Simulate Rebalance',
  overlapGauge: 'Overlap Score',
  commonStocks: 'Common Stock Holdings',
  fundWeight: 'Fund Weight',
  targetAmount: 'Target Amount',
  timeHorizon: 'Time Horizon',
  inflation: 'Expected Inflation',
  riskProfile: 'Risk Profile',
  adjustedTarget: 'Inflation-Adjusted Target',
  monthlySIP: 'Required Monthly SIP',
  lockGoal: 'Lock in Goal SIP',
  ltcgLimit: '₹1.25L Annual LTCG Exemption Limit',
  taxSaved: 'Legal Tax Liability Saved',
  ltcgLotsTitle: 'Your Holdings — Select LTCG Lots to Harvest',
  crisisTitle: 'Portfolio Drawdown vs. SIP Discipline',
  continuedsip: 'Disciplined SIP Investor',
  panicSell: 'Without SIP Continuation',
  behaviorInsight: 'Behavioral Insight',
  years: 'yrs',
  conservative: 'Conservative (10%)',
  moderate: 'Moderate (13%)',
  aggressive: 'Aggressive (16%)',
  equity: 'Equity',
  debt: 'Debt',
  gold: 'Gold',
  assetAllocation: 'Recommended Asset Allocation',
  savingsNote: 'Estimated annual savings from consolidating overlapping active funds into index funds',
  ltcgExemption: 'Under Budget 2024 — ₹1,25,000 annual LTCG exemption (12.5% tax rate)',
};

const hi: Translations = {
  netWorth: 'Total Dhan (Portfolio)',
  returns: 'Overall Munafa',
  overlapIndex: 'Stock Overlap Khatra',
  duplicateExposure: 'Duplicate Holdings',
  annualFeeDrag: 'Zyada Fees Nuksaan',
  redundantTER: 'duplicate TER fees mein nuksaan',
  ltcgPool: 'Tax-Free Munafa Limit',
  taxFreeGain: 'tax-free gain available hai',
  tab0: 'Overlap Khatra Matrix',
  tab1: 'Lakshya SIP Allocator',
  tab2: 'Tax Bachao Simulator',
  tab3: 'Crisis Test Karo',
  simulateRebalance: 'Rebalance Simulate Karo',
  overlapGauge: 'Overlap Score',
  commonStocks: 'Common Holdings (Duplicate Stocks)',
  fundWeight: 'Fund Weight',
  targetAmount: 'Lakshya Amount',
  timeHorizon: 'Kitne Saal Mein',
  inflation: 'Mehangai Dar (Inflation)',
  riskProfile: 'Risk Appetite',
  adjustedTarget: 'Inflation Adjusted Lakshya',
  monthlySIP: 'Zaroori Monthly SIP',
  lockGoal: 'Goal SIP Lock Karo',
  ltcgLimit: '₹1.25L Saalana LTCG Chhoot Seema',
  taxSaved: 'Tax Bachaya (Legal)',
  ltcgLotsTitle: 'Apni Holdings — LTCG Lots Chuno Harvest ke liye',
  crisisTitle: 'Portfolio Drawdown vs. SIP Discipline',
  continuedsip: 'Disciplined SIP Investor',
  panicSell: 'Bina SIP ke (Ghabra ke)',
  behaviorInsight: 'Samajhdari ki Baat',
  years: 'saal',
  conservative: 'Conservative (10%)',
  moderate: 'Moderate (13%)',
  aggressive: 'Aggressive (16%)',
  equity: 'Equity (Shares)',
  debt: 'Debt (Bonds)',
  gold: 'Sona (Gold)',
  assetAllocation: 'Suggested Asset Distribution',
  savingsNote: 'Duplicate active funds ko index funds mein consolidate karne se estimated annual savings',
  ltcgExemption: 'Budget 2024 ke anusar — ₹1,25,000 saalana LTCG chhoot (12.5% tax dar)',
};

export const T: Record<'en' | 'hi', Translations> = { en, hi };
