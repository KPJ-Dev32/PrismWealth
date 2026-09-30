import React, { createContext, useContext, useState } from 'react';
import { AppContextType, Language, Persona, TabId, Theme } from '@/types';
import { PERSONAS } from '@/data/personas';

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeTab, setActiveTab] = useState<TabId>(0);
  const [prdOpen, setPrdOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        language,
        setLanguage,
        theme,
        setTheme,
        activeTab,
        setActiveTab,
        prdOpen,
        setPrdOpen,
        isDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
