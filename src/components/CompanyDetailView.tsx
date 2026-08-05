import React from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Award,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  CalendarCheck,
  CalendarPlus,
  ExternalLink,
} from 'lucide-react';
import { ImporterCompany, VisitPlanItem } from '../types';

interface CompanyDetailViewProps {
  company: ImporterCompany;
  onBack: () => void;
  onOpenAiPitch: (company: ImporterCompany) => void;
  visitPlanMap?: Record<string, VisitPlanItem>;
  toggleVisitPlan?: (companyId: string) => void;
}

export const CompanyDetailView: React.FC<CompanyDetailViewProps> = ({
  company,
  onBack,
  onOpenAiPitch,
  visitPlanMap = {},
  toggleVisitPlan,
}) => {
  const isInVisitPlan = !!visitPlanMap[company.id];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation Bar with Prominent Back Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-md sticky top-16 z-30 backdrop-blur-md bg-slate-900/95">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer shadow-sm shrink-0 min-h-[42px]"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>返回客户信息页面</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 hidden md:inline">
            当前浏览：{company.name} 详细档案
          </span>
          <button
            onClick={() => onOpenAiPitch(company)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer min-h-[40px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">生成 AI 开发信</span>
            <span className="sm:hidden">AI 开发信</span>
          </button>
        </div>
      </div>

      {/* Main Company Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl flex items-center justify-center text-base sm:text-2xl shrink-0 shadow-md">
              #{company.rank}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">{company.flagEmoji}</span>
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{company.name}</h1>
                {company.chineseSourcingVerified ? (
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>海关采买验证已通过</span>
                  </span>
                ) : (
                  <span className="bg-sky-500/10 text-sky-300 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/30 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>空白目标 (尚无中国采买记录)</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 flex flex-wrap items-center gap-2 leading-relaxed">
                <span className="font-mono text-slate-300">({company.frenchName})</span>
                <span>• {company.countryCn}</span>
                {company.distributorTier && (
                  <span className="bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs px-2 py-0.5 rounded border border-blue-500/30 font-semibold">
                    {company.distributorTier}
                  </span>
                )}
                <span>• 创立于 {company.foundedYear} 年</span>
              </p>
            </div>
          </div>

          {/* Visit Plan Quick Toggle */}
          {toggleVisitPlan && (
            <button
              onClick={() => toggleVisitPlan(company.id)}
              className={`flex items-center justify-center space-x-1.5 border text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[42px] shrink-0 ${
                isInVisitPlan
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {isInVisitPlan ? (
                <>
                  <CalendarCheck className="w-4 h-4 text-amber-400" />
                  <span>已在拜访计划中</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4 text-slate-400" />
                  <span>+ 加入拜访计划</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Section 0: Address & Contact Card */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>详细地址与联系方式</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">公司所在地与详细地址:</span>
                <span className="font-medium text-slate-100">{company.address} ({company.city}，{company.region})</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <Globe className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px]">官方网站:</span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-amber-400 hover:underline truncate block"
                >
                  {company.website} <ExternalLink className="w-3 h-3 inline ml-1" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">联系电话:</span>
                <span className="font-mono text-slate-100">{company.phone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">商务电子邮箱:</span>
                <span className="font-mono text-slate-100">{company.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Key Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>年进口分销估量</span>
            </div>
            <div className="text-sm sm:text-lg font-bold text-amber-400">{company.estimatedAnnualVolume}</div>
          </div>

          <div className="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>物流设施与仓库</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">{company.warehouseArea} ({company.logisticsHubsCount}个Hub)</div>
          </div>

          <div className="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>核心主营品类</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 truncate">{company.segments.join(' / ')}</div>
          </div>

          <div className="bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>团队人员规模</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">{company.employeeCount}</div>
          </div>
        </div>

        {/* Section 2: Chinese Brands Sourced & Customs Details */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-3">
            <span>采购进口的中国轮胎品牌与型号明细</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {company.verifiedChineseBrands.map((brand) => (
              <div
                key={brand.brandEn}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-base sm:text-lg font-bold text-amber-400">{brand.brandEn}</span>
                      <span className="text-xs text-slate-400 font-medium">({brand.brandCn})</span>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono mt-1 inline-block border border-slate-700">
                      合作模式: {brand.partnershipType}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-end">
                    {brand.categories.map((c) => (
                      <span
                        key={c}
                        className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {brand.popularModels && brand.popularModels.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-500">主推花纹/系列: </span>
                    <span className="text-slate-300 font-medium">{brand.popularModels.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {company.customsRecordInfo && (
            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start space-x-2">
              <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-400 font-semibold">海关提单与关务核验备注: </span>
                <span>{company.customsRecordInfo}</span>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Business Overview & Market Role */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-3">
            <span>{company.countryCn}本土分销定位与业务特征</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {company.businessOverview}
          </p>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              主要分销与客户覆盖类型:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {company.clientTypes.map((client) => (
                <span
                  key={client}
                  className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-xl border border-slate-700 flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{client}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Factory Sourcing Requirements */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-3">
            <span>中国工厂采购与准入要求</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>采购策略与准入条件</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {company.sourcingStrategy}
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 block font-medium">必备资质认证要求:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {company.procurementRequirements.certification.map((cert) => (
                    <span key={cert} className="bg-emerald-500/10 text-emerald-400 text-[11px] px-2 py-0.5 rounded border border-emerald-500/20">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span>采购起订量与结算规则</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">预估月采购量:</span>
                  <span className="font-semibold text-white">{company.procurementRequirements.minOrderQuantity}</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">惯用结算条件:</span>
                  <span className="font-semibold text-amber-300">{company.procurementRequirements.paymentTerms}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Exporter Pitching Guidance */}
        <div className="bg-gradient-to-br from-amber-500/10 to-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>给中国轮胎出口工厂的对接谈判指引</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {company.pitchingTips}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回客户信息页面</span>
          </button>

          <button
            onClick={() => onOpenAiPitch(company)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer min-h-[44px]"
          >
            <Sparkles className="w-4 h-4" />
            <span>一键生成针对该公司的 AI 开发信 (AI Pitch)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
