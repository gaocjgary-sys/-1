import React, { useState, useEffect } from 'react';
import { Navbar, NavTabType } from './components/Navbar';
import { ImportersTable } from './components/ImportersTable';
import { CompanyDetailView } from './components/CompanyDetailView';
import { FranceMapVisualizer } from './components/FranceMapVisualizer';
import { MarketInsightsCharts } from './components/MarketInsightsCharts';
import { CroatiaHistoryView } from './components/CroatiaHistoryView';
import { AiAdvisorPanel } from './components/AiAdvisorPanel';
import { VisitPlanView } from './components/VisitPlanView';
import { AddInfoView } from './components/AddInfoView';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from './data/importersData';
import { ImporterCompany, VisitPlanItem } from './types';

const LOCAL_STORAGE_KEY = 'european_tire_visit_plan_v1';
const CUSTOM_IMPORTERS_KEY = 'european_tire_custom_importers_v1';

const getInitialVisitPlan = (): Record<string, VisitPlanItem> => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load visit plan', e);
  }
  return {};
};

const sanitizeCompany = (c: ImporterCompany): ImporterCompany => {
  let countryName = c.country;
  let countryCn = c.countryCn || '法国';
  let countryCode = c.countryCode || 'FR';
  let flagEmoji = c.flagEmoji || '🇫🇷';

  const cLower = `${c.country || ''} ${c.countryCn || ''} ${c.countryCode || ''}`.toLowerCase();
  if (cLower.includes('france') || cLower.includes('法') || c.countryCode === 'FR') {
    countryName = 'France';
    countryCn = '法国';
    countryCode = 'FR';
    flagEmoji = '🇫🇷';
  } else if (cLower.includes('croatia') || cLower.includes('克罗地亚') || c.countryCode === 'HR') {
    countryName = 'Croatia';
    countryCn = '克罗地亚';
    countryCode = 'HR';
    flagEmoji = '🇭🇷';
  } else if (cLower.includes('slovenia') || cLower.includes('斯洛文尼亚') || c.countryCode === 'SI') {
    countryName = 'Slovenia';
    countryCn = '斯洛文尼亚';
    countryCode = 'SI';
    flagEmoji = '🇸🇮';
  } else if (cLower.includes('ukraine') || cLower.includes('乌') || c.countryCode === 'UA') {
    countryName = 'Ukraine';
    countryCn = '乌克兰';
    countryCode = 'UA';
    flagEmoji = '🇺🇦';
  }

  return {
    ...c,
    country: countryName,
    countryCn,
    countryCode,
    flagEmoji,
    chineseSourcingVerified: c.chineseSourcingVerified !== undefined ? c.chineseSourcingVerified : true,
  };
};

const getInitialCustomImporters = (): ImporterCompany[] => {
  try {
    const saved = localStorage.getItem(CUSTOM_IMPORTERS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map(sanitizeCompany);
      }
    }
  } catch (e) {
    console.error('Failed to load custom importers', e);
  }
  return [];
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('directory');
  const [customImporters, setCustomImporters] = useState<ImporterCompany[]>(getInitialCustomImporters);
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

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_IMPORTERS_KEY, JSON.stringify(customImporters));
    } catch (e) {
      console.error('Failed to save custom importers', e);
    }
  }, [customImporters]);

  const handleAddCompany = (newCompany: ImporterCompany) => {
    const sanitized = sanitizeCompany(newCompany);
    setCustomImporters((prev) => [sanitized, ...prev.filter((c) => c.id !== sanitized.id)]);
  };

  const handleRemoveCustomImporter = (id: string) => {
    setCustomImporters((prev) => prev.filter((c) => c.id !== id));
  };

  const importers = [...customImporters, ...ALL_EUROPEAN_TIRE_IMPORTERS];

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

  const handleTabChange = (tab: NavTabType) => {
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
                  onNavigateAddInfo={() => setActiveTab('add_info')}
                  visitPlanMap={visitPlanMap}
                  toggleVisitPlan={toggleVisitPlan}
                />
              )}

              {activeTab === 'add_info' && (
                <AddInfoView
                  onAddCompany={handleAddCompany}
                  onSelectCompany={setSelectedCompany}
                  customImporters={customImporters}
                  onRemoveCustomImporter={handleRemoveCustomImporter}
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
                <FranceMapVisualizer importers={importers} onSelectCompany={setSelectedCompany} />
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
            <span className="font-semibold text-slate-300">欧洲四国（法🇫🇷·克🇭🇷·斯🇸🇮·乌🇺🇦）中国轮胎进口商与关务名录系统</span>
            <span className="ml-2 text-slate-500 hidden sm:inline">• 关务与智搜核验：涵盖已采买中国品牌客户及潜在空白目标客户</span>
          </div>
          <div className="text-slate-500 text-[11px] sm:text-xs">
            行业合规：信息基于海关提单、各国民营车后市场分销网络及公共商业登记数据核定
          </div>
        </div>
      </footer>
    </div>
  );
}

