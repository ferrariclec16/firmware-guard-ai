'use client';

import React from 'react';
import { X, Check, ShieldCheck, Zap, Building2, HelpCircle } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              EU CRA 2026 기업 맞춤 플랜
            </span>
            <h3 className="text-xl font-black mt-1">
              하드웨어·임베디드 제조사 보안 감사 요금제
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              최대 220억 원(€15M)의 EU CRA 과징금 리스크를 제거하고 완벽한 CE 마킹을 확보하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Single Audit */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                1회 정밀 감사
              </span>
              <h4 className="text-base font-bold text-gray-900 mt-1">Single Audit</h4>
              <p className="text-xs text-gray-500 mt-1">
                EU 시장 수출을 앞두고 CE 마킹 제출용 단일 펌웨어 검증이 필요한 기업
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩1,900,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 1회</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>단일 바이너리 (.bin, .elf, .img) 정밀 분석</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>CycloneDX 1.5 규격 SBOM 생성</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>CVE / EPSS / CISA KEV 취약점 매핑</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>ENISA 24h 조기 경보 양식 1회 발급</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Single Audit 신청이 접수되었습니다. 엔지니어가 2시간 내로 연락드립니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              1회 감사 의뢰
            </button>
          </div>

          {/* Plan 2: Exporter Pro (Recommended) */}
          <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-indigo-50/20 relative flex flex-col justify-between space-y-4 shadow-lg shadow-indigo-500/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
              가장 많은 선택
            </span>

            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                정기 구독 플랜
              </span>
              <h4 className="text-base font-bold text-gray-900 mt-1">Hardware Exporter Pro</h4>
              <p className="text-xs text-gray-500 mt-1">
                유럽향 IoT, 스마트홈, 전장 부품을 지속적으로 릴리스하는 수출 제조사
              </p>

              <div className="mt-4 pb-4 border-b border-indigo-100">
                <span className="text-2xl font-black text-gray-900">₩890,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-700">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>월 최대 10개 펌웨어 상시 감사 & 히스토리 추적</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>GitLab CI / GitHub Actions 빌드 자동 연동</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>실시간 CISA KEV 악용 제로데이 24h 경보 알림</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>CE 마킹 인증 기관 제출용 공인 SBOM 서명</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Hardware Exporter Pro 14일 무료 트라이얼이 시작되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition cursor-pointer shadow-md shadow-indigo-600/30"
            >
              14일 무료 체험 시작
            </button>
          </div>

          {/* Plan 3: Enterprise Retainer */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                대기업 & 공급망
              </span>
              <h4 className="text-base font-bold text-gray-900 mt-1">Enterprise Retainer</h4>
              <p className="text-xs text-gray-500 mt-1">
                완성차 OEM, 가전 대기업, 1차 티어 벤더 대상 전담 법무 및 인시던트 대응
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩2,900,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월~</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>무제한 펌웨어 바이너리 & 공급망 감사</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>ENISA 조기 경보 발생 시 4시간 내 전담 대응 (SLA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>온프레미스(폐쇄망) 환경 에이전트 구축 지원</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>유럽 현지 사이버보안 로펌 연계 자문</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('엔터프라이즈 도입 문의가 접수되었습니다. 솔루션 아키텍트가 연락드립니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              도입 상담 신청
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 text-center text-xs text-gray-500">
          모든 플랜은 EU CRA Regulation 2024/2847 및 ISO/IEC 5230 (OpenChain) 규격을 100% 보장합니다.
        </div>
      </div>
    </div>
  );
}
