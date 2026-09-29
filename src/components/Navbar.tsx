'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, Download, CreditCard, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenReport: () => void;
  onOpenPricing: () => void;
  onDownloadSbom: () => void;
  isNoticeRequired: boolean;
}

export function Navbar({ onOpenReport, onOpenPricing, onDownloadSbom, isNoticeRequired }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-gray-950 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
                FirmwareGuard EU
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                EU CRA 2026 컴플라이언스
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              임베디드/IoT 펌웨어 바이너리 리버스엔지니어링 & CycloneDX SBOM 자동 감사
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isNoticeRequired && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>EU CRA 24h 조기 경보 신고 대상 발견</span>
            </div>
          )}

          <button
            onClick={onDownloadSbom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">CycloneDX 1.5</span> SBOM 받기
          </button>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition border border-red-200 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ENISA 24h 신고서</span>
          </button>

          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg shadow-sm transition cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>수출기업 요금제</span>
          </button>

          <a
            href="https://github.com/ferrariclec16/firmware-guard-ai"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            title="GitHub Repository"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
