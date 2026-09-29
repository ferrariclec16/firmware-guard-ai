'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { CRAComplianceBanner } from '@/components/CRAComplianceBanner';
import { FirmwareWorkbench } from '@/components/FirmwareWorkbench';
import { EnisaReportModal } from '@/components/EnisaReportModal';
import { PricingModal } from '@/components/PricingModal';
import { analyzeFirmware } from '@/lib/firmware-analyzer';
import { MOCK_FIRMWARES, FirmwarePreset } from '@/lib/mock-firmwares';
import { generateEnisaReport } from '@/lib/enisa-report-generator';
import { ShieldCheck, Lock, Cpu, Globe2, FileText, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<FirmwarePreset>(MOCK_FIRMWARES[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const currentAnalysis = useMemo(() => {
    return analyzeFirmware(selectedPreset.metadata);
  }, [selectedPreset]);

  const enisaReport = useMemo(() => {
    return generateEnisaReport(currentAnalysis, selectedPreset.manufacturer);
  }, [currentAnalysis, selectedPreset]);

  const handleDownloadSbom = () => {
    const blob = new Blob([currentAnalysis.cycloneDxJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPreset.metadata.firmwareName}-cyclonedx-1.5.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onDownloadSbom={handleDownloadSbom}
        isNoticeRequired={currentAnalysis.is24hEnisaNoticeRequired}
      />

      {/* 2. CRA Compliance D-Day Countdown Banner */}
      <CRAComplianceBanner
        score={currentAnalysis.overallSecurityScore}
        criticalCves={currentAnalysis.criticalCves}
        activelyExploitedCves={currentAnalysis.activelyExploitedCves}
        isNoticeRequired={currentAnalysis.is24hEnisaNoticeRequired}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* 3. Main Firmware Workbench */}
      <main className="flex-1">
        <FirmwareWorkbench
          currentAnalysis={currentAnalysis}
          selectedPresetId={selectedPreset.id}
          onSelectPreset={(p) => setSelectedPreset(p)}
          onDownloadSbom={handleDownloadSbom}
          onOpenReport={() => setIsReportModalOpen(true)}
        />

        {/* 4. EU CRA Moat & Architecture Deep Dive Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-indigo-900/60 shadow-xl space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase tracking-widest">
                Technical Moat & Regulatory Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
                왜 일반 소스코드 검사기(Snyk/SonarQube)로는 EU CRA를 통과할 수 없는가?
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                임베디드 디바이스와 IoT 하드웨어는 벤더사 proprietary SDK, 크로스 컴파일러, 정적 링크 라이브러리가 뒤섞인 채 
                단일 바이너리로 플래시 메모리에 기록됩니다. 소스코드 저장소만 검사해서는 실제로 디바이스에 적재된 
                위험 취약점을 입증할 수 없습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-indigo-800/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">바이너리 리버스엔지니어링</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  소스코드가 없는 서드파티 벤더의 컴파일된 ELF / Firmware Blob에서도 심볼 테이블과 문자열, 고유 엔트로피 시그니처를 역추적하여 100% 실기반 SBOM을 구축합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">ENISA 24h 조기 경보 자동화</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CISA KEV 및 유럽 CSIRT 카탈로그에 등재된 실시간 악용 취약점 발생 시, 단 1클릭으로 공식 행정 양식의 통보서를 생성하여 최대 220억 원의 과징금 시효를 방어합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">CycloneDX 1.5 규격 완벽 준수</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  유럽연합 CE 마킹 심사기관(Notified Body)에서 법적으로 요구하는 Machine-Readable JSON 표준 규격을 완벽 지원하여 유럽 시장 수출 라이선스를 보장합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-8 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">FirmwareGuard EU</span>
            <span>—</span>
            <span>EU Cyber Resilience Act (CRA 2026) Automated Compliance Suite</span>
          </div>

          <div className="flex items-center gap-4 text-gray-600 font-medium">
            <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-indigo-600 cursor-pointer">
              수출기업 요금제
            </button>
            <button onClick={() => setIsReportModalOpen(true)} className="hover:text-red-600 cursor-pointer">
              ENISA 24h 조기 경보
            </button>
            <a
              href="https://github.com/ferrariclec16/firmware-guard-ai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EnisaReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={enisaReport}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}
