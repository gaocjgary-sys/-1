import React, { useState } from 'react';
import { ImporterCompany } from '../types';
import { ALL_EUROPEAN_TIRE_IMPORTERS } from '../data/importersData';
import { Sparkles, Send, Loader2, Bot, User, CheckCircle2, Copy, Check, FileText } from 'lucide-react';

interface AiAdvisorPanelProps {
  selectedCompanyForPitch?: ImporterCompany | null;
}

export const AiAdvisorPanel: React.FC<AiAdvisorPanelProps> = ({ selectedCompanyForPitch }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    selectedCompanyForPitch?.id || ALL_EUROPEAN_TIRE_IMPORTERS[0].id
  );
  const [brandNameInput, setBrandNameInput] = useState<string>('中国特种与乘用车高品质轮胎');
  const [segmentInput, setSegmentInput] = useState<string>('PCR 乘用车轮胎 / TBR 卡客车轮胎');
  const [customUserPrompt, setCustomUserPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedCompany = ALL_EUROPEAN_TIRE_IMPORTERS.find((c) => c.id === selectedCompanyId) || ALL_EUROPEAN_TIRE_IMPORTERS[0];

  // Quick Pitch Generator trigger
  const handleGeneratePitch = async (presetPrompt?: string) => {
    setLoading(true);
    setAiResponse('');

    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: presetPrompt ? 'custom' : 'pitch_generator',
          companyName: `${selectedCompany.name} (${selectedCompany.countryCn})`,
          brandName: brandNameInput,
          targetSegment: segmentInput,
          userPrompt: presetPrompt || customUserPrompt || `生成针对 ${selectedCompany.name} (${selectedCompany.countryCn}) 的法文/英文商务开发信草稿与合作突破口分析`,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setAiResponse(`出错了: ${data.error}`);
      } else {
        setAiResponse(data.analysis || '无分析结果。');
      }
    } catch (err: any) {
      setAiResponse(`连接服务器失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>AI 商务开发与欧洲出海拓展顾问 (Gemini 3.6 Flash)</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed">
            智能生成针对法·克·斯·俄·乌买家采购总监的外语开发信草稿、分析准入门槛与出海对标策略
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
          <h3 className="text-xs sm:text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span>开发配置参数</span>
          </h3>

          {/* Select Target Importer */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">目标欧洲进口商公司:</label>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 text-xs border border-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 font-medium min-h-[42px]"
            >
              {ALL_EUROPEAN_TIRE_IMPORTERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flagEmoji} [{c.countryCn}] #{c.rank} {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>

          {/* Brand Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">中国工厂/出口品牌名称:</label>
            <input
              type="text"
              value={brandNameInput}
              onChange={(e) => setBrandNameInput(e.target.value)}
              placeholder="如 玲珑、赛轮、或自有品牌品牌名..."
              className="w-full bg-slate-950 text-slate-100 text-xs border border-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 min-h-[42px]"
            />
          </div>

          {/* Target Tire Segment */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">推介轮胎规格/品类:</label>
            <input
              type="text"
              value={segmentInput}
              onChange={(e) => setSegmentInput(e.target.value)}
              placeholder="如 PCR 205/55R16, TBR 315/80R22.5, 四季胎..."
              className="w-full bg-slate-950 text-slate-100 text-xs border border-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 min-h-[42px]"
            />
          </div>

          {/* Custom Instruction Box */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">特别谈判诉求或提问:</label>
            <textarea
              rows={3}
              value={customUserPrompt}
              onChange={(e) => setCustomUserPrompt(e.target.value)}
              placeholder="补充说明，如：强调工厂有欧洲分库支持、提供长达2年的三包质保，或要求对标其现有采买的中国竞品..."
              className="w-full bg-slate-950 text-slate-100 text-xs border border-slate-800 rounded-xl p-2.5 sm:p-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">快速分析模板:</span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  handleGeneratePitch(
                    `请分析 ${selectedCompany.name} 的采买痛点，并生成一份正式的法文商务合作开发信`
                  )
                }
                className="bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs text-left p-2.5 rounded-xl border border-slate-800 transition-colors flex items-center justify-between cursor-pointer min-h-[40px]"
              >
                <span>✉️ 生成针对 {selectedCompany.name.split(' ')[0]} 的法文开发信</span>
              </button>

              <button
                onClick={() =>
                  handleGeneratePitch(
                    `如何向 ${selectedCompany.name} 推荐针对全法气候的 3PMSF 认证中国四季胎？有哪些合规门槛？`
                  )
                }
                className="bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs text-left p-2.5 rounded-xl border border-slate-800 transition-colors flex items-center justify-between cursor-pointer min-h-[40px]"
              >
                <span>❄️ 欧标 3PMSF 冬胎/四季胎准入指引</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => handleGeneratePitch()}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>Gemini 智能生成中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>生成针对 {selectedCompany.name.split(' ')[0]} 的商务提案</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 flex flex-col justify-between min-h-[380px] sm:min-h-[480px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI 顾问分析与定制提案输出</span>
              </h3>

              {aiResponse && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition-colors cursor-pointer min-h-[32px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制提案</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="pt-3 text-xs leading-relaxed text-slate-200">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-slate-400 space-y-3">
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 animate-spin" />
                  <p className="text-center text-xs">Gemini AI 正在深度剖析 {selectedCompany.name} 采购需求与供应链痛点...</p>
                </div>
              ) : aiResponse ? (
                <div className="bg-slate-950 p-3.5 sm:p-5 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap space-y-3 max-h-[380px] sm:max-h-[500px] overflow-y-auto">
                  {aiResponse}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-slate-500 text-center space-y-2">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-slate-700" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-400">选择进口商与配置参数后点击生成</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm">
                    生成系统包含：该法国买家采购特点分析、针对性谈判切入点、以及可直接发往该公司的标准法文商务开发信。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
