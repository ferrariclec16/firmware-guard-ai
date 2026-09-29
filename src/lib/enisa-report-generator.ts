import { AnalysisSummary } from './firmware-analyzer';

export interface EnisaEarlyWarningReport {
  notificationId: string;
  submissionDeadline: string; // 24시간 카운트다운
  submittedTo: string;
  manufacturerName: string;
  productName: string;
  analysis: AnalysisSummary;
  officialStatement: string;
}

export function generateEnisaReport(
  analysis: AnalysisSummary,
  manufacturerName: string = '(주)K-스마트일렉트로닉스'
): EnisaEarlyWarningReport {
  const notificationId = `EU-CRA-NOTIF-2026-${Date.now().toString().slice(-6)}`;
  
  // 24시간 카운트다운 마감 계산 (발견 시점 + 24시간)
  const now = new Date();
  const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const officialStatement = `PURSUANT TO ARTICLE 11(1) OF REGULATION (EU) 2024/2847 (CYBER RESILIENCE ACT), THE MANUFACTURER HEREBY FORMALLY SUBMITS THIS EARLY WARNING NOTIFICATION CONCERNING AN ACTIVELY EXPLOITED VULNERABILITY DETECTED IN THE DIGITAL PRODUCT SPECIFIED HEREIN.

1. Impacted Product: ${analysis.metadata.hardwareDevice} (Firmware: ${analysis.metadata.firmwareName})
2. Primary Vulnerability: ${analysis.vulnerabilities[0]?.cveId || 'N/A'} (CVSS Score: ${analysis.vulnerabilities[0]?.cvssScore || 'N/A'})
3. Remediation Status: Immediate mitigation patch is in development. A comprehensive 72-hour technical assessment will follow pursuant to Article 11(2).`;

  return {
    notificationId,
    submissionDeadline: deadline.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    submittedTo: 'European Union Agency for Cybersecurity (ENISA) & CSIRT Network',
    manufacturerName,
    productName: analysis.metadata.hardwareDevice,
    analysis,
    officialStatement,
  };
}
