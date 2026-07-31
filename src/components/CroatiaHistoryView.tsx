import React, { useState, useMemo } from 'react';
import { CROATIA_HISTORICAL_COMPANIES } from '../data/croatiaHistoryData';
import { CroatiaHistoricalCompany } from '../types';
import {
  Search,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Tag,
  PackageCheck
} from 'lucide-react';

interface CroatiaHistoryViewProps {
  onOpenAiPitch?: (companyName: string) => void;
}

export const CroatiaHistoryView: React.FC<CroatiaHistoryViewProps> = ({ onOpenAiPitch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [onlyChineseBrands, setOnlyChineseBrands] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Unique cities list
  const cities = useMemo(() => {
    const list = Array.from(new Set(CROATIA_HISTORICAL_COMPANIES.map((item) => item.city)));
    return ['ALL', ...list];
  }, []);

  // Filtering
  const filteredData = useMemo(() => {
    return CROATIA_HISTORICAL_COMPANIES.filter((item) => {
      // City filter
      if (selectedCity !== 'ALL' && item.city !== selectedCity) return false;

      // Only Chinese brands filter
      if (onlyChineseBrands && item.chineseBrands.length === 0) return false;

      // Search query filter
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        const matchCity = item.city.toLowerCase().includes(q);
        const matchAddress = item.address.toLowerCase().includes(q);
        const matchPhone = item.phone.toLowerCase().includes(q);
        const matchEmail = item.email.toLowerCase().includes(q);
        const matchBrands = item.brands.some((b) => b.toLowerCase().includes(q));
        const matchBestSellers = item.bestSellers?.toLowerCase().includes(q);

        if (!matchName && !matchCity && !matchAddress && !matchPhone && !matchEmail && !matchBrands && !matchBestSellers) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCity, onlyChineseBrands]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['公司', '城市', '网站', '电话', '邮箱', '地址', '品牌', '畅销规格'];
    const rows = filteredData.map((c) => [
      `"${c.name}"`,
      `"${c.city}"`,
      `"${c.website}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.address}"`,
      `"${c.brands.join('/')}"`,
      `"${c.bestSellers || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', '克罗地亚公司历史资料名录.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl">🇭🇷</span>
            <h1 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight">
              克罗地亚公司历史资料 (Croatia Historical Data)
            </h1>
            <span className="bg-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
              全量 21 家历史档案
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
            完整整合萨格勒布、斯普利特、里耶卡、奥西耶克及扎达尔地区的轮胎分销、零售与售后服务企业历史名册（含联系人、畅销规格及代售品牌）。
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 min-h-[42px] w-full md:w-auto"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>导出 CSV 表格</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索公司、城市、电话、邮箱、品牌或畅销规格 (如 Triangle, 205/55R16)..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* City Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto">
            <span className="text-xs text-slate-400 font-medium px-1 shrink-0">城市筛选:</span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCity === city
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {city === 'ALL' ? '全部城市 (21)' : `${city} (${CROATIA_HISTORICAL_COMPANIES.filter((c) => c.city === city).length})`}
              </button>
            ))}
          </div>

          {/* Chinese Brand Filter Toggle */}
          <button
            onClick={() => setOnlyChineseBrands(!onlyChineseBrands)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 border ${
              onlyChineseBrands
                ? 'bg-red-500/20 text-red-400 border-red-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>高亮/仅看中国轮胎代理商</span>
          </button>
        </div>
      </div>

      {/* Main Historical Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4 min-w-[180px]">公司名称</th>
                <th className="py-3.5 px-4 min-w-[90px]">城市</th>
                <th className="py-3.5 px-4 min-w-[150px]">官方网站</th>
                <th className="py-3.5 px-4 min-w-[130px]">电话</th>
                <th className="py-3.5 px-4 min-w-[170px]">电子邮箱</th>
                <th className="py-3.5 px-4 min-w-[220px]">地址</th>
                <th className="py-3.5 px-4 min-w-[180px]">品牌阵营</th>
                <th className="py-3.5 px-4 min-w-[180px]">畅销轮胎规格</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    未检索到符合条件的克罗地亚历史公司记录，请调整筛选关键词
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => {
                  const hasChineseBrand = item.chineseBrands.length > 0;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/60 transition-colors ${
                        hasChineseBrand ? 'bg-amber-500/[0.03]' : ''
                      }`}
                    >
                      {/* Row # */}
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        {index + 1}
                      </td>

                      {/* Company Name */}
                      <td className="py-4 px-4 font-bold text-white">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-slate-100 flex items-center space-x-1.5">
                            <Building className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                            <span>{item.name}</span>
                          </span>
                          {hasChineseBrand && (
                            <span className="inline-flex items-center text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-medium w-fit">
                              已引入中国轮胎
                            </span>
                          )}
                        </div>
                      </td>

                      {/* City */}
                      <td className="py-4 px-4 font-semibold text-slate-300">
                        <span className="inline-flex items-center space-x-1 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-slate-200">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{item.city}</span>
                        </span>
                      </td>

                      {/* Website */}
                      <td className="py-4 px-4">
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 underline flex items-center space-x-1 break-all transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[140px]">{item.website.replace('https://', '').replace('http://', '')}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 text-slate-300 font-mono">
                        <a
                          href={`tel:${item.phone}`}
                          className="hover:text-amber-400 transition-colors flex items-center space-x-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.phone}</span>
                        </a>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4">
                        {item.email ? (
                          <div className="flex items-center space-x-1.5">
                            <a
                              href={`mailto:${item.email}`}
                              className="text-emerald-400 hover:text-emerald-300 transition-colors truncate max-w-[140px] font-mono"
                            >
                              {item.email}
                            </a>
                            <button
                              onClick={() => handleCopy(item.email, `email-${item.id}`)}
                              title="复制邮箱"
                              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                            >
                              {copiedId === `email-${item.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-500 font-mono">-</span>
                        )}
                      </td>

                      {/* Address */}
                      <td className="py-4 px-4 text-slate-400 leading-relaxed max-w-[220px]">
                        {item.address}
                      </td>

                      {/* Brands */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.brands.map((b) => {
                            const isChinese = ['Triangle', 'NanKang', 'Hifly', 'Aeolus', 'Windpower'].some(
                              (cb) => b.toLowerCase().includes(cb.toLowerCase())
                            );
                            return (
                              <span
                                key={b}
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  isChinese
                                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                                    : 'bg-slate-950 text-slate-300 border border-slate-800'
                                }`}
                              >
                                {b}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Best Sellers */}
                      <td className="py-4 px-4 font-mono text-slate-300">
                        {item.bestSellers ? (
                          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[11px] text-emerald-300 block">
                            {item.bestSellers}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <PackageCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white">数据源说明：</span>
            本页收录克罗地亚当地 21 家主流轮胎经销商历史黄页档案，重点标明其代售的中国品牌（如 Triangle三角、Hifly海福莱、NanKang南港、Aeolus风神、Windpower风力等）与畅销产品规格。
          </div>
        </div>

        <div className="text-amber-400 font-semibold shrink-0">
          共计 21 家企业历史档案
        </div>
      </div>
    </div>
  );
};
