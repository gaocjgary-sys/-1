import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ImportersTable } from './components/ImportersTable';
import { CompanyDetailView } from './components/CompanyDetailView';
import { FranceMapVisualizer } from './components/FranceMapVisualizer';
import { MarketInsightsCharts } from './components/MarketInsightsCharts';
import { CroatiaHistoryView } from './components/CroatiaHistoryView';
import { AiAdvisorPanel } from './components/AiAdvisorPanel';
import { VisitPlanView } from './components/VisitPlanView';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from './data/importersData';
import { ImporterCompany, VisitPlanItem } from './types';

const LOCAL_STORAGE_KEY = 'european_tire_visit_plan_v1';

const getInitialVisitPlan = (): Record<string, VisitPlanItem> => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load visit plan', e);
  }
  return {};
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'map' | 'analytics' | 'croatia_history' | 'ai' | 'visit_plan'>('directory');
  const [importers] = useState<ImporterCompany[]>(ALL_EUROPEAN_TIRE_IMPORTERS);
  const [selectedCompany, setSelectedCompany] = useState<ImporterCompany | null>(null);
  const [pitchCompany, setPitchCompany] = useState<ImporterCompany | null>(null);
  const [visitPlanMap, setVisitPlanMap] = useState<Record<string, VisitPlanItem>>(getInitialVisitPlan);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visitPlanMap));
    } catch (e) {
      console.error('Failed to save visit plan', e);
    }
  }, [visitPlanMap]);

  const toggleVisitPlan = (companyId: string) => {
    setVisitPlanMap((prev) => {
      const next = { ...prev };
      if (next[companyId]) {
        delete next[companyId];
      } else {
        next[companyId] = {
          companyId,
          addedAt: new Date().toISOString(),
          priority: 'HIGH',
          status: 'PLANNED',
        };
      }
      return next;
    });
  };

  const updateVisitPlanItem = (companyId: string, updates: Partial<VisitPlanItem>) => {
    setVisitPlanMap((prev) => {
      if (!prev[companyId]) return prev;
      return {
        ...prev,
        [companyId]: {
          ...prev[companyId],
          ...updates,
        },
      };
    });
  };

  const handleOpenAiPitch = (company: ImporterCompany) => {
    setPitchCompany(company);
    setActiveTab('ai');
  };

  const handleTabChange = (tab: 'directory' | 'map' | 'analytics' | 'croatia_history' | 'ai' | 'visit_plan') => {
    setSelectedCompany(null);
    setActiveTab(tab);
  };

  const visitPlanCount = Object.keys(visitPlanMap).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          visitPlanCount={visitPlanCount}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8">
          {selectedCompany ? (
            <CompanyDetailView
              company={selectedCompany}
              onBack={() => setSelectedCompany(null)}
              onOpenAiPitch={handleOpenAiPitch}
              visitPlanMap={visitPlanMap}
              toggleVisitPlan={toggleVisitPlan}
            />
          ) : (
            <>
              {activeTab === 'directory' && (
                <ImportersTable
                  importers={importers}
                  onSelectCompany={setSelectedCompany}
                  onOpenAiPitch={handleOpenAiPitch}
                  onNavigateCroatiaHistory={() => setActiveTab('croatia_history')}
                  visitPlanMap={visitPlanMap}
                  toggleVisitPlan={toggleVisitPlan}
                />
              )}

              {activeTab === 'visit_plan' && (
                <VisitPlanView
                  visitPlanMap={visitPlanMap}
                  toggleVisitPlan={toggleVisitPlan}
                  updateVisitPlanItem={updateVisitPlanItem}
                  onSelectCompany={setSelectedCompany}
                  onOpenAiPitch={handleOpenAiPitch}
                />
              )}

              {activeTab === 'map' && (
                <FranceMapVisualizer onSelectCompany={setSelectedCompany} />
              )}

              {activeTab === 'analytics' && <MarketInsightsCharts />}

              {activeTab === 'croatia_history' && <CroatiaHistoryView />}

              {activeTab === 'ai' && (
                <AiAdvisorPanel selectedCompanyForPitch={pitchCompany} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs text-center pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-300">欧洲五国（法🇫🇷·克🇭🇷·斯🇸🇮·俄🇷🇺·乌🇺🇦）中国轮胎进口商与关务名录系统</span>
            <span className="ml-2 text-slate-500 hidden sm:inline">• 关务流水核验：无中国轮胎采买记录者严格不入榜</span>
          </div>
          <div className="text-slate-500 text-[11px] sm:text-xs">
            行业合规：信息基于海关提单、各国民营车后市场分销网络及公共商业登记数据核定
          </div>
        </div>
      </footer>
    </div>
  );
}

