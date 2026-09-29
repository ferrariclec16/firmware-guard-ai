import { FirmwareMetadata } from './firmware-analyzer';

export interface FirmwarePreset {
  id: string;
  name: string;
  manufacturer: string;
  exportTarget: string;
  description: string;
  metadata: FirmwareMetadata;
}

export const MOCK_FIRMWARES: FirmwarePreset[] = [
  {
    id: 'iot-wallpad',
    name: '스마트홈 IoT 월패드 & 게이트웨이 펌웨어 v1.0.4',
    manufacturer: '(주)K-스마트일렉트로닉스',
    exportTarget: '독일, 프랑스 (EU 시장 수출 준비 중)',
    description: '유럽 수출을 위해 CE 마킹을 신청 중인 리눅스 기반 월패드로, libcurl 및 zlib 등 치명적 취약점 검출로 EU CRA Article 11에 따른 24시간 조기 경보 신고가 필수적인 상태.',
    metadata: {
      firmwareName: 'wallpad_arm64_eu_v1.0.4.bin',
      hardwareDevice: '스마트홈 월패드 게이트웨이',
      targetArchitecture: 'ARM64',
      osType: 'Embedded Linux 5.10.87 (Yocto)',
      fileSystem: 'SquashFS (Read-only rootfs)',
      binarySizeMb: 64.2,
      analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  },
  {
    id: 'automotive-ivi',
    name: '차량용 전장 인포테인먼트(IVI) 펌웨어 v2.8',
    manufacturer: '(주)글로벌오토모티브솔루션',
    exportTarget: '독일 폭스바겐/BMW 공급망 1차 벤더 납품',
    description: 'Automotive Grade Linux 기반 IVI 시스템으로, BlueZ 블루투스 메모리 취약점으로 인한 차량 내부 CAN 통신망 침투 위험 분석.',
    metadata: {
      firmwareName: 'ivi_telematics_agl_v2.8.img',
      hardwareDevice: '차량용 인포테인먼트 IVI 컨트롤러',
      targetArchitecture: 'ARM64',
      osType: 'Automotive Grade Linux (AGL 14.0)',
      fileSystem: 'ext4 / OverlayFS',
      binarySizeMb: 512.0,
      analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  },
  {
    id: 'industrial-plc',
    name: '산업용 스마트팩토리 모션 PLC 제어기 펌웨어',
    manufacturer: '(주)한국인더스트리얼',
    exportTarget: '유럽 스마트팩토리 공정 라인',
    description: 'FreeRTOS 및 실시간 통신 모듈 탑재 컨트롤러. 통신 스택 안전성 및 라이선스 고지 점검.',
    metadata: {
      firmwareName: 'plc_motion_cortex_m7_v3.elf',
      hardwareDevice: '산업용 모션 PLC 컨트롤러',
      targetArchitecture: 'ARM_CORTEX_M',
      osType: 'FreeRTOS v10.5.1',
      fileSystem: 'Raw Flash (No FS)',
      binarySizeMb: 4.8,
      analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  },
  {
    id: 'smart-meter',
    name: '유럽 표준 스마트 전력량계 미터기 v4.1 (통과 샘플)',
    manufacturer: '(주)한전에너지텍',
    exportTarget: '이탈리아 전력청 Enel 수출용',
    description: 'mbedTLS 및 최신 패치 적용 완료로 취약점 0건 달성. EU CRA 및 CE 마크 적합성 100% 통과.',
    metadata: {
      firmwareName: 'smart_meter_eu_ce_v4.1.hex',
      hardwareDevice: '유럽형 스마트 미터기',
      targetArchitecture: 'ARM_CORTEX_M',
      osType: 'Bare-metal / FreeRTOS',
      fileSystem: 'SPIFFS',
      binarySizeMb: 2.1,
      analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  },
];
