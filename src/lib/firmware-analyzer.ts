export interface SbomComponent {
  name: string;
  version: string;
  purl: string; // Package URL (e.g. pkg:generic/openssl@1.1.1u)
  license: string;
  category: 'OS_KERNEL' | 'CRYPTO' | 'NETWORK' | 'SYSTEM_UTIL' | 'DATABASE';
  cveCount: number;
  highestCvss: number;
}

export interface CveVulnerability {
  cveId: string;
  componentName: string;
  installedVersion: string;
  patchedVersion: string;
  cvssScore: number; // 0.0 ~ 10.0
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cwe: string;
  isActivelyExploited: boolean; // CISA KEV 등록 여부 (24시간 신고 대상)
  summary: string;
  remediationAdvice: string;
}

export interface FirmwareMetadata {
  firmwareName: string;
  hardwareDevice: string;
  targetArchitecture: 'ARM64' | 'ARM_CORTEX_M' | 'MIPS' | 'X86_64';
  osType: string;
  fileSystem: string;
  binarySizeMb: number;
  analyzedAt: string;
}

export interface AnalysisSummary {
  metadata: FirmwareMetadata;
  complianceStatus: 'PASS' | 'CRITICAL_REPORT_REQUIRED' | 'WARNING';
  overallSecurityScore: number; // 0~100 (높을수록 안전)
  totalComponents: number;
  totalCves: number;
  criticalCves: number;
  highCves: number;
  activelyExploitedCves: number; // 24시간 신고 대상 건수
  is24hEnisaNoticeRequired: boolean; // 24시간 신고 필수 여부
  components: SbomComponent[];
  vulnerabilities: CveVulnerability[];
  cycloneDxJson: string; // CycloneDX 1.5 JSON 표준 포맷
}

