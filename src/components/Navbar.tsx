import React from 'react';
import { ShieldCheck, Truck, BarChart3, MapPin, Sparkles, Building2, Layers, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'directory' | 'map' | 'analytics' | 'croatia_history' | 'ai' | 'visit_plan';
  setActiveTab: (tab: 'directory' | 'map' | 'analytics' | 'croatia_history' | 'ai' | 'visit_plan') => void;
  visitPlanCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, visitPlanCount = 0 }) => {
  return (
    <>
      {/* Top Header */}
      <header className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo & Main Title */}
            <div className="flex items-center space-x-2.5">
              <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 p-1.5 sm:p-2 rounded-xl text-slate-900 font-bold shadow-sm flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="font-bold text-sm sm:text-lg text-slate-100 tracking-tight leading-snug">
                    Gary 欧洲与俄乌轮胎资料系统
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                    <ShieldCheck className="w-3 h-3 inline mr-0.5" />
                    <span>海关核实</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-1">
                  法国🇫🇷 · 克罗地亚🇭🇷 · 斯洛文尼亚🇸🇮 · 俄罗斯🇷🇺 · 乌克兰🇺🇦
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                id="tab-directory"
                onClick={() => setActiveTab('directory')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'directory'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>客户信息</span>
              </button>

              <button
                id="tab-visit-plan"
                onClick={() => setActiveTab('visit_plan')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer relative ${
                  activeTab === 'visit_plan'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <span>拜访计划</span>
                {visitPlanCount > 0 && (
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold font-mono ${
                    activeTab === 'visit_plan' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {visitPlanCount}
                  </span>
                )}
              </button>

              <button
                id="tab-map"
                onClick={() => setActiveTab('map')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>地理分布</span>
              </button>

              <button
                id="tab-analytics"
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>市场图谱</span>
              </button>

              <button
                id="tab-ai"
                onClick={() => setActiveTab('ai')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow-sm'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-slate-700/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI 拓展顾问</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex justify-around items-center shadow-2xl touch-manipulation">
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'directory'
              ? 'text-amber-400 font-bold bg-amber-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">客户信息</span>
        </button>

        <button
          onClick={() => setActiveTab('visit_plan')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] relative ${
            activeTab === 'visit_plan'
              ? 'text-amber-400 font-bold bg-amber-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalendarCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">拜访计划</span>
          {visitPlanCount > 0 && (
            <span className="absolute top-1 right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {visitPlanCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'map'
              ? 'text-amber-400 font-bold bg-amber-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">地理分布</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'analytics'
              ? 'text-amber-400 font-bold bg-amber-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">市场图谱</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'ai'
              ? 'text-amber-300 font-bold bg-amber-500/20'
              : 'text-amber-400/80 hover:text-amber-300'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">AI 顾问</span>
        </button>
      </nav>
    </>
  );
};
