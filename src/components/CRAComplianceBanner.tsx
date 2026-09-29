'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, ShieldAlert, Award, FileWarning, ExternalLink } from 'lucide-react';
import { CRA_ENFORCEMENT_DATES, CRA_PENALTIES } from '@/lib/eu-cra-standards';

interface CRAComplianceBannerProps {
  score: number;
  criticalCves: number;
  activelyExploitedCves: number;
  isNoticeRequired: boolean;
  onOpenReport: () => void;
}

export function CRAComplianceBanner({
  score,
  criticalCves,
  activelyExploitedCves,
  isNoticeRequired,
  onOpenReport,
}: CRAComplianceBannerProps) {
  const [daysRemaining2026, setDaysRemaining2026] = useState<number>(0);

  useEffect(() => {
    const target = new Date('2026-09-11T00:00:00Z');
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining2026(diffDays);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 p-4 lg:p-6 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Left: Deadline & Legal Alert */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Clock className="w-3 h-3" /> D-{daysRemaining2026 > 0 ? daysRemaining2026 : 'D-DAY'}
            </span>
            <span className="text-xs font-semibold text-indigo-300">
              EU CRA 24시간 의무신고 발효: 2026년 9월 11일
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-medium text-slate-300">
              최대 과징금: <strong className="text-red-400 font-bold">{CRA_PENALTIES.maxFineEur}</strong> ({CRA_PENALTIES.maxFineTurnoverPct})
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>EU 사이버복원력법(CRA) 임베디드 펌웨어 SBOM 자동 감사</span>
            {isNoticeRequired && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/90 text-white animate-pulse">
                즉시 조치 요망
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-slate-300 leading-relaxed">
            유럽연합으로 수출되는 모든 하드웨어·IoT·전장 펌웨어 바이너리를 분석하여, CycloneDX 1.5 규격 SBOM을 추출하고 
            ENISA 24시간 조기 경보 신고 대상 취약점(CISA KEV)을 자동 판정합니다.
          </p>
        </div>

        {/* Right: Metrics & Action Trigger */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-indigo-800/40 backdrop-blur">
          {/* Security Score */}
          <div className="flex flex-col items-center justify-center px-4 py-2 bg-slate-900/80 rounded-xl min-w-[90px] border border-slate-700/50">
            <span className="text-[11px] font-medium text-slate-400">보안 준수율</span>
            <span className={`text-2xl font-black ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
              {score}점
            </span>
          </div>

          {/* Actively Exploited (24h trigger) */}
          <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl min-w-[100px] border ${
            activelyExploitedCves > 0 ? 'bg-red-950/70 border-red-500/60 text-red-300' : 'bg-slate-900/80 border-slate-700/50 text-slate-400'
          }`}>
            <span className="text-[11px] font-medium flex items-center gap-1">
              <FileWarning className="w-3 h-3 text-red-400" />
              24h 신고대상
            </span>
            <span className={`text-2xl font-black ${activelyExploitedCves > 0 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
              {activelyExploitedCves}건
            </span>
          </div>

          {/* Critical CVEs */}
          <div className="flex flex-col items-center justify-center px-4 py-2 bg-slate-900/80 rounded-xl min-w-[90px] border border-slate-700/50">
            <span className="text-[11px] font-medium text-slate-400">Critical CVE</span>
            <span className="text-2xl font-black text-rose-400">
              {criticalCves}건
            </span>
          </div>

          {/* Report Button */}
          {isNoticeRequired && (
            <button
              onClick={onOpenReport}
              className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>ENISA 신고서 발행</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
