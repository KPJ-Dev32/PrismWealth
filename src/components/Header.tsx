import { useState } from 'react';
import {
  TrendingUp,
  Sun,
  Moon,
  Languages,
  BookOpen,
  ChevronDown,
  Compass,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { PERSONAS } from '@/data/personas';
import { formatLakh } from '@/utils/formatters';

export default function Header() {
  const {
    persona, setPersona,
    language, setLanguage,
    theme, setTheme,
    setPrdOpen,
    isDark,
  } = useApp();
  const [personaOpen, setPersonaOpen] = useState(false);

  const bg = isDark ? 'bg-[#0B0F17]' : 'bg-white';
  const border = isDark ? 'border-[#1F2937]' : 'border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-[#111827]' : 'bg-gray-100';

  return (
    <header className={`sticky top-0 z-40 ${bg} border-b ${border} px-4 sm:px-6 py-3`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/30 animate-pulse-glow">
            <Compass className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className={`text-lg font-bold tracking-tight ${text}`}>
              Prism<span className="text-accent">Wealth</span>
            </span>
            <div className={`text-[10px] ${subtext} -mt-0.5 tracking-widest uppercase`}>
              Intelligent Portfolio OS
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setPersonaOpen(v => !v)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${border} ${cardBg} ${text} text-sm hover:border-accent/50 transition-all`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">{persona.name}</span>
              <span className={`text-xs ${subtext} hidden sm:inline`}>
                {persona.age}, {persona.tag} • {formatLakh(persona.portfolio)}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 ${subtext} transition-transform ${personaOpen ? 'rotate-180' : ''}`} />
            </button>
            {personaOpen && (
              <div className={`absolute right-0 mt-1.5 w-72 rounded-xl border ${border} ${isDark ? 'bg-[#111827]' : 'bg-white'} shadow-xl z-50 overflow-hidden`}>
                {PERSONAS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setPersona(p); setPersonaOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors
                      ${persona.id === p.id
                        ? 'bg-accent/10 text-accent'
                        : `${text} ${isDark ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50'}`}
                    `}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{p.name}, {p.age}</div>
                      <div className={`text-xs ${subtext}`}>{p.tag}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">{formatLakh(p.portfolio)}</div>
                      <div className="text-xs text-accent">+{p.returns}% returns</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${border} ${cardBg} ${text} text-xs font-medium hover:border-secondary/50 transition-all`}
          >
            <Languages className="w-3.5 h-3.5 text-secondary" />
            {language === 'en' ? 'Hinglish' : 'English'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg border ${border} ${cardBg} ${text} hover:border-accent/50 transition-all`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* PRD Drawer Button */}
          <button
            onClick={() => setPrdOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-[#0B0F17] text-xs font-bold hover:bg-accent-hover transition-all animate-pulse-glow"
          >
            <BookOpen className="w-3.5 h-3.5" />
            PM Case Study & PRD
          </button>
        </div>
      </div>
    </header>
  );
}
