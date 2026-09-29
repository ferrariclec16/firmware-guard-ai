export interface CRAObligation {
  id: string;
  article: string;
  title: string;
  effectiveDate: string;
  penaltyMax: string;
  description: string;
  requiredAction: string;
}

export const CRA_ENFORCEMENT_DATES = {
  earlyWarning24h: '2026-09-11',
  sbomAndCeMarking: '2027-12-11',
};

export const CRA_PENALTIES = {
  maxFineEur: '€15,000,000 (약 220억 원)',
  maxFineTurnoverPct: '2.5% of worldwide turnover',
};

export const EU_CRA_STANDARDS: CRAObligation[] = [
  {
    id: 'CRA-ART-11-1',
    article: 'Article 11(1)',
    title: '적극적으로 악용되는 취약점 24시간 조기 경보 신고 의무',
    effectiveDate: '2026년 9월 11일 (시행 확정)',
    penaltyMax: '최대 1,500만 유로(약 220억 원) 또는 글로벌 연간 매출액의 2.5%',
    description: '제조사는 디지털 요소가 포함된 제품에서 적극적으로 악용되고 있는 취약점을 인지한 시점부터 24시간 이내에 EU 사이버보안기구(ENISA) 및 회원국 CSIRT에 조기 경보(Early Warning)를 통지해야 한다.',
    requiredAction: 'CVE 취약점 발견 즉시 24시간 내 ENISA 공인 양식 작성 및 자동 전자 통보 제출',
  },
  {
    id: 'CRA-ART-11-2',
    article: 'Article 11(2)',
    title: '72시간 내 정밀 취약점 분석 통보',
    effectiveDate: '2026년 9월 11일 (시행 확정)',
    penaltyMax: '최대 1,500만 유로(약 220억 원)',
    description: '조기 경보 이후 72시간 이내에 악용 완화 조치, 심각도 평가, 패치 가능성 여부를 포함한 상세 통보서를 업데이트해야 한다.',
    requiredAction: '영향도 분석 및 긴급 보안 패치 배포 계획서 첨부',
  },
  {
    id: 'CRA-ART-10-1',
    article: 'Article 10(1) & Annex I',
    title: '소프트웨어 자재명세서(SBOM) 생성 및 머신리더블 보관 의무',
    effectiveDate: '2027년 12월 11일 (전면 시행)',
    penaltyMax: 'EU 시장 전면 판매 금지 및 CE 마킹 박탈',
    description: '모든 IoT, 하드웨어 및 임베디드 펌웨어는 상용 출하 전 최소 1단계 이상의 의존성 트리를 포함하는 CycloneDX 또는 SPDX 규격의 SBOM을 기계 판독 가능한 형식으로 작성하여 보관해야 한다.',
    requiredAction: '펌웨어 바이너리 리버스엔지니어링을 통한 기계 판독형 CycloneDX 1.5 JSON 자동 생성',
  },
  {
    id: 'CRA-ART-10-6',
    article: 'Article 10(6)',
    title: '제품 수명 주기(최소 5년) 동안의 무상 보안 패치 제공',
    effectiveDate: '2027년 12월 11일',
    penaltyMax: '시정 명령 및 과태료',
    description: '제조사는 제품의 기대 수명(최소 5년) 동안 안전하게 보안 업데이트를 다운로드하고 설치할 수 있는 메커니즘을 제공해야 한다.',
    requiredAction: 'OTA(Over-The-Air) 보안 패치 무결성 검증 파이프라인 구축',
  }
];
