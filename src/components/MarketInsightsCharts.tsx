import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from '../data/importersData';
import { CountryName } from '../types';
import { BarChart3, PieChartIcon, Globe, Package } from 'lucide-react';

export const MarketInsightsCharts: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryName | 'ALL'>('ALL');

  const filteredImporters = useMemo(() => {
    if (selectedCountry === 'ALL') return ALL_EUROPEAN_TIRE_IMPORTERS;
    return ALL_EUROPEAN_TIRE_IMPORTERS.filter((c) => c.country === selectedCountry);
  }, [selectedCountry]);

  // Volume Data
  const volumeData = useMemo(() => {
    return filteredImporters.map((c) => ({
      name: `${c.flagEmoji} ${c.name.split(' ')[0]}`,
      volume: Math.round((c.annualVolumeNumber / 10000) * 10) / 10, // In 万条
      fullName: c.name,
      country: c.countryCn,
    }));
  }, [filteredImporters]);

  const totalVolumeInWan = useMemo(() => {
    const sum = filteredImporters.reduce((acc, curr) => acc + curr.annualVolumeNumber, 0);
    return Math.round(sum / 10000);
  }, [filteredImporters]);

  // Segment Distribution
  const segmentCount: Record<string, number> = {
    PCR: 0,
    TBR: 0,
    LCV: 0,
    OTR: 0,
    AGRI: 0,
  };

  filteredImporters.forEach((c) => {
    c.segments.forEach((seg) => {
      if (segmentCount[seg] !== undefined) segmentCount[seg]++;
    });
  });

  const segmentPieData = [
    { name: '乘用车胎 (PCR)', value: segmentCount.PCR, color: '#f59e0b' },
    { name: '卡客车胎 (TBR)', value: segmentCount.TBR, color: '#3b82f6' },
    { name: '轻卡/商用胎 (LCV)', value: segmentCount.LCV, color: '#10b981' },
    { name: '农用与工程胎 (OTR/AGRI)', value: segmentCount.OTR + segmentCount.AGRI, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Country Selector Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-sm">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] sm:text-xs text-slate-400 font-semibold px-1.5 flex items-center space-x-1 shrink-0">
            <Globe className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
            <span>范围:</span>
          </span>
          {[
            { id: 'ALL', label: `全部名录 (${ALL_EUROPEAN_TIRE_IMPORTERS.length})`, flag: '🌐' },
            { id: 'France', label: `法国 (${ALL_EUROPEAN_TIRE_IMPORTERS.filter((i) => i.country === 'France').length})`, flag: '🇫🇷' },
            { id: 'Croatia', label: `克罗地亚 (${ALL_EUROPEAN_TIRE_IMPORTERS.filter((i) => i.country === 'Croatia').length})`, flag: '🇭🇷' },
            { id: 'Slovenia', label: `斯洛文尼亚 (${ALL_EUROPEAN_TIRE_IMPORTERS.filter((i) => i.country === 'Slovenia').length})`, flag: '🇸🇮' },
            { id: 'Ukraine', label: `乌克兰 (${ALL_EUROPEAN_TIRE_IMPORTERS.filter((i) => i.country === 'Ukraine').length})`, flag: '🇺🇦' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCountry(tab.id as any)}
              className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap min-h-[36px] ${
                selectedCountry === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="text-sm sm:text-base">{tab.flag}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <span>目标欧洲四国轮胎进口商量化图谱与分销结构</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
          直观展现各国进口商的估算年分销体量（万条/年）与产品线覆盖分布
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Chart 1: Annual Volume Bar Chart */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center space-x-1.5">
              <Package className="w-4 h-4 text-amber-400 shrink-0" />
              <span>年轮胎分销与进口估算总量 (万条)</span>
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 self-start sm:self-auto">
              统计总量 ~{totalVolumeInWan} 万条
            </span>
          </div>

          <div className="h-[280px] sm:h-[340px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  angle={-40}
                  textAnchor="end"
                  interval={volumeData.length > 15 ? 1 : 0}
                />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                  formatter={(value: any) => [`${value} 万条/年`, '估算分销体量']}
                />
                <Bar dataKey="volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Product Line Segment Pie Chart */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center space-x-1.5">
              <PieChartIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>采购品类渗透率分布</span>
            </h3>
          </div>

          <div className="h-[200px] sm:h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                  formatter={(value: any) => [`${value} 家进口商`, '涵盖度']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {segmentPieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium text-[11px] truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