export function analyzeFirmware(metadata: FirmwareMetadata): AnalysisSummary {
  let components: SbomComponent[] = [];
  let vulnerabilities: CveVulnerability[] = [];

  if (/월패드|iot 게이트웨이|스마트홈/i.test(metadata.hardwareDevice)) {
    components = [
      { name: 'Linux Kernel', version: '5.10.87', purl: 'pkg:generic/linux@5.10.87', license: 'GPL-2.0', category: 'OS_KERNEL', cveCount: 2, highestCvss: 7.8 },
      { name: 'BusyBox', version: '1.34.1', purl: 'pkg:generic/busybox@1.34.1', license: 'GPL-2.0', category: 'SYSTEM_UTIL', cveCount: 1, highestCvss: 5.3 },
      { name: 'OpenSSL', version: '1.1.1u', purl: 'pkg:generic/openssl@1.1.1u', license: 'Apache-2.0', category: 'CRYPTO', cveCount: 1, highestCvss: 9.8 },
      { name: 'Dropbear SSH', version: '2020.81', purl: 'pkg:generic/dropbear@2020.81', license: 'MIT', category: 'NETWORK', cveCount: 1, highestCvss: 8.8 },
      { name: 'libcurl', version: '7.85.0', purl: 'pkg:generic/libcurl@7.85.0', license: 'MIT', category: 'NETWORK', cveCount: 2, highestCvss: 9.8 },
      { name: 'sqlite', version: '3.38.0', purl: 'pkg:generic/sqlite@3.38.0', license: 'Public Domain', category: 'DATABASE', cveCount: 0, highestCvss: 0 },
    ];

    vulnerabilities = [
      {
        cveId: 'CVE-2023-38545',
        componentName: 'libcurl',
        installedVersion: '7.85.0',
        patchedVersion: '8.4.0+',
        cvssScore: 9.8,
        severity: 'CRITICAL',
        cwe: 'CWE-122 (Heap-based Buffer Overflow)',
        isActivelyExploited: true, // 24시간 신고 대상
        summary: 'SOCKS5 프록시 핸드셰이크 처리 시 힙 기반 버퍼 오버플로우로 인해 원격 공격자가 임의의 코드를 실행(RCE)할 수 있음.',
        remediationAdvice: 'libcurl 버전을 8.4.0 이상으로 즉시 교체 빌드하거나 SOCKS5 프록시 호스트명 길이 제한 패치 적용 필수.',
      },
      {
        cveId: 'CVE-2023-0464',
        componentName: 'OpenSSL',
        installedVersion: '1.1.1u',
        patchedVersion: '3.0.8+ / 1.1.1t (EOL 대응)',
        cvssScore: 8.2,
        severity: 'HIGH',
        cwe: 'CWE-400 (Resource Exhaustion)',
        isActivelyExploited: false,
        summary: 'X.509 인증서 정책 트리 검증 시 과도한 CPU 연산을 유발하여 서비스 거부(DoS)를 유발함.',
        remediationAdvice: 'OpenSSL 3.1 LTS 브랜치로 마이그레이션 권고.',
      },
      {
        cveId: 'CVE-2022-37434',
        componentName: 'zlib',
        installedVersion: '1.2.11',
        patchedVersion: '1.2.12+',
        cvssScore: 9.8,
        severity: 'CRITICAL',
        cwe: 'CWE-787 (Out-of-bounds Write)',
        isActivelyExploited: true, // 24시간 신고 대상
        summary: 'inflate.c에서 gzread/inflate 역압축 시 힙 버퍼 오버플로우 발생으로 권한 탈취 가능.',
        remediationAdvice: 'zlib 버전을 1.2.13 이상으로 업데이트.',
      },
    ];
  } else if (/차량용|ivi|인포테인먼트/i.test(metadata.hardwareDevice)) {
    components = [
      { name: 'Automotive Grade Linux', version: '14.0.2', purl: 'pkg:generic/agl@14.0.2', license: 'GPL-2.0', category: 'OS_KERNEL', cveCount: 3, highestCvss: 9.8 },
      { name: 'wpa_supplicant', version: '2.9', purl: 'pkg:generic/wpa_supplicant@2.9', license: 'BSD-3-Clause', category: 'NETWORK', cveCount: 1, highestCvss: 8.1 },
      { name: 'bluez (Bluetooth)', version: '5.54', purl: 'pkg:generic/bluez@5.54', license: 'GPL-2.0', category: 'NETWORK', cveCount: 2, highestCvss: 8.8 },
    ];
    vulnerabilities = [
      {
        cveId: 'CVE-2021-3566',
        componentName: 'bluez',
        installedVersion: '5.54',
        patchedVersion: '5.59+',
        cvssScore: 8.8,
        severity: 'HIGH',
        cwe: 'CWE-416 (Use After Free)',
        isActivelyExploited: false,
        summary: '블루투스 페어링 시 메모리 해제 후 재사용 취약점으로 인한 차량 내부 CAN 버스 도달 가능성.',
        remediationAdvice: 'BlueZ 버전 5.66 이상으로 교체.',
      }
    ];
  } else {
    // 기본 스마트 미터기 / 산업용
    components = [
      { name: 'FreeRTOS Kernel', version: '10.5.1', purl: 'pkg:generic/freertos@10.5.1', license: 'MIT', category: 'OS_KERNEL', cveCount: 0, highestCvss: 0 },
      { name: 'mbedTLS', version: '3.4.1', purl: 'pkg:generic/mbedtls@3.4.1', license: 'Apache-2.0', category: 'CRYPTO', cveCount: 0, highestCvss: 0 },
      { name: 'lwIP TCP/IP', version: '2.2.0', purl: 'pkg:generic/lwip@2.2.0', license: 'BSD-3-Clause', category: 'NETWORK', cveCount: 0, highestCvss: 0 },
    ];
    vulnerabilities = [];
  }

  const criticalCves = vulnerabilities.filter((v) => v.severity === 'CRITICAL').length;
  const highCves = vulnerabilities.filter((v) => v.severity === 'HIGH').length;
  const activelyExploitedCves = vulnerabilities.filter((v) => v.isActivelyExploited).length;
  const is24hEnisaNoticeRequired = activelyExploitedCves > 0;

  // 점수 계산 (만점 100점에서 취약점별 감점)
  const penalty = criticalCves * 25 + highCves * 10;
  const overallSecurityScore = Math.max(20, 100 - penalty);

  const complianceStatus = is24hEnisaNoticeRequired
    ? 'CRITICAL_REPORT_REQUIRED'
    : criticalCves > 0 || highCves > 0
    ? 'WARNING'
    : 'PASS';

  // CycloneDX 1.5 JSON 자동 생성
  const cycloneDx = {
    bomFormat: 'CycloneDX',
    specVersion: '1.5',
    serialNumber: `urn:uuid:${Date.now()}-cra-compliance`,
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [{ vendor: 'FirmwareGuard EU', name: 'Binary CRA Inspector', version: '2.4.0' }],
      component: {
        type: 'firmware',
        name: metadata.firmwareName,
        version: '1.0.4',
        properties: [
          { name: 'cra:device_type', value: metadata.hardwareDevice },
          { name: 'cra:architecture', value: metadata.targetArchitecture },
        ],
      },
    },
    components: components.map((c) => ({
      type: 'library',
      name: c.name,
      version: c.version,
      purl: c.purl,
      licenses: [{ license: { id: c.license } }],
    })),
    vulnerabilities: vulnerabilities.map((v) => ({
      id: v.cveId,
      source: { name: 'NVD', url: `https://nvd.nist.gov/vuln/detail/${v.cveId}` },
      ratings: [{ score: v.cvssScore, severity: v.severity.toLowerCase(), method: 'CVSSv31' }],
      description: v.summary,
      analysis: {
        state: v.isActivelyExploited ? 'exploitable' : 'in_triage',
        detail: v.remediationAdvice,
      },
    })),
  };

  return {
    metadata,
    complianceStatus,
    overallSecurityScore,
    totalComponents: components.length,
    totalCves: vulnerabilities.length,
    criticalCves,
    highCves,
    activelyExploitedCves,
    is24hEnisaNoticeRequired,
    components,
    vulnerabilities,
    cycloneDxJson: JSON.stringify(cycloneDx, null, 2),
  };
}
