'use client';

import React, { useState } from 'react';
import {
  FileCode,
  ShieldAlert,
  Layers,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Upload,
  Cpu,
  HardDrive,
  Terminal,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
} from 'lucide-react';
import { AnalysisSummary, SbomComponent, CveVulnerability } from '@/lib/firmware-analyzer';
import { FirmwarePreset, MOCK_FIRMWARES } from '@/lib/mock-firmwares';
import { EU_CRA_STANDARDS } from '@/lib/eu-cra-standards';

interface FirmwareWorkbenchProps {
  currentAnalysis: AnalysisSummary;
  selectedPresetId: string;
  onSelectPreset: (preset: FirmwarePreset) => void;
  onDownloadSbom: () => void;
  onOpenReport: () => void;
}

export function FirmwareWorkbench({
  currentAnalysis,
  selectedPresetId,
  onSelectPreset,
  onDownloadSbom,
  onOpenReport,
}: FirmwareWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'sbom' | 'cve' | 'cyclonedx' | 'compliance'>('sbom');
  const [copiedPurl, setCopiedPurl] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const handleCopyPurl = (purl: string) => {
    navigator.clipboard.writeText(purl);
    setCopiedPurl(purl);
    setTimeout(() => setCopiedPurl(null), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(currentAnalysis.cycloneDxJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleSimulateCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
      onSelectPreset({
        id: 'custom-firmware',
        name: `사용자 업로드 펌웨어: ${file.name}`,
        manufacturer: '커스텀 분석 타깃 디바이스',
        exportTarget: 'EU 시장 출시 검토용',
        description: '사용자가 직접 업로드한 임베디드 바이너리 리버스엔지니어링 결과.',
        metadata: {
          firmwareName: file.name,
          hardwareDevice: '사용자 지정 IoT 컨트롤러',
          targetArchitecture: 'ARM64',
          osType: 'Embedded Linux (Buildroot / Yocto)',
          fileSystem: 'SquashFS / UBI',
          binarySizeMb: Math.round((file.size / (1024 * 1024)) * 10) / 10 || 48.5,
          analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        },
      });
    }, 1200);
  };

  const filteredComponents = currentAnalysis.components.filter((c) => {
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.purl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.license.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* 1. Preset Selector & Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              분석 대상 펌웨어 바이너리 선택
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              사전 구성된 한국 수출기업 펌웨어 모델을 선택하거나 사용자의 실제 바이너리(.bin, .img, .elf)를 업로드하세요.
            </p>
          </div>

          <label className="relative inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>{isSimulatingUpload ? '바이너리 파싱 중...' : '새 펌웨어 바이너리 업로드'}</span>
            <input
              type="file"
              className="hidden"
              onChange={handleSimulateCustomUpload}
              accept=".bin,.img,.elf,.tar.gz,.iso"
            />
          </label>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_FIRMWARES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`text-left p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
                    <span className="truncate">{preset.manufacturer}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-700 text-[10px]">
                      {preset.metadata.targetArchitecture}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">
                    {preset.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">{preset.metadata.binarySizeMb} MB</span>
                  <span className={`font-bold flex items-center gap-1 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {isSelected ? '선택됨' : '선택'} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Firmware Meta Bar */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-800">바이너리:</span>
            <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono text-[11px]">
              {currentAnalysis.metadata.firmwareName}
            </code>
          </div>
          <div>
            <span className="font-semibold text-gray-800">OS / Kernel:</span> {currentAnalysis.metadata.osType}
          </div>
          <div>
            <span className="font-semibold text-gray-800">파일시스템:</span> {currentAnalysis.metadata.fileSystem}
          </div>
          <div>
            <span className="font-semibold text-gray-800">아키텍처:</span> {currentAnalysis.metadata.targetArchitecture}
          </div>
          <div className="ml-auto text-gray-400 text-[11px]">
            최근 분석: {currentAnalysis.metadata.analyzedAt}
          </div>
        </div>
      </div>

      {/* 2. Main Workbench Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 overflow-x-auto">
          <button
            onClick={() => setActiveTab('sbom')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'sbom'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>SBOM 컴포넌트 목록 ({currentAnalysis.components.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cve')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'cve'
                ? 'border-red-600 text-red-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>CRA 보안 취약점 & 패치 ({currentAnalysis.vulnerabilities.length})</span>
            {currentAnalysis.activelyExploitedCves > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] animate-pulse">
                24h 경보
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cyclonedx')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'cyclonedx'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>CycloneDX 1.5 JSON (CE 표준)</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>EU CRA 규정 체크리스트</span>
          </button>
        </div>

        {/* Tab 1: SBOM Components Table */}
        {activeTab === 'sbom' && (
          <div className="p-5 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="컴포넌트명, 라이선스, PURL 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1 sm:pb-0">
                <span className="text-gray-400 text-xs font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> 분류:
                </span>
                {['ALL', 'OS_KERNEL', 'CRYPTO', 'NETWORK', 'SYSTEM_UTIL', 'DATABASE'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">컴포넌트 라이브러리</th>
                    <th className="px-4 py-3">버전</th>
                    <th className="px-4 py-3">분류</th>
                    <th className="px-4 py-3">라이선스</th>
                    <th className="px-4 py-3">Package URL (PURL)</th>
                    <th className="px-4 py-3 text-center">CVE 취약점</th>
                    <th className="px-4 py-3 text-right">최고 CVSS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredComponents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                        검색 조건에 일치하는 컴포넌트가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredComponents.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition">
                        <td className="px-4 py-3 font-bold text-gray-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          {c.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-600">{c.version}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            {c.license}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-gray-500 max-w-xs truncate">
                          <button
                            onClick={() => handleCopyPurl(c.purl)}
                            className="inline-flex items-center gap-1 hover:text-indigo-600 transition"
                            title="PURL 복사"
                          >
                            <span className="truncate">{c.purl}</span>
                            {copiedPurl === c.purl ? (
                              <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <Copy className="w-3 h-3 flex-shrink-0" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {c.cveCount > 0 ? (
                            <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-700 text-[11px]">
                              {c.cveCount}건
                            </span>
                          ) : (
                            <span className="text-gray-400 font-medium">0건</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {c.highestCvss > 0 ? (
                            <span
                              className={`font-black ${
                                c.highestCvss >= 9.0
                                  ? 'text-red-600'
                                  : c.highestCvss >= 7.0
                                  ? 'text-orange-500'
                                  : 'text-amber-500'
                              }`}
                            >
                              {c.highestCvss.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-medium">안전 (0.0)</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span>총 {currentAnalysis.components.length}개 오픈소스/시스템 바이너리 모듈 식별됨</span>
              <button
                onClick={onDownloadSbom}
                className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> CycloneDX 1.5 SBOM 다운로드 (.json)
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: CVE Vulnerabilities & Patch Guide */}
        {activeTab === 'cve' && (
          <div className="p-5 space-y-4">
            {currentAnalysis.vulnerabilities.length === 0 ? (
              <div className="p-12 text-center bg-emerald-50/50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-emerald-900">식별된 보안 취약점(CVE) 없음</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  이 펌웨어는 주요 공개 CVE 데이터베이스 및 CISA KEV 목록에 매핑된 알려진 결함이 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentAnalysis.vulnerabilities.map((v, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition ${
                      v.isActivelyExploited
                        ? 'bg-red-50/40 border-red-300 ring-1 ring-red-400/30'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900 font-mono">
                          {v.cveId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            v.severity === 'CRITICAL'
                              ? 'bg-red-600 text-white'
                              : v.severity === 'HIGH'
                              ? 'bg-rose-500 text-white'
                              : 'bg-amber-500 text-white'
                          }`}
                        >
                          {v.severity} ({v.cvssScore})
                        </span>

                        {v.isActivelyExploited && (
                          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold border border-red-300 flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            CISA KEV 실시간 악용 중 (CRA 24시간 의무신고 대상)
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 flex items-center gap-3">
                        <span>대상 모듈: <strong className="text-gray-900">{v.componentName}</strong></span>
                        <span>현재 버전: <code className="bg-gray-100 px-1 py-0.5 rounded">{v.installedVersion}</code></span>
                        <span>권장 패치: <code className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold">{v.patchedVersion}</code></span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-gray-700 block mb-1">
                          취약점 원인 및 영향 ({v.cwe})
                        </span>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          {v.summary}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-gray-700 block mb-1">
                          긴급 조치 및 패치 권고 (Remediation)
                        </span>
                        <p className="text-emerald-900 leading-relaxed bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                          {v.remediationAdvice}
                        </p>
                      </div>
                    </div>

                    {v.isActivelyExploited && (
                      <div className="mt-3 pt-3 border-t border-red-200/60 flex items-center justify-between text-xs">
                        <span className="text-red-700 font-medium">
                          ⚠️ EU CRA Article 11(1) 위반 시 최대 1,500만 유로 과징금 부과 대상입니다.
                        </span>
                        <button
                          onClick={onOpenReport}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition shadow-sm cursor-pointer flex items-center gap-1 text-[11px]"
                        >
                          <ShieldAlert className="w-3 h-3" /> ENISA 24h 공식 신고서 작성
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: CycloneDX 1.5 JSON Viewer */}
        {activeTab === 'cyclonedx' && (
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  CycloneDX 1.5 표준 소프트웨어 자재명세서 (SBOM)
                </h3>
                <p className="text-[11px] text-gray-500">
                  EU CRA Article 10(1) 및 Annex I 필수 제출 규격에 부합하는 기계 판독형 JSON 문서입니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? '복사 완료' : 'JSON 복사'}</span>
                </button>

                <button
                  onClick={onDownloadSbom}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.cdx.json 다운로드</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[500px] border border-slate-800">
              <pre>{currentAnalysis.cycloneDxJson}</pre>
            </div>
          </div>
        )}

        {/* Tab 4: EU CRA Compliance Audit Checklist */}
        {activeTab === 'compliance' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  EU 사이버복원력법(CRA) 조항별 준수 상태 진단
                </h3>
                <p className="text-xs text-gray-500">
                  Regulation (EU) 2024/2847 핵심 의무사항 및 과징금 규정 매핑
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                currentAnalysis.complianceStatus === 'CRITICAL_REPORT_REQUIRED'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : currentAnalysis.complianceStatus === 'WARNING'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {currentAnalysis.complianceStatus === 'CRITICAL_REPORT_REQUIRED'
                  ? '긴급 조치 요구 (24h 미준수 위험)'
                  : currentAnalysis.complianceStatus === 'WARNING'
                  ? '주의: 패치 후 CE 인증 가능'
                  : 'CE 마킹 요건 완벽 충족'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EU_CRA_STANDARDS.map((standard) => {
                let isViolated = false;
                if (standard.id === 'CRA-ART-11-1' && currentAnalysis.is24hEnisaNoticeRequired) {
                  isViolated = true;
                }

                return (
                  <div
                    key={standard.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      isViolated
                        ? 'bg-red-50/50 border-red-300 ring-1 ring-red-400/20'
                        : 'bg-gray-50/50 border-gray-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {standard.article}
                        </span>
                        <span className="text-[11px] font-medium text-gray-500">
                          시행일: {standard.effectiveDate}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 mb-1">
                        {standard.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                        {standard.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex flex-col gap-1 text-[11px]">
                      <div className="text-red-700 font-semibold">
                        과징금: {standard.penaltyMax}
                      </div>
                      <div className="flex items-center gap-1.5 font-bold mt-1">
                        {isViolated ? (
                          <span className="text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> 미준수 (조기 경보 제출 필요)
                          </span>
                        ) : (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 엔진을 통한 감사 요건 충족
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
