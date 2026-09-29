'use client';

import React, { useState } from 'react';
import { X, Printer, Copy, Check, ShieldAlert, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { EnisaEarlyWarningReport } from '@/lib/enisa-report-generator';

interface EnisaReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: EnisaEarlyWarningReport;
}

export function EnisaReportModal({ isOpen, onClose, report }: EnisaReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullText = `[EU CYBER RESILIENCE ACT - ARTICLE 11(1) EARLY WARNING NOTIFICATION]
Document Ref: ${report.notificationId}
Recipient: ${report.submittedTo}
Mandatory Deadline: ${report.submissionDeadline}
Manufacturer: ${report.manufacturerName}
Impacted Product: ${report.productName}
Firmware: ${report.analysis.metadata.firmwareName}

${report.officialStatement}

VULNERABILITY DETAILS:
${report.analysis.vulnerabilities
  .filter((v) => v.isActivelyExploited)
  .map(
    (v, i) =>
      `#${i + 1} CVE ID: ${v.cveId} (CVSS: ${v.cvssScore})
- Component: ${v.componentName} (${v.installedVersion})
- Category: Actively Exploited (CISA KEV / ENISA Catalog)
- CWE: ${v.cwe}
- Immediate Mitigation: ${v.remediationAdvice}`
  )
  .join('\n\n')}

Submitted by Authorized CRA Compliance Officer`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-700 via-rose-700 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-red-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">ENISA Article 11(1) 24시간 조기 경보 신고서</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/60 text-red-200 border border-red-500/30">
                  공식 행정 양식
                </span>
              </div>
              <p className="text-xs text-red-200">
                Regulation (EU) 2024/2847 사이버복원력법 준수 통보서
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Printable Form) */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-800 font-sans print:p-0">
          {/* Official Document Banner */}
          <div className="border-b-2 border-red-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-red-700 font-bold uppercase">
                EUROPEAN UNION CYBER RESILIENCE ACT COMPLIANCE
              </span>
              <h2 className="text-base font-black text-gray-900">
                FORMAL EARLY WARNING NOTIFICATION
              </h2>
            </div>
            <div className="text-right sm:text-right font-mono text-[11px] text-gray-600">
              <div>Ref: <strong className="text-gray-900">{report.notificationId}</strong></div>
              <div>신고 마한 시각: <strong className="text-red-700">{report.submissionDeadline}</strong></div>
            </div>
          </div>

          {/* Recipient & Manufacturer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div>
              <span className="font-semibold text-gray-500 block mb-0.5">수신 기관 (Recipient)</span>
              <p className="font-bold text-gray-900">{report.submittedTo}</p>
              <p className="text-[11px] text-gray-500">EU CSIRT Network Designated Single Point of Contact</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block mb-0.5">제조사 (Manufacturer)</span>
              <p className="font-bold text-gray-900">{report.manufacturerName}</p>
              <p className="text-[11px] text-gray-500">대한민국 소재 하드웨어 수출 제조사</p>
            </div>
          </div>

          {/* Product and Firmware Details */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
              1. 대상 디지털 제품 및 펌웨어 사양 (Product Specifications)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-200">
                <span className="text-gray-500 text-[10px] block">제품군</span>
                <span className="font-bold">{report.analysis.metadata.hardwareDevice}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-200">
                <span className="text-gray-500 text-[10px] block">펌웨어 파일명</span>
                <span className="font-mono font-bold truncate block">{report.analysis.metadata.firmwareName}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-200">
                <span className="text-gray-500 text-[10px] block">타깃 아키텍처</span>
                <span className="font-bold">{report.analysis.metadata.targetArchitecture}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-200">
                <span className="text-gray-500 text-[10px] block">바이너리 크기</span>
                <span className="font-bold">{report.analysis.metadata.binarySizeMb} MB</span>
              </div>
            </div>
          </div>

          {/* Actively Exploited CVE Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                2. 적극적 악용 취약점 상세 (Actively Exploited Vulnerabilities)
              </h4>
              <span className="text-red-700 font-bold text-[11px]">
                총 {report.analysis.vulnerabilities.filter((v) => v.isActivelyExploited).length}건 신고 대상
              </span>
            </div>

            <div className="space-y-2">
              {report.analysis.vulnerabilities
                .filter((v) => v.isActivelyExploited)
                .map((v, i) => (
                  <div key={i} className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <strong className="text-red-900 font-mono text-xs">{v.cveId}</strong>
                        <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                          CVSS {v.cvssScore}
                        </span>
                        <span className="font-medium text-gray-700 text-xs">
                          {v.componentName} ({v.installedVersion})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">{v.cwe}</span>
                    </div>
                    <p className="text-gray-700 text-[11px] leading-relaxed">
                      {v.summary}
                    </p>
                    <div className="text-[11px] text-emerald-900 bg-emerald-50/80 p-2 rounded border border-emerald-200 font-medium">
                      <strong>긴급 조치 계획:</strong> {v.remediationAdvice} (권장 버전: {v.patchedVersion})
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Legal Declaration */}
          <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl space-y-2 text-[11px] font-mono leading-relaxed">
            <div className="font-bold text-amber-400">MANDATORY LEGAL DECLARATION:</div>
            <div>{report.officialStatement}</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-[11px] text-gray-500">
            * 24시간 내 ENISA 포털에 등록되지 않을 시 최대 €15M의 과징금이 발생할 수 있습니다.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '전문 복사됨' : '신고 전문 복사'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>문서 인쇄 / PDF 저장</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
