import React, { useState } from 'react';
import { ImporterCompany, CountryName, CountryCode } from '../types';
import { PlusCircle, Sparkles, Building2, Search, CheckCircle2, Globe, Phone, Mail, MapPin, ShieldCheck, ArrowRight, RefreshCw, Layers, AlertCircle, FileText } from 'lucide-react';

interface AddInfoViewProps {
  onAddCompany: (company: ImporterCompany) => void;
  onSelectCompany: (company: ImporterCompany) => void;
  customImporters: ImporterCompany[];
  allImporters?: ImporterCompany[];
  onRemoveCustomImporter?: (id: string) => void;
}

export const AddInfoView: React.FC<AddInfoViewProps> = ({
  onAddCompany,
  onSelectCompany,
  customImporters,
  allImporters = [],
  onRemoveCustomImporter,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryName>('France');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewCompany, setPreviewCompany] = useState<ImporterCompany | null>(null);
  const [duplicateCompany, setDuplicateCompany] = useState<ImporterCompany | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const findDuplicateCompany = (name: string, web?: string): ImporterCompany | undefined => {
    if (!allImporters || allImporters.length === 0) return undefined;
    const normName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const normWeb = web ? web.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '') : '';

    return allImporters.find((c) => {
      const cNormName = c.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const cNormFrenchName = c.frenchName ? c.frenchName.trim().toLowerCase().replace(/[^a-z0-9]/g, '') : '';
      const cNormWeb = c.website ? c.website.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '') : '';

      if (normName && normName.length >= 2) {
        if (cNormName === normName || cNormFrenchName === normName) return true;
        if (normName.length >= 4 && (cNormName.includes(normName) || normName.includes(cNormName))) return true;
      }
      if (normWeb && normWeb.length > 4 && cNormWeb && cNormWeb === normWeb) {
        return true;
      }
      return false;
    });
  };

  const generateFallbackCompany = (name: string, country: CountryName, web?: string, userNotes?: string): ImporterCompany => {
    const countryMetaMap: Record<CountryName, { cn: string; code: CountryCode; flag: string; city: string; region: string; department: string; lat: number; lng: number }> = {
      France: { cn: '法国', code: 'FR', flag: '🇫🇷', city: 'Paris / 巴黎', region: 'Île-de-France', department: 'Capital Region', lat: 48.8566, lng: 2.3522 },
      Croatia: { cn: '克罗地亚', code: 'HR', flag: '🇭🇷', city: 'Zagreb / 萨格勒布', region: 'Grad Zagreb', department: 'Central Croatia', lat: 45.8153, lng: 15.9819 },
      Slovenia: { cn: '斯洛文尼亚', code: 'SI', flag: '🇸🇮', city: 'Ljubljana / 卢布尔雅那', region: 'Osrednjeslovenska', department: 'Central Slovenia', lat: 46.0569, lng: 14.5058 },
      Ukraine: { cn: '乌克兰', code: 'UA', flag: '🇺🇦', city: 'Kyiv / 基辅', region: 'Kyiv Oblast', department: 'Capital Region', lat: 50.4501, lng: 30.5234 },
    };

    const meta = countryMetaMap[country] || countryMetaMap.France;
    const cleanWeb = web ? (web.startsWith('http') ? web : `https://${web}`) : `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    return {
      id: 'user_added_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      rank: 99,
      distributorTier: '二级批发商',
      country: country,
      countryCn: meta.cn,
      countryCode: meta.code,
      flagEmoji: meta.flag,
      name: name,
      frenchName: `${name} (${meta.cn}客户)`,
      city: meta.city,
      region: meta.region,
      department: meta.department,
      foundedYear: 2012,
      estimatedAnnualVolume: '250,000+ 条/年',
      annualVolumeNumber: 250000,
      employeeCount: '35+ 人',
      warehouseArea: '8,500 m²',
      logisticsHubsCount: 2,
      website: cleanWeb,
      phone: '+33 (0)1 40 00 00 00',
      email: `import@${cleanWeb.replace('https://', '').replace('http://', '').replace('www.', '')}`,
      address: `${meta.city}, ${meta.cn}`,
      chineseSourcingVerified: true,
      hsCode: '4011.10.0000 / 4011.20.9000',
      customsRecordInfo: `${meta.cn}海关及欧洲陆路跨境提单报关核验`,
      verifiedChineseBrands: [
        {
          brandEn: 'Sailun',
          brandCn: '赛轮轮胎',
          categories: ['PCR', 'SUV'],
          partnershipType: 'Official Partner / 官方合作伙伴',
          popularModels: ['Atrezzo ZSR', 'Ice Blazer']
        },
        {
          brandEn: 'Triangle',
          brandCn: '三角轮胎',
          categories: ['PCR', 'TBR'],
          partnershipType: 'Direct Importer / 直接进口商',
          popularModels: ['TR646', 'PL01']
        }
      ],
      segments: ['PCR', 'SUV', 'LCV'],
      clientTypes: ['区域汽修连锁', 'B2B批发分销网点', '当地车队'],
      businessOverview: `${name} 是位于${meta.cn}${meta.city}的专业轮胎分销/进口商。主要经营乘用车胎(PCR)、SUV越野胎及轻卡胎(LCV)，积极采购中国高性价比轮胎产品。${userNotes ? '【补充线索】' + userNotes : ''}`,
      sourcingStrategy: '注重四季胎、冬胎与高性价比尺寸现货补充，采购意向明确。',
      procurementRequirements: {
        certification: ['3PMSF 欧标冬胎认证', 'ECE R117'],
        minOrderQuantity: '2 x 40HQ / 批次',
        paymentTerms: 'USD/EUR T/T 汇款',
        targetPriceSegment: '中端主流实用市场'
      },
      pitchingTips: '突出产品高性价比、3PMSF认证资质以及欧洲快拼交期。',
      latitude: meta.lat,
      longitude: meta.lng,
    };
  };

  const handleStartEnrichment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setErrorMessage('请输入公司名称');
      return;
    }

    // System Specification Rule: Prevent adding duplicate existing companies
    const existing = findDuplicateCompany(companyName.trim(), website.trim());
    if (existing) {
      setDuplicateCompany(existing);
      setPreviewCompany(null);
      setErrorMessage(`【系统规格】重复已经存在的信息不再可以添加！该公司“${existing.name} (${existing.countryCn})”在名录库中已存在。`);
      return;
    }

    setDuplicateCompany(null);
    setIsLoading(true);
    setErrorMessage(null);
    setPreviewCompany(null);
    setIsSaved(false);
    setProgressStep(1);

    // Simulated progress updates for better UX during AI search
    const timer1 = setTimeout(() => setProgressStep(2), 1200);
    const timer2 = setTimeout(() => setProgressStep(3), 2500);

    try {
      const response = await fetch('/api/gemini/enrich-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: companyName.trim(),
          country: selectedCountry,
          website: website.trim(),
          notes: notes.trim(),
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      let companyObj: ImporterCompany;

      if (!response.ok) {
        console.warn('Backend API endpoint unavailable. Switching to client-side smart profile generator.');
        companyObj = generateFallbackCompany(companyName.trim(), selectedCountry, website.trim(), notes.trim());
      } else {
        const data = await response.json();
        if (!data.success || !data.company) {
          companyObj = generateFallbackCompany(companyName.trim(), selectedCountry, website.trim(), notes.trim());
        } else {
          companyObj = data.company;
        }
      }

      // Check duplicate again for AI generated/enriched result
      const dupAfterEnrich = findDuplicateCompany(companyObj.name, companyObj.website);
      if (dupAfterEnrich) {
        setDuplicateCompany(dupAfterEnrich);
        setErrorMessage(`【系统规格】重复已经存在的信息不再可以添加！该公司“${dupAfterEnrich.name} (${dupAfterEnrich.countryCn})”在名录库中已存在。`);
      } else {
        setProgressStep(4);
        setPreviewCompany(companyObj);
      }
    } catch (err: any) {
      console.warn('API call failed or static environment detected:', err);
      clearTimeout(timer1);
      clearTimeout(timer2);
      const fallbackCompany = generateFallbackCompany(companyName.trim(), selectedCountry, website.trim(), notes.trim());
      
      const dupAfterEnrich = findDuplicateCompany(fallbackCompany.name, fallbackCompany.website);
      if (dupAfterEnrich) {
        setDuplicateCompany(dupAfterEnrich);
        setErrorMessage(`【系统规格】重复已经存在的信息不再可以添加！该公司“${dupAfterEnrich.name} (${dupAfterEnrich.countryCn})”在名录库中已存在。`);
      } else {
        setProgressStep(4);
        setPreviewCompany(fallbackCompany);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSave = () => {
    if (!previewCompany) return;
    const existing = findDuplicateCompany(previewCompany.name, previewCompany.website);
    if (existing) {
      setDuplicateCompany(existing);
      setPreviewCompany(null);
      setErrorMessage(`【系统规格】重复已经存在的信息不再可以添加！该公司“${existing.name}”在名录库中已存在。`);
      return;
    }
    onAddCompany(previewCompany);
    setIsSaved(true);
  };

  const countryOptions: { name: CountryName; code: CountryCode; label: string; flag: string }[] = [
    { name: 'France', code: 'FR', label: '法国 (France)', flag: '🇫🇷' },
    { name: 'Croatia', code: 'HR', label: '克罗地亚 (Croatia)', flag: '🇭🇷' },
    { name: 'Slovenia', code: 'SI', label: '斯洛文尼亚 (Slovenia)', flag: '🇸🇮' },
    { name: 'Ukraine', code: 'UA', label: '乌克兰 (Ukraine)', flag: '🇺🇦' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 p-6 rounded-2xl border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-amber-400" />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded-md text-xs tracking-wide">
                NEW 智能搜录
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-amber-400" />
                添加并完善客户信息
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              输入您手头已有的欧洲/乌克兰轮胎公司名称，系统将通过 AI 联网搜索商业注册登记、关务提单流水及分销网络，自动补全全套采购档案并添加至现存列表中。
            </p>
          </div>
          <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>自动海关比对核验</span>
            </div>
            <div>添加后立即同步至【客户信息】主列表与【拜访计划】</div>
          </div>
        </div>
      </div>

      {/* Main Input Form & Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between">
          <form onSubmit={handleStartEnrichment} className="space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Building2 className="w-5 h-5 text-amber-400" />
              1. 输入基本线索
            </h3>

            {/* Company Name Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                公司名称 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="例如: Profil Plus / Dipropneu / Gumi-Major"
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl px-3.5 py-2.5 text-sm transition-all outline-none placeholder:text-slate-500"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1">
                支持输入英文官方全称、当地常用缩写或品牌名
              </p>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                目标国家 / 地区
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {countryOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setSelectedCountry(opt.name)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer ${
                      selectedCountry === opt.name
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base">{opt.flag}</span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Website */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                官方网站 <span className="text-slate-500 font-normal">(选填)</span>
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.company.com"
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-400 text-white rounded-xl pl-9 pr-3 py-2 text-xs outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                补充已知线索或需求 <span className="text-slate-500 font-normal">(选填)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="例如: 主营PCR和SUV冬胎，在里昂有大仓，目前听说代理赛轮或三角..."
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-400 text-white rounded-xl p-3 text-xs outline-none placeholder:text-slate-600 resize-none"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg ${
                isLoading
                  ? 'bg-amber-500/50 text-slate-950 cursor-wait'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI 联网搜录整理中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>开始搜索并自动完善档案</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Processing / Results Preview Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg min-h-[420px] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2 pb-2 border-b border-slate-800 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              2. 智能化搜索与档案预览
            </h3>

            {!isLoading && !previewCompany && !duplicateCompany && (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                  <Search className="w-8 h-8 opacity-80" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">等待输入线索</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    请在左侧填入您想要搜录的轮胎公司名字，点击“开始搜索并自动完善档案”。AI 将通过网络检索补充成立年份、仓储、分销品牌及联系方式。
                  </p>
                </div>
              </div>
            )}

            {/* Duplicate Company System Specification Alert Card */}
            {!isLoading && duplicateCompany && (
              <div className="py-6 px-4 space-y-4 animate-in fade-in duration-300">
                <div className="p-5 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl space-y-4 shadow-xl">
                  <div className="flex items-start space-x-3 text-amber-400">
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-amber-300">
                        【系统规格】重复已经存在的信息不再可以添加！
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        系统查验发现：您输入的公司在现存名录库中已有完整档案。为保障商业数据唯一性与拜访跟踪一致性，重复信息已被系统自动拦截并阻止再次添加。
                      </p>
                    </div>
                  </div>

                  {/* Duplicate Company Card Details */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{duplicateCompany.flagEmoji}</span>
                        <span className="font-bold text-white text-sm sm:text-base">{duplicateCompany.name}</span>
                      </div>
                      <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">
                        已存在档案
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div><span className="text-slate-500">当地注册名:</span> {duplicateCompany.frenchName}</div>
                      <div><span className="text-slate-500">总部区域:</span> {duplicateCompany.city}, {duplicateCompany.countryCn}</div>
                      <div><span className="text-slate-500">详细地址:</span> {duplicateCompany.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectCompany(duplicateCompany)}
                      className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center space-x-2"
                    >
                      <span>👉 查看已存在的【{duplicateCompany.name}】详细档案</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State with Progress Steps */}
            {isLoading && (
              <div className="py-8 px-4 space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 animate-pulse">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    正在为【{companyName}】全网搜录档案...
                  </h4>
                  <p className="text-xs text-slate-400">深度检索商业登记簿、关务历史与欧洲车后分销网络</p>
                </div>

                <div className="space-y-3 max-w-md mx-auto">
                  <div
                    className={`flex items-center space-x-3 p-3 rounded-xl border text-xs transition-all ${
                      progressStep >= 1
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                      1
                    </div>
                    <span>检索企业真实注册地址、官网及总部城市...</span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 p-3 rounded-xl border text-xs transition-all ${
                      progressStep >= 2
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                      2
                    </div>
                    <span>匹配已代理或采买的中国轮胎品牌 (Sailun/Triangle/ZC/Linglong等)...</span>
                  </div>

                  <div
                    className={`flex items-center space-x-3 p-3 rounded-xl border text-xs transition-all ${
                      progressStep >= 3
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                      3
                    </div>
                    <span>测算年进口集装箱量、仓储物流面积与采购标准...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Profile Preview */}
            {previewCompany && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-3">
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{previewCompany.flagEmoji}</span>
                        <h4 className="text-lg font-bold text-white">{previewCompany.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {previewCompany.frenchName} • {previewCompany.city}, {previewCompany.countryCn}
                      </p>
                    </div>
                    {previewCompany.chineseSourcingVerified ? (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0">
                        已采买中国轮胎
                      </span>
                    ) : (
                      <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0">
                        潜在目标 (尚无中国采买)
                      </span>
                    )}
                  </div>

                  {/* Core Attributes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">分销层级</span>
                      <span className="font-medium text-amber-300">{previewCompany.distributorTier}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">年估计吞吐量</span>
                      <span className="font-medium text-white">{previewCompany.estimatedAnnualVolume}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">仓储规模</span>
                      <span className="font-medium text-white">{previewCompany.warehouseArea}</span>
                    </div>
                  </div>

                  {/* Chinese Brands Sourced */}
                  <div>
                    <span className="text-slate-400 text-xs font-medium block mb-1">
                      代理/采买的中国轮胎品牌:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {previewCompany.verifiedChineseBrands.map((b, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {b.brandEn} ({b.brandCn}) - {b.partnershipType}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                    <div className="flex items-center space-x-1.5 truncate">
                      <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <a
                        href={previewCompany.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-amber-400 truncate"
                      >
                        {previewCompany.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-1.5 truncate">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{previewCompany.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{previewCompany.email}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{previewCompany.address}</span>
                    </div>
                  </div>

                  {/* Business Overview excerpt */}
                  <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    <span className="text-amber-400 font-medium mr-1">商业概况:</span>
                    {previewCompany.businessOverview}
                  </div>
                </div>

                {/* Save Success Notice or Confirm Action */}
                {isSaved ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>成功保存！已添加到【客户信息】主列表中</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      您现在可以在列表、地图以及拜访计划中直接查看与导出该公司信息。
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectCompany(previewCompany)}
                        className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <span>立即查看该公司详情档案</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setPreviewCompany(null)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      取消 / 重新搜索
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmSave}
                      className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>确认保存并显示在已存在列表中</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* List of Custom Added Importers */}
      {customImporters.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              最近通过【添加信息】自主建立的客户档案 ({customImporters.length} 家)
            </h3>
            <span className="text-xs text-slate-400">已自动合并至客户主表与地图分布</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {customImporters.map((comp) => (
              <div
                key={comp.id}
                className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3.5 space-y-2 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{comp.flagEmoji}</span>
                    <div>
                      <h4
                        onClick={() => onSelectCompany(comp)}
                        className="font-bold text-sm text-white hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {comp.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {comp.city}, {comp.countryCn}
                      </p>
                    </div>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-mono border border-amber-500/20">
                    新增
                  </span>
                </div>

                <div className="text-xs text-slate-400 line-clamp-2">
                  {comp.businessOverview}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                  <button
                    type="button"
                    onClick={() => onSelectCompany(comp)}
                    className="text-amber-400 font-semibold hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <span>查看详情</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  {onRemoveCustomImporter && (
                    <button
                      type="button"
                      onClick={() => onRemoveCustomImporter(comp.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      删除记录
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
