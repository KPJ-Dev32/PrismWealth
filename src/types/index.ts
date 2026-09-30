export type Language = 'en' | 'hi';
export type Theme = 'dark' | 'light';
export type TabId = 0 | 1 | 2 | 3;

export interface Persona {
  id: string;
  name: string;
  age: number;
  tag: string;
  portfolio: number;
  returns: number;
  overlapIndex: number;
  feeDrag: number;
  ltcgPool: number;
  sipAmount: number;
}

export interface OverlapStock {
  name: string;
  ppfc: number;
  uti: number;
  malc: number;
}

export interface LTCGLot {
  id: number;
  name: string;
  type: 'Stock' | 'MF';
  purchaseDate: string;
  holdingDays: number;
  unrealizedGain: number;
  isLTCG: boolean;
}

export interface CrisisScenario {
  id: string;
  label: string;
  labelHi: string;
  drop: number;
  color: string;
  data: { month: number; withoutSIP: number; withSIP: number }[];
  insight: string;
  insightHi: string;
}

export interface AppContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  prdOpen: boolean;
  setPrdOpen: (o: boolean) => void;
  isDark: boolean;
}
