import React, { useState, useMemo } from 'react';
import { ImporterCompany, TireSegment, FilterState, CountryName, VisitPlanItem } from '../types';
import { Search, ShieldCheck, MapPin, ExternalLink, ChevronRight, Sparkles, Download, Globe, CalendarCheck, CalendarPlus, FileText, PlusCircle } from 'lucide-react';

interface ImportersTableProps {
  importers: ImporterCompany[];
  onSelectCompany: (company: ImporterCompany) => void;
  onOpenAiPitch: (company: ImporterCompany) => void;
  onNavigateCroatiaHistory?: () => void;
  onNavigateAddInfo?: () => void;
  visitPlanMap?: Record<string, VisitPlanItem>;
  toggleVisitPlan?: (companyId: string) => void;
  filters?: FilterState;
  onFiltersChange?: (updater: FilterState | ((prev: FilterState) => FilterState)) => void;
}

export const ImportersTable: React.FC<ImportersTableProps> = ({
  importers,
  onSelectCompany,
  onOpenAiPitch,
  onNavigateCroatiaHistory,
  onNavigateAddInfo,
  visitPlanMap = {},
  toggleVisitPlan,
  filters: propFilters,
  onFiltersChange,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>({
    searchQuery: '',
    country: 'ALL',
    segment: 'ALL',
    region: 'ALL',
    brand: 'ALL',
    tier: 'ALL',
    sortBy: 'rank',
  });

  const filters = propFilters || localFilters;

  const setFilters = (updater: FilterState | ((prev: FilterState) => FilterState)) => {
    if (onFiltersChange) {
      onFiltersChange(updater);
    } else {
      setLocalFilters(updater);
    }
  };

  const handleCountryTabChange = (countryId: CountryName | 'ALL') => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: '',
      country: countryId,
    }));
  };

  const isCountryMatch = (item: ImporterCompany, targetCountry: string) => {
    if (targetCountry === 'ALL') return true;
    if (item.country === targetCountry) return true;
    if (targetCountry === 'France' && (item.countryCn === '法国' || item.countryCode === 'FR')) return true;
    if (targetCountry === 'Croatia' && (item.countryCn === '克罗地亚' || item.countryCode === 'HR')) return true;
    if (targetCountry === 'Slovenia' && (item.countryCn === '斯洛文尼亚' || item.countryCode === 'SI')) return true;
    if (targetCountry === 'Ukraine' && (item.countryCn === '乌克兰' || item.countryCode === 'UA')) return true;
    return false;
  };

  // Filter & Sort
  const filteredImporters = useMemo(() => {
    return importers
      .filter((item) => {
        // Country matching
        if (filters.country !== 'ALL' && !isCountryMatch(item, filters.country)) {
          return false;
        }

        // Search query matching
        const query = filters.searchQuery.trim().toLowerCase();
        if (query) {
          const matchName = item.name.toLowerCase().includes(query);
          const matchFrenchName = item.frenchName.toLowerCase().includes(query);
          const matchCity = item.city.toLowerCase().includes(query);
          const matchCountry = item.countryCn.includes(query) || item.country.toLowerCase().includes(query);
          const matchHsCode = item.hsCode ? item.hsCode.toLowerCase().includes(query) : false;
          const matchBrand = item.verifiedChineseBrands.some(
            (b) => b.brandEn.toLowerCase().includes(query) || b.brandCn.includes(query)
          );
          if (!matchName && !matchFrenchName && !matchCity && !matchBrand && !matchCountry && !matchHsCode) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rank') {
          // If viewing all countries, sort by volume or country then rank
          if (filters.country === 'ALL') {
            return b.annualVolumeNumber - a.annualVolumeNumber;
          }
          return a.rank - b.rank;
        }
        if (filters.sortBy === 'volume') return b.annualVolumeNumber - a.annualVolumeNumber;
        if (filters.sortBy === 'foundedYear') return a.foundedYear - b.foundedYear;
        return 0;
      });
  }, [importers, filters.country, filters.searchQuery, filters.sortBy]);

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      '国家',
      '序号',
      '公司名称',
      '当地注册名称',
      '总部城市',
      '省/大区',
      '创立年份',
      '估计年进口分销规模',
      '采购的中国轮胎品牌',
      '海关编码/HS Code',
      '涵盖品类',
      '仓库面积',
      '官网',
    ];

    const rows = filteredImporters.map((c, index) => [
      `"${c.countryCn}(${c.country})"`,
      index + 1,
      `"${c.name}"`,
      `"${c.frenchName}"`,
      `"${c.city}"`,
      `"${c.region}"`,
      c.foundedYear,
      `"${c.estimatedAnnualVolume}"`,
      `"${c.verifiedChineseBrands.map((b) => `${b.brandEn}(${b.brandCn})`).join(', ')}"`,
      `"${c.hsCode || '4011.10/20'}"`,
      `"${c.segments.join('/')}"`,
      `"${c.warehouseArea}"`,
      `"${c.website}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `欧洲四国中国轮胎进口商及海关名录_${filters.country}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Country Switcher Tabs - Touch Optimized Scrollbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full no-scrollbar py-0.5">
          <span className="text-xs text-slate-400 font-semibold px-1.5 flex items-center shrink-0">
            <Globe className="w-4 h-4 text-amber-400 inline mr-1" />
            <span className="hidden sm:inline">目标国家:</span>
          </span>
          {[
            { id: 'ALL', label: '全部四国', count: importers.length, flag: '🌐' },
            { id: 'France', label: '法国', count: importers.filter(i => isCountryMatch(i, 'France')).length, flag: '🇫🇷' },
            { id: 'Croatia', label: '克罗地亚', count: importers.filter(i => isCountryMatch(i, 'Croatia')).length, flag: '🇭🇷' },
            { id: 'Slovenia', label: '斯洛文尼亚', count: importers.filter(i => isCountryMatch(i, 'Slovenia')).length, flag: '🇸🇮' },
            { id: 'Ukraine', label: '乌克兰', count: importers.filter(i => isCountryMatch(i, 'Ukraine')).length, flag: '🇺🇦' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleCountryTabChange(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                filters.country === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="text-sm sm:text-base">{tab.flag}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filters.country === tab.id ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 px-3 hidden xl:block shrink-0">
          结合海关提单与智搜比对，支持已采买客户及空白目标客户名录建档
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-5 space-y-3 sm:space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="search-importers-input"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="搜索公司、城市、买家、海关编码HS (如 4011, Technoopt, 玲珑)..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 sm:py-2.5 border border-slate-800 focus:outline-none focus:border-amber-500 transition-colors min-h-[44px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onNavigateAddInfo && (
              <button
                onClick={onNavigateAddInfo}
                className="flex items-center justify-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm min-h-[44px] shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>添加信息</span>
              </button>
            )}

            {/* Export Button */}
            <button
              id="export-csv-btn"
              onClick={handleExportCsv}
              className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[44px] shrink-0"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>导出名录 (CSV)</span>
            </button>
          </div>
        </div>

        {/* Filter Pills / Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          {/* Sort By */}
          <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-slate-400 font-medium">排序方式:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-slate-950 text-amber-400 font-medium border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 text-xs min-h-[36px]"
            >
              <option value="rank">默认顺序 (列表顺序)</option>
              <option value="volume">年分销估量 (从高到低)</option>
              <option value="foundedYear">成立年份 (老牌优先)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Strict Filter Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 sm:p-3 flex items-start space-x-2.5 text-[11px] sm:text-xs text-amber-200/90">
        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-tight">
          <span className="font-semibold text-amber-400">海关关务核查：</span>
          法🇫🇷·克🇭🇷·斯🇸🇮·乌🇺🇦进口商均拥有确凿中国轮胎提单采买记录。
        </div>
      </div>

      {/* Companies List Cards */}
      <div className="space-y-3 sm:space-y-4">
        {filteredImporters.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center text-slate-400">
            <p className="text-sm sm:text-base font-semibold text-slate-300">没有找到匹配条件的进口商或海关记录</p>
            <p className="text-xs mt-1">请尝试清除搜索关键字或重置筛选条件</p>
            <button
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  country: 'ALL',
                  segment: 'ALL',
                  region: 'ALL',
                  brand: 'ALL',
                  tier: 'ALL',
                  sortBy: 'rank',
                })
              }
              className="mt-4 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
            >
              重置所有筛选
            </button>
          </div>
        ) : (
          filteredImporters.map((company, index) => (
            <div
              key={company.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 group"
            >
              {/* Company Basic Info: Rank, Flag, Name, Address */}
              <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl font-bold flex items-center justify-center text-sm sm:text-base shrink-0 bg-slate-800 text-amber-400 border border-slate-700 font-mono">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  {/* Company Name */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-base sm:text-lg">{company.flagEmoji}</span>
                    <h3
                      onClick={() => onSelectCompany(company)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 cursor-pointer transition-colors leading-snug truncate"
                    >
                      {company.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">({company.frenchName})</span>
                    <span className="bg-slate-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      {company.countryCn}
                    </span>
                  </div>

                  {/* Company Address */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-300 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-slate-400 font-medium whitespace-nowrap">地址:</span>
                    <span className="text-slate-200 font-medium truncate">{company.address} ({company.city}，{company.region})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                {toggleVisitPlan && (
                  <button
                    id={`btn-visit-plan-${company.id}`}
                    onClick={() => toggleVisitPlan(company.id)}
                    className={`flex items-center justify-center space-x-1 border text-xs font-medium px-3 py-2 rounded-xl transition-all cursor-pointer min-h-[40px] ${
                      visitPlanMap[company.id]
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                    title={visitPlanMap[company.id] ? '已加入拜访计划，点击移除' : '加入拜访计划'}
                  >
                    {visitPlanMap[company.id] ? (
                      <>
                        <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">已在计划</span>
                      </>
                    ) : (
                      <>
                        <CalendarPlus className="w-3.5 h-3.5 text-slate-400" />
                        <span className="hidden sm:inline">+ 拜访计划</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  id={`btn-detail-${company.id}`}
                  onClick={() => onSelectCompany(company)}
                  className="flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer min-h-[40px]"
                >
                  <span>查看详细信息</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
