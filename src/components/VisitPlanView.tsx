import React, { useState } from 'react';
import { ImporterCompany, VisitPlanItem, VisitPriority, VisitStatus } from '../types';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from '../data/importersData';
import {
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  Trash2,
  ChevronRight,
  Download,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Compass,
  Tag
} from 'lucide-react';

interface VisitPlanViewProps {
  visitPlanMap: Record<string, VisitPlanItem>;
  toggleVisitPlan: (companyId: string) => void;
  updateVisitPlanItem: (companyId: string, updates: Partial<VisitPlanItem>) => void;
  onSelectCompany: (company: ImporterCompany) => void;
  onOpenAiPitch: (company: ImporterCompany) => void;
}

export const VisitPlanView: React.FC<VisitPlanViewProps> = ({
  visitPlanMap,
  toggleVisitPlan,
  updateVisitPlanItem,
  onSelectCompany,
  onOpenAiPitch,
}) => {
  const [filterCountry, setFilterCountry] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'rank' | 'volume'>('priority');

  // Convert map to array with populated company data
  const planItemsWithData = (Object.values(visitPlanMap) as VisitPlanItem[])
    .map((item) => {
      const company = ALL_EUROPEAN_TIRE_IMPORTERS.find((c) => c.id === item.companyId);
      return { item, company };
    })
    .filter((x): x is { item: VisitPlanItem; company: ImporterCompany } => x.company !== undefined);

  // Filter items
  const filteredItems = planItemsWithData.filter(({ company, item }) => {
    if (filterCountry !== 'ALL' && company.country !== filterCountry) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  // Priority numerical weights
  const priorityWeight: Record<VisitPriority, number> = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  // Sort items
  filteredItems.sort((a, b) => {
    if (sortBy === 'priority') {
      return priorityWeight[b.item.priority] - priorityWeight[a.item.priority];
    }
    if (sortBy === 'date') {
      const dateA = a.item.visitDate || '9999-99-99';
      const dateB = b.item.visitDate || '9999-99-99';
      return dateA.localeCompare(dateB);
    }
    if (sortBy === 'rank') {
      return a.company.rank - b.company.rank;
    }
    if (sortBy === 'volume') {
      return b.company.annualVolumeNumber - a.company.annualVolumeNumber;
    }
    return 0;
  });

  // Calculate stats
  const totalCount = planItemsWithData.length;
  const franceCount = planItemsWithData.filter((x) => x.company.country === 'France').length;
  const croatiaCount = planItemsWithData.filter((x) => x.company.country === 'Croatia').length;
  const sloveniaCount = planItemsWithData.filter((x) => x.company.country === 'Slovenia').length;
  const highPriorityCount = planItemsWithData.filter((x) => x.item.priority === 'HIGH').length;

  // Add default top importers if plan is empty
  const handleAddDefaultTopImporters = () => {
    const topPicks = ['distri-cash-fr', 'tokic-bartog-hr', 'bartog-si', 'ciaak-auto-hr', 'euroton-si'];
    topPicks.forEach((id) => {
      if (!visitPlanMap[id]) {
        toggleVisitPlan(id);
      }
    });
  };

  // Export Itinerary as formatted TXT file
  const handleExportItinerary = () => {
    if (planItemsWithData.length === 0) return;

    let content = `===================================================\n`;
    content += `  欧洲三国（法国/克罗地亚/斯洛文尼亚）实地商务拜访行程单\n`;
    content += `  生成时间: ${new Date().toLocaleDateString('zh-CN')}  |  目标客户总数: ${planItemsWithData.length} 家\n`;
    content += `===================================================\n\n`;

    filteredItems.forEach(({ company, item }, idx) => {
      content += `${idx + 1}. [${company.flagEmoji} ${company.countryCn}] ${company.name} (${company.frenchName})\n`;
      content += `   渠道层级: ${company.distributorTier || '未标注'}\n`;
      content += `   预计拜访日期: ${item.visitDate || '待定'}\n`;
      content += `   优先级: ${item.priority === 'HIGH' ? '高 (High)' : item.priority === 'MEDIUM' ? '中 (Medium)' : '低 (Low)'}\n`;
      content += `   拜访状态: ${item.status}\n`;
      content += `   地址: ${company.address}\n`;
      content += `   联系电话: ${company.phone} | 邮箱: ${company.email}\n`;
      content += `   年采购规模: ${company.estimatedAnnualVolume}\n`;
      content += `   主要采买中国品牌: ${company.verifiedChineseBrands.map((b) => b.brandEn).join(', ')}\n`;
      if (item.notes) {
        content += `   拜访备注/沟通要点: ${item.notes}\n`;
      }
      content += `---------------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `欧洲轮胎进口商拜访行程单_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 p-1.5 sm:p-2 rounded-xl text-slate-950 font-bold shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight">
                欧洲核心轮胎进口商 — 商务拜访行程计划
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed">
              规划欧洲出海行程：为出差欧洲（法国🇫🇷、克罗地亚🇭🇷、斯洛文尼亚🇸🇮）安排实地拜访路线，记录拜访日期与沟通要点。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 pt-1 lg:pt-0">
            {totalCount > 0 ? (
              <button
                onClick={handleExportItinerary}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer min-h-[42px] w-full sm:w-auto justify-center"
              >
                <Download className="w-4 h-4" />
                <span>导出拜访行程单 (.TXT)</span>
              </button>
            ) : (
              <button
                onClick={handleAddDefaultTopImporters}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer min-h-[42px] w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>一键导入欧洲 Top 5 重点目标客户</span>
              </button>
            )}
          </div>
        </div>

        {/* Plan Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block">拜访公司总数</span>
            <span className="text-base sm:text-lg font-bold text-amber-400 font-mono">{totalCount} 家</span>
          </div>
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block">高优先级客户</span>
            <span className="text-base sm:text-lg font-bold text-rose-400 font-mono">{highPriorityCount} 家</span>
          </div>
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block">法国目标</span>
            <span className="text-base sm:text-lg font-bold text-slate-200 font-mono">🇫🇷 {franceCount} 家</span>
          </div>
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block">克罗地亚目标</span>
            <span className="text-base sm:text-lg font-bold text-slate-200 font-mono">🇭🇷 {croatiaCount} 家</span>
          </div>
          <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block">斯洛文尼亚目标</span>
            <span className="text-base sm:text-lg font-bold text-slate-200 font-mono">🇸🇮 {sloveniaCount} 家</span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
          {/* Country Filter */}
          <div className="flex items-center space-x-1.5 flex-1 sm:flex-none">
            <span className="text-slate-400 font-medium whitespace-nowrap">国家:</span>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 text-xs w-full sm:w-auto min-h-[36px]"
            >
              <option value="ALL">全部国家 ({totalCount})</option>
              <option value="France">法国 ({franceCount})</option>
              <option value="Croatia">克罗地亚 ({croatiaCount})</option>
              <option value="Slovenia">斯洛文尼亚 ({sloveniaCount})</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 flex-1 sm:flex-none">
            <span className="text-slate-400 font-medium whitespace-nowrap">状态:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 text-xs w-full sm:w-auto min-h-[36px]"
            >
              <option value="ALL">全部状态</option>
              <option value="PLANNED">📅 计划拜访</option>
              <option value="CONTACTED">📞 待联系</option>
              <option value="CONFIRMED">🤝 已确认会议</option>
              <option value="VISITED">✅ 已拜访完成</option>
              <option value="FOLLOWUP">📝 需跟进</option>
              <option value="POSTPONED">⏸️ 暂缓/推迟</option>
            </select>
          </div>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs w-full md:w-auto justify-between md:justify-end">
          <span className="text-slate-400 font-medium whitespace-nowrap">排序:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 text-xs min-h-[36px]"
          >
            <option value="priority">按优先级 (高 → 低)</option>
            <option value="date">按拜访日期</option>
            <option value="rank">按公司排名</option>
            <option value="volume">按年采购量</option>
          </select>
        </div>
      </div>

      {/* Main Visit List Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center text-slate-400 space-y-3">
          <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm sm:text-base font-bold text-slate-200">拜访计划列表为空</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            请在【客户信息】名录、地图或品牌矩阵中，点击任何进口商卡片上的“+ 拜访计划”按钮，即可将其收藏并编入您的欧洲拜访日程。
          </p>
          <button
            onClick={handleAddDefaultTopImporters}
            className="mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5 min-h-[42px]"
          >
            <Plus className="w-4 h-4" />
            <span>添加推荐的前 5 大核心进口商</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filteredItems.map(({ company, item }, index) => (
            <div
              key={company.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-6 transition-all shadow-sm space-y-3 sm:space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-center text-xs font-mono shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <span className="text-base">{company.flagEmoji}</span>
                      <h3
                        onClick={() => onSelectCompany(company)}
                        className="text-sm sm:text-base font-bold text-white hover:text-amber-400 cursor-pointer transition-colors leading-tight"
                      >
                        {company.name}
                      </h3>
                      {company.distributorTier && (
                        <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-500/30 shrink-0">
                          {company.distributorTier}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span>{company.countryCn} ({company.city})</span>
                      <span>• 仓储 {company.warehouseArea}</span>
                      <span className="text-amber-300 font-semibold">• {company.estimatedAnnualVolume}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => toggleVisitPlan(company.id)}
                    className="flex items-center space-x-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px]"
                    title="从拜访计划中移除"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>移出行程</span>
                  </button>
                </div>
              </div>

              {/* Schedule Form Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 text-xs">
                {/* Visit Date */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>拟定拜访日期:</span>
                  </label>
                  <input
                    type="date"
                    value={item.visitDate || ''}
                    onChange={(e) => updateVisitPlanItem(company.id, { visitDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs min-h-[38px]"
                  />
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium flex items-center space-x-1">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>拜访优先级:</span>
                  </label>
                  <select
                    value={item.priority}
                    onChange={(e) => updateVisitPlanItem(company.id, { priority: e.target.value as VisitPriority })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs min-h-[38px]"
                  >
                    <option value="HIGH">🔥 高 (High)</option>
                    <option value="MEDIUM">⚡ 中 (Medium)</option>
                    <option value="LOW">☕ 低 (Low)</option>
                  </select>
                </div>

                {/* Visit Status */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>对接进度:</span>
                  </label>
                  <select
                    value={item.status}
                    onChange={(e) => updateVisitPlanItem(company.id, { status: e.target.value as VisitStatus })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs min-h-[38px]"
                  >
                    <option value="PLANNED">📅 计划拜访</option>
                    <option value="CONTACTED">📞 待联系</option>
                    <option value="CONFIRMED">🤝 已确认会议</option>
                    <option value="VISITED">✅ 已拜访完成</option>
                    <option value="FOLLOWUP">📝 需跟进</option>
                    <option value="POSTPONED">⏸️ 暂缓/推迟</option>
                  </select>
                </div>

                {/* Notes Input */}
                <div className="sm:col-span-3 space-y-1 pt-1">
                  <label className="text-slate-400 font-medium flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>拜访准备与沟通要点:</span>
                  </label>
                  <textarea
                    rows={2}
                    value={item.notes || ''}
                    placeholder="输入拟推荐品牌、花纹、订货起订量或拜访联系人备注..."
                    onChange={(e) => updateVisitPlanItem(company.id, { notes: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 sm:p-2.5 text-slate-200 focus:outline-none focus:border-amber-500 placeholder-slate-600 text-xs"
                  />
                </div>
              </div>

              {/* Verified Brands & Action Footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs pt-1">
                <div className="flex flex-wrap items-center gap-1 text-slate-400 text-[11px]">
                  <span>采买中国品牌:</span>
                  {company.verifiedChineseBrands.map((b) => (
                    <span
                      key={b.brandEn}
                      className="bg-slate-800 text-amber-300 px-1.5 py-0.2 rounded font-medium border border-slate-700 text-[10px]"
                    >
                      {b.brandEn}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                  <button
                    onClick={() => onOpenAiPitch(company)}
                    className="flex items-center justify-center space-x-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium text-xs min-h-[40px]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>AI 拜访提案</span>
                  </button>

                  <button
                    onClick={() => onSelectCompany(company)}
                    className="flex items-center justify-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer font-medium text-xs min-h-[40px]"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>查看档案</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
