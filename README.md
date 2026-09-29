# FirmwareGuard EU (EU CRA 2026 임베디드 펌웨어 SBOM 자동 감사 AI SaaS)

> **Regulation (EU) 2024/2847 (Cyber Resilience Act) 완벽 대응**  
> 유럽 수출 하드웨어·IoT·전장 펌웨어 바이너리 리버스엔지니어링, **CycloneDX 1.5 규격 SBOM 자동 생성**, **CISA KEV 24시간 ENISA 조기 경보 신고서 자동 발급** 고난도 테크 SaaS.

[![EU CRA Compliance](https://img.shields.io/badge/EU_CRA-2026.09.11_Mandatory-red.svg)](https://eur-lex.europa.eu/)
[![CycloneDX 1.5](https://img.shields.io/badge/CycloneDX-1.5_Compliant-blue.svg)](https://cyclonedx.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 1. 개발 배경 및 규제 해자 (Regulatory Moat)

1. **EU 사이버복원력법(Cyber Resilience Act, CRA) 강제 발효**:
   - **2026년 9월 11일**: 활성 악용 취약점(CISA KEV 등) 인지 시 **24시간 이내 유럽연합 사이버보안기구(ENISA) 및 회원국 CSIRT 의무 신고** 발효.
   - **2027년 12월 11일**: 기계 판독형 SBOM(CycloneDX/SPDX) 보유 및 CE 마킹 심사 의무화.
   - **위반 시 과징금**: 최대 **€15,000,000(약 220억 원)** 또는 **글로벌 연간 매출액의 2.5%**.

2. **국내 하드웨어 수출 기업의 치명적인 공백**:
   - 스마트홈 월패드, 차량용 IVI/텔레매틱스, 산업용 PLC, 스마트 가전을 유럽에 수출하는 한국 제조사들은 대부분 소스코드 레벨의 SBOM 관리(Snyk, SonarQube)에 머물러 있음.
   - 하지만 유럽 Notified Body 인증기관과 ENISA는 **"실제 플래시 메모리에 구워진 최종 바이너리(.bin, .elf)"**의 SBOM과 취약점을 검증함.
   - **FirmwareGuard EU**는 바이너리 분석 기반 CycloneDX 1.5 SBOM 추출과 24시간 공식 조기 경보 리포트를 원클릭 생성하여 규제 리스크를 즉시 무력화합니다.

---

## 2. 핵심 기능 (Key Capabilities)

- **바이너리 리버스엔지니어링 & CycloneDX 1.5 SBOM 자동화**:
  - 임베디드 리눅스(Yocto, Buildroot), FreeRTOS, Automotive Grade Linux 바이너리에서 커널, 크립토, 네트워크 스택 패키지 식별 및 PURL(Package URL) 매핑.
- **실시간 악용 취약점(CISA KEV) & CVSS 3.1 정밀 매핑**:
  - 공개 NVD CVE 및 CISA Known Exploited Vulnerabilities(KEV)와 교차 검증하여 24시간 의무 신고 대상 취약점 즉시 판정.
- **ENISA Article 11(1) 24h 조기 경보 신고서 원클릭 발행**:
  - 법적 요건을 충족하는 공식 서식의 문서 자동 생성 및 인쇄/PDF 저장, 클립보드 복사 지원.
- **기계 판독형 규격 연동 (.cdx.json)**:
  - 유럽 CE 마킹 및 공급망 제출용 CycloneDX 1.5 JSON 규격 100% 호환 다운로드.

---

## 3. 기술 스택 (Tech Stack)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **Standard**: CycloneDX 1.5, Regulation (EU) 2024/2847, ENISA Reporting Format

---

## 4. 로컬 실행 방법 (Quick Start)

```bash
# 저장소 클론
git clone https://github.com/ferrariclec16/firmware-guard-ai.git
cd firmware-guard-ai

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 브라우저 접속
# http://localhost:3000
```

---

## 5. 라이선스

MIT License.
