import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FirmwareGuard EU - EU CRA 2026 임베디드 펌웨어 SBOM 자동 감사 AI SaaS',
  description:
    'EU 사이버복원력법(CRA 2026) 완벽 대응: 하드웨어 및 임베디드 펌웨어 바이너리 리버스엔지니어링, CycloneDX 1.5 규격 SBOM 자동 생성, CISA KEV 24시간 ENISA 조기 경보 신고서 자동 발급 솔루션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased bg-slate-50 text-slate-900">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
