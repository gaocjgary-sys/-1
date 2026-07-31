import React from 'react';
import { ImporterCompany, VisitPlanItem } from '../types';
import { X, ShieldCheck, MapPin, Phone, Mail, Globe, ExternalLink, Sparkles, CheckCircle2, Award, Truck, Building2, FileText, AlertCircle, CalendarCheck, CalendarPlus } from 'lucide-react';

interface ImporterDetailModalProps {
  company: ImporterCompany | null;
  onClose: () => void;
  onOpenAiPitch: (company: ImporterCompany) => void;
  visitPlanMap?: Record<string, VisitPlanItem>;
  toggleVisitPlan?: (companyId: string) => void;
}

export const ImporterDetailModal: React.FC<ImporterDetailModalProps> = ({
  company,
  onClose,
  onOpenAiPitch,
  visitPlanMap = {},
  toggleVisitPlan,
}) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-3.5 sm:p-6 z-10 flex items-start justify-between">
          <div className="flex items-start space-x-2.5 sm:space-x-4 pr-2">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-xl shrink-0 shadow-md">
              #{company.rank}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                <h2 className="text-base sm:text-2xl font-bold text-white leading-tight">{company.name}</h2>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>已验证采买中国轮胎</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 leading-tight">
                <span>{company.flagEmoji} {company.countryCn}</span>
                {company.distributorTier && (
                  <span className="bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs px-1.5 py-0.2 rounded border border-blue-500/30 font-semibold">
                    {company.distributorTier}
                  </span>
                )}
                <span>• {company.frenchName}</span>
                <span>• {company.foundedYear}年创立</span>
                <span>• 位于 {company.city}</span>
              </p>
            </div>
          </div>

          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-8">
          {/* Key Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800">
              <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span>年进口体量</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-400">{company.estimatedAnnualVolume}</div>
            </div>

            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800">
              <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                <span>物流仓储</span>
              </div>
              <div className="text-xs sm:text-base font-bold text-white truncate">{company.warehouseArea}</div>
            </div>

            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800">
              <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                <span>核心品类</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 truncate">{company.segments.join(' / ')}</div>
            </div>

            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800">
              <div className="text-[10px] sm:text-xs text-slate-400 mb-1 flex items-center space-x-1">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                <span>团队规模</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{company.employeeCount}</div>
            </div>
          </div>

          {/* Section 1: Verified Imported Chinese Tire Brands */}
          <div className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-2.5">
              <span>采购进口的中国轮胎品牌与型号明细</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
              {company.verifiedChineseBrands.map((brand) => (
                <div
                  key={brand.brandEn}
                  className="bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg font-bold text-amber-400">{brand.brandEn}</span>
                        <span className="text-xs text-slate-400 font-medium">({brand.brandCn})</span>
                      </div>
                      <span className="text-[10px] sm:text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono mt-1 inline-block border border-slate-700">
                        合作: {brand.partnershipType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {brand.categories.map((c) => (
                        <span
                          key={c}
                          className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {brand.popularModels && brand.popularModels.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-800/80 text-[11px] sm:text-xs">
                      <span className="text-slate-500">主推花纹/系列: </span>
                      <span className="text-slate-300 font-medium">{brand.popularModels.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Business Overview & Market Role */}
          <div className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-2.5">
              <span>{company.countryCn}市场定位与业务分销模式</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800">
              {company.businessOverview}
            </p>

            <div className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                主要分销与客户覆盖类型:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {company.clientTypes.map((client) => (
                  <span
                    key={client}
                    className="bg-slate-800 text-slate-200 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg sm:rounded-xl border border-slate-700 flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{client}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Sourcing Strategy & Procurement Terms */}
          <div className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2 border-l-4 border-amber-500 pl-2.5">
              <span>中国工厂采购与准入要求</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>采购策略与准入条件</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  {company.sourcingStrategy}
                </p>
                <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                  <span className="text-slate-400 block text-[11px] font-medium">必备资质认证要求:</span>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {company.procurementRequirements.certification.map((cert) => (
                      <span key={cert} className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>采购起订量与结算规则</span>
                </h4>
                <ul className="text-[11px] sm:text-xs text-slate-300 space-y-1.5">
                  <li className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">预估月采购量:</span>
                    <span className="font-semibold text-white">{company.procurementRequirements.minOrderQuantity}</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">惯用结算条件:</span>
                    <span className="font-semibold text-amber-300">{company.procurementRequirements.paymentTerms}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">目标价格定位:</span>
                    <span className="font-semibold text-emerald-400">{company.procurementRequirements.targetPriceSegment}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Pitching Advice for Chinese Tire Exporters */}
          <div className="bg-gradient-to-br from-amber-500/10 to-slate-950 border border-amber-500/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>对接谈判指引</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              {company.pitchingTips}
            </p>
          </div>

          {/* Section 5: Official Contact & Headquarters Info */}
          <div className="bg-slate-950 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5">
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
              官方地址与商务对接联系方式
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] sm:text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline truncate">
                  {company.website}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{company.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-3 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 z-10">
          <span className="text-[10px] sm:text-xs text-slate-400 hidden sm:inline">
            可配合 AI 自动生成标准外文商务合作提案
          </span>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {toggleVisitPlan && (
              <button
                id="modal-toggle-visit-plan-btn"
                onClick={() => toggleVisitPlan(company.id)}
                className={`flex items-center justify-center space-x-1.5 border text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[42px] ${
                  visitPlanMap[company.id]
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {visitPlanMap[company.id] ? (
                  <>
                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                    <span>已在拜访计划</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 text-slate-400" />
                    <span>+ 拜访计划</span>
                  </>
                )}
              </button>
            )}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <button
                id="close-modal-footer-btn"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer min-h-[42px] flex items-center justify-center"
              >
                关闭
              </button>
              <button
                id="generate-pitch-modal-btn"
                onClick={() => {
                  onClose();
                  onOpenAiPitch(company);
                }}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer min-h-[42px]"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>AI 开发信</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
