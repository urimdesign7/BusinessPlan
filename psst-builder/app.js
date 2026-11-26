/* 3단계 PSST 사업계획서 & 예비창업패키지 PPT 빌더 */

const PRESETS = {
  realestate: {
    itemName: '부동산 특화 AI 마케팅 에이전트',
    oneLiner: '매물 분석·다채널 콘텐츠 제작·표시광고 법규 검수·24시간 리드 응대까지 원스톱 자동화',
    ideaDesc:
      '공인중개사와 분양 현장이 매물 주소와 사진만 입력하면 공공데이터(실거래가, 건축물대장, 학군·상권)를 결합해 매물 강점을 분석하고, 블로그·인스타·쇼츠용 홍보 콘텐츠를 자동 생성하며, 공인중개사법/표시광고법 위반 여부를 사전 검수하고 24시간 가망 고객 응대까지 수행하는 AI 마케팅 플랫폼입니다.',
    targetCustomer: '개업 공인중개사 및 중개법인, 분양대행사·시행사, 상업용 부동산 PM사',
    revenueModel: 'B2B SaaS 월 구독 (Starter/Pro/Enterprise) + 분양 현장 성과 연동형',
    problems:
      '다채널 콘텐츠 제작에 매물당 수 시간 소요, 표시광고법·공인중개사법 위반 과태료 리스크, 실거래가·상권 데이터 수작업 결합 비효율, 야간·임장 중 가망 고객 문의 유실',
    features:
      '매물·입지 분석 에이전트, 멀티모달 콘텐츠(블로그·카드뉴스·쇼츠·가상 홈 스테이징) 생성, 표시광고법 컴플라이언스 자동 검수, 24시간 리드 응대 및 임장 예약 CRM',
    founderName: '[대표자명] / 우림디자인',
    teamSummary: '부동산/마케팅 도메인 경험 + AI 멀티에이전트·풀스택 개발 역량',
  },
  tax: {
    itemName: '소상공인 맞춤형 AI 세무·노무 자동화 SaaS',
    oneLiner: '영수증·급여대장 업로드만으로 세무 신고 리스크 진단 및 4대보험·근로계약 자동 처리',
    ideaDesc:
      '10인 미만 소상공인과 자영업자가 복잡한 세법·근로기준법 변경을 몰라 겪는 가산세 및 노무 분쟁을 예방하기 위해, 매출·매입·근태 데이터를 자동 연동하여 부가세/종소세 예상 세액 시뮬레이션, 근로계약서 자동 생성, 지원금 매칭을 수행하는 AI 경영 비서 플랫폼입니다.',
    targetCustomer: '10인 미만 소상공인·자영업자, 초기 스타트업, 프랜차이즈 가맹점',
    revenueModel: '월 정기 구독(베이직/프로) + 세무사/노무사 연계 중개 수수료',
    problems:
      '기장 대리 비용 부담 및 실시간 세액 파악 불가, 잦은 근로기준법 개정으로 인한 노무 분쟁 리스크, 정부 지원금·세액공제 정보 누락',
    features:
      '실시간 세액·절세 시뮬레이터, AI 근로계약서·급여명세서 자동 발행, 정부 지원금 자동 매칭 알림, 제휴 세무사 원클릭 검토',
    founderName: '[대표자명] / [팀명]',
    teamSummary: '핀테크/세무 도메인 기획 + OCR·LLM 문서 자동화 엔지니어링',
  },
  senior: {
    itemName: '시니어 맞춤 AI 돌봄·건강 모니터링 플랫폼',
    oneLiner: '음성 기반 데일리 케어와 보호자 실시간 안심 리포트를 결합한 초고령사회 돌봄 솔루션',
    ideaDesc:
      '독거 노인 및 만성질환 시니어를 대상으로 매일 친숙한 AI 음성 말벗이 복약·식사·수면·인지 상태를 자연스럽게 체크하고, 이상 징후 감지 시 보호자 앱과 지역 돌봄 센터에 즉시 알림을 전송하는 시니어 헬스케어 플랫폼입니다.',
    targetCustomer: '4050 부양 자녀(B2C), 지자체 노인복지관·요양기관(B2G/B2B)',
    revenueModel: '보호자 월 구독 모델 + 지자체/요양기관 B2G·B2B 라이선스',
    problems:
      '맞벌이 자녀의 부모님 건강·안전 상시 확인 불가, 기존 웨어러블 기기의 낮은 시니어 착용률, 고독사 및 인지 저하 조기 발견 지연',
    features:
      '무설치·음성 기반 AI 말벗 케어, 복약·생활 리듬 이상 탐지 알고리즘, 보호자 주간 건강 리포트, 지자체 돌봄 관제 대시보드',
    founderName: '[대표자명] / [팀명]',
    teamSummary: '헬스케어 서비스 기획 + 음성 AI·이상탐지 모델링 역량',
  },
};

let currentPlan = null;
let currentSlides = [];
let currentStep = 1;
let maxUnlockedStep = 1;
let currentPresIdx = 0;
let currentTheme = 'navy';

const THEMES = {
  navy: { primary: '0F2544', secondary: '1E56A0', accent: '0EA5E9', soft: 'EEF4FB', bg: 'F8FAFC' },
  emerald: { primary: '064E3B', secondary: '047857', accent: '10B981', soft: 'ECFDF5', bg: 'F8FAFC' },
  burgundy: { primary: '4C0519', secondary: '881337', accent: 'D97706', soft: 'FFFBEB', bg: 'FDFAF7' },
  minimal: { primary: '18181B', secondary: '3F3F46', accent: '2563EB', soft: 'EFF6FF', bg: 'FFFFFF' },
};

const form = document.getElementById('ideaForm');
const genStatus = document.getElementById('genStatus');
const psstEditor = document.getElementById('psstEditor');
const slidesPreview = document.getElementById('slidesPreview');
const apiModal = document.getElementById('apiModal');
const apiStatusDot = document.getElementById('apiStatusDot');

// =========================================================
// Step Navigation
// =========================================================
function goToStep(step) {
  currentStep = step;
  if (step > maxUnlockedStep) maxUnlockedStep = step;

  document.querySelectorAll('.step-view').forEach((el) => el.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');

  document.querySelectorAll('.step-pill').forEach((pill) => {
    const s = Number(pill.dataset.step);
    pill.disabled = s > maxUnlockedStep;
    pill.classList.toggle('active', s === step);
    pill.classList.toggle('done', s < step || (s <= maxUnlockedStep && s !== step));
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.step-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    const target = Number(pill.dataset.step);
    if (target <= maxUnlockedStep) {
      if (target === 3 && currentPlan) {
        renderSlidesPreview(currentPlan);
      }
      if (target === 4 && currentPlan) {
        if (!currentSlides.length) currentSlides = buildSlidesFromPlan(currentPlan);
        renderPresentation();
      }
      goToStep(target);
    }
  });
});

document.getElementById('btnBackTo1').addEventListener('click', () => goToStep(1));
document.getElementById('btnGoTo3').addEventListener('click', () => {
  if (!currentPlan) return;
  renderSlidesPreview(currentPlan, true);
  maxUnlockedStep = Math.max(maxUnlockedStep, 4);
  goToStep(3);
});
document.getElementById('btnBackTo2').addEventListener('click', () => goToStep(2));
document.getElementById('btnSyncSlides').addEventListener('click', () => {
  if (!currentPlan) return;
  renderSlidesPreview(currentPlan, true);
});
document.getElementById('btnGoTo4').addEventListener('click', () => {
  if (!currentPlan) return;
  if (!currentSlides.length) currentSlides = buildSlidesFromPlan(currentPlan);
  currentPresIdx = 0;
  renderPresentation();
  goToStep(4);
});
document.getElementById('btnBackTo3').addEventListener('click', () => goToStep(3));

// =========================================================
// Preset Chips
// =========================================================
document.querySelectorAll('.chip[data-preset]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const p = PRESETS[chip.dataset.preset];
    if (!p) return;
    document.getElementById('itemName').value = p.itemName;
    document.getElementById('oneLiner').value = p.oneLiner;
    document.getElementById('ideaDesc').value = p.ideaDesc;
    document.getElementById('targetCustomer').value = p.targetCustomer;
    document.getElementById('revenueModel').value = p.revenueModel;
    document.getElementById('problems').value = p.problems;
    document.getElementById('features').value = p.features;
    document.getElementById('founderName').value = p.founderName;
    document.getElementById('teamSummary').value = p.teamSummary;
    genStatus.textContent = '예시 아이디어가 입력되었습니다. 아래 버튼을 눌러 2단계로 이동하세요.';
  });
});

document.getElementById('btnResetIdea').addEventListener('click', () => {
  form.reset();
  currentPlan = null;
  currentSlides = [];
  maxUnlockedStep = 1;
  psstEditor.innerHTML = '';
  slidesPreview.innerHTML = '';
  goToStep(1);
  genStatus.textContent = '입력란이 모두 초기화되었습니다. 새로운 아이디어를 입력해 주세요.';
  document.getElementById('itemName').focus();
});

// =========================================================
// API Modal
// =========================================================
function updateApiDot() {
  const key = localStorage.getItem('psst_gemini_key');
  if (key && key.trim().length > 10) {
    apiStatusDot.classList.remove('dot-off');
    apiStatusDot.classList.add('dot-on');
  } else {
    apiStatusDot.classList.remove('dot-on');
    apiStatusDot.classList.add('dot-off');
  }
}
updateApiDot();

document.getElementById('btnApiModal').addEventListener('click', () => {
  document.getElementById('geminiApiKey').value = localStorage.getItem('psst_gemini_key') || '';
  document.getElementById('geminiModel').value = localStorage.getItem('psst_gemini_model') || 'gemini-2.5-flash';
  apiModal.classList.remove('hidden');
});
document.getElementById('btnCloseModal').addEventListener('click', () => apiModal.classList.add('hidden'));
document.getElementById('btnSaveApi').addEventListener('click', () => {
  const key = document.getElementById('geminiApiKey').value.trim();
  const model = document.getElementById('geminiModel').value;
  if (key) localStorage.setItem('psst_gemini_key', key);
  else localStorage.removeItem('psst_gemini_key');
  localStorage.setItem('psst_gemini_model', model);
  updateApiDot();
  apiModal.classList.add('hidden');
});
document.getElementById('btnClearApi').addEventListener('click', () => {
  localStorage.removeItem('psst_gemini_key');
  document.getElementById('geminiApiKey').value = '';
  updateApiDot();
  apiModal.classList.add('hidden');
});

// =========================================================
// Step 1 -> Step 2 Generation
// =========================================================
form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleGenerate();
});

function splitItems(raw, fallbackList) {
  if (!raw || !raw.trim()) return fallbackList;
  const arr = raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return arr.length ? arr : fallbackList;
}

function buildLocalPlan(input) {
  const name = input.itemName || '신규 창업 아이템';
  const oneLiner = input.oneLiner || `${name} 기반 문제 해결 솔루션`;
  const target = input.targetCustomer || '디지털 전환이 필요한 핵심 B2B/B2C 고객';
  const bm = input.revenueModel || 'B2B SaaS 월 정기 구독 + 부가 서비스(Add-on)';
  const founder = input.founderName || '[대표자명 / 팀명]';
  const teamCap = input.teamSummary || '도메인 전문성 + AI·소프트웨어 개발 역량';

  const problemList = splitItems(input.problems, [
    '기존 수작업/오프라인 방식의 과도한 시간·인력 소모',
    '관련 법규·품질 기준 준수에 대한 실무 부담 및 리스크',
    '분산된 데이터의 결합·분석 및 의사결정 비효율',
    '실시간 고객 응대 지연으로 인한 유효 기회(리드) 유실',
  ]);

  const featureList = splitItems(input.features, [
    '핵심 데이터 자동 수집 및 AI 맞춤 분석 모듈',
    '원클릭 실무 산출물·콘텐츠 자동 생성 엔진',
    '품질·법규 리스크 사전 검수 및 안전 가이드',
    '24시간 자동 고객 응대 및 성과 분석 대시보드',
  ]);

  return {
    meta: {
      itemName: name,
      oneLiner,
      ideaDesc: input.ideaDesc,
      targetCustomer: target,
      revenueModel: bm,
      founderName: founder,
      teamSummary: teamCap,
    },
    problem: {
      motivation: [
        `디지털 전환 가속화에 따라 ${target} 영역에서도 데이터 기반의 신속한 업무 처리 및 마케팅 경쟁력이 핵심 성과 변수로 부상하고 있습니다.`,
        `그러나 현장 인력의 시간·전문 역량 부족으로 인해 '${input.ideaDesc.slice(0, 80)}...'와 같은 구조적 비효율이 지속되고 있습니다.`,
      ],
      painPoints: [0, 1, 2, 3].map((idx) => {
        const p = problemList[idx] || problemList[idx % problemList.length];
        return {
          title: `${idx + 1}. ${p.length > 18 ? p.slice(0, 18) + '…' : p}`,
          desc: p,
        };
      }),
      existingLimits: [
        { alt: '범용 AI / 일반 툴', limit: '도메인 특화 데이터·규제 미반영, 매번 수동 프롬프트 입력 필요', gap: '원클릭 자동화 및 정확도 검증 부재' },
        { alt: '외주 대행 / 컨설팅', limit: '높은 월 고정비와 소통 지연, 현장 상황 즉시 반영 불가', gap: '합리적 비용의 실시간 자체 대응 불가' },
        { alt: '기존 수작업 / 엑셀', limit: '반복 업무에 과도한 인력 투입 및 휴먼 에러 발생', gap: '데이터 기반 최적화 및 확장성 한계' },
      ],
    },
    solution: {
      overview: `${name}은(는) ${oneLiner}을(를) 목표로 설계된 도메인 특화 솔루션입니다. 사용자의 최소 입력만으로 데이터 분석부터 실행·검수·성과 관리까지 원스톱으로 처리합니다.`,
      workflow: [
        { step: 'STEP 1', title: '기초 정보 입력', desc: '핵심 조건 및 현장 자료 업로드' },
        { step: 'STEP 2', title: 'AI 데이터 분석', desc: '시장·고객 데이터 결합 및 USP 도출' },
        { step: 'STEP 3', title: '맞춤 결과 생성', desc: '채널·목적별 산출물 자동 제작' },
        { step: 'STEP 4', title: '리스크 검수', desc: '규제·품질 기준 자동 점검' },
        { step: 'STEP 5', title: '실행 & 성과 추적', desc: '자동 배포 및 고객 전환 관리' },
      ],
      modules: [0, 1, 2, 3].map((idx) => {
        const f = featureList[idx] || featureList[idx % featureList.length];
        return {
          code: `MODULE 0${idx + 1}`,
          title: f,
          bullets: [
            `${target}의 실제 업무 흐름에 맞춘 자동화 파이프라인 적용`,
            '기존 수작업 대비 처리 시간 70~80% 단축 및 오류 최소화',
            '축적된 실행 데이터를 기반으로 지속적인 성능 고도화',
          ],
        };
      }),
      roadmap: [
        { period: 'M+1 ~ M+3', title: 'MVP 핵심 엔진 구축', desc: '핵심 데이터 연동 및 1차 자동화 워크플로우 구현' },
        { period: 'M+4 ~ M+6', title: '클로즈드 베타(CBT)', desc: '초기 파트너 고객 10~20곳 파일럿 적용 및 피드백 반영' },
        { period: 'M+7 ~ M+9', title: '정식 서비스 출시', desc: '상용 구독 과금 시스템 오픈 및 통합 대시보드 제공' },
        { period: 'M+10 ~ M+12', title: 'AI 고도화 및 확장', desc: '성과 데이터 기반 자동 최적화 루프 및 API 제휴 확장' },
      ],
    },
    scaleup: {
      tamSamSom: [
        { tier: 'TAM (전체 시장)', desc: `${target}이 속한 국내 전체 디지털 전환 및 관련 소프트웨어·서비스 시장` },
        { tier: 'SAM (유효 시장)', desc: `즉각적인 업무 자동화 및 비용 절감 니즈가 높은 핵심 타겟 고객군` },
        { tier: 'SOM (초기 거점)', desc: `수도권 및 주요 거점 중심의 초기 얼리어답터 고객 확보 및 레퍼런스 구축` },
      ],
      pricing: [
        { name: 'Starter', price: '월 49,000원', target: '개인/초기 도입자', desc: '핵심 자동화 기능 및 기본 생성량 제공' },
        { name: 'Pro (주력)', price: '월 129,000원', target: '성장형 팀/사업자', desc: '전체 모듈 무제한·고급 분석 및 자동화 지원' },
        { name: 'Enterprise', price: '별도 협의', target: '법인/대형 파트너', desc: '다수 계정, 맞춤형 학습 및 기존 시스템 API 연동' },
      ],
      gtm: [
        { phase: 'PHASE 1 | 초기 진입', title: '무료 진단·체험 Hook 전략', desc: '핵심 페인포인트를 즉시 체감할 수 있는 무료 진단/체험 툴로 초기 DB 확보' },
        { phase: 'PHASE 2 | 레퍼런스 확산', title: '정량 성과 기반 B2B 영업', desc: '파일럿 고객의 시간 절감·매출 증대 사례를 중심으로 커뮤니티·협회 확산' },
        { phase: 'PHASE 3 | 생태계 제휴', title: '인접 플랫폼 API 파트너십', desc: '기존 업무 툴·CRM·결제/계약 솔루션과 연동하여 교차 판매 추진' },
        { phase: 'PHASE 4 | 스케일업', title: '인접 버티컬 & 글로벌 확장', desc: '검증된 AI 엔진을 기반으로 연관 산업군 및 해외 시장 순차 진출' },
      ],
      budget: [
        { pct: '50%', title: '제품 개발비', desc: 'AI 엔진·웹/앱 개발 인건비, 클라우드 및 API 인프라 구축' },
        { pct: '30%', title: '마케팅·영업비', desc: '초기 고객 확보 캠페인, 무료 체험 프로모션, 세일즈 자료 제작' },
        { pct: '20%', title: '자문·지재권·운영', desc: '전문가/법무 자문, 핵심 기술 특허 출원 및 일반 운영비' },
      ],
    },
    team: {
      members: [
        { role: 'CEO (대표자)', name: founder, desc: `사업 총괄, 비즈니스 모델 설계 및 파트너십 영업 (${teamCap})` },
        { role: 'CTO / AI Lead', name: '[핵심 인력 / 충원]', desc: 'AI 모델·에이전트 아키텍처, 데이터 파이프라인 및 백엔드 구축' },
        { role: 'Product / FE', name: '[핵심 인력 / 충원]', desc: '직관적인 노코드형 UI/UX 설계 및 웹 대시보드 프론트엔드 개발' },
        { role: 'Growth / CS', name: '[핵심 인력 / 충원]', desc: '초기 고객 온보딩, 전환율 분석 및 B2B 그로스 마케팅' },
      ],
      advisory: [
        `${target} 현업 실무자 자문 그룹을 통한 지속적인 현장 적합성 검증`,
        '법률·지식재산권·회계 전문가 자문을 통한 컴플라이언스 및 특허 확보',
        '디자인·콘텐츠 파트너 협력을 통한 완성도 높은 사용자 경험 구현',
      ],
    },
  };
}

async function generateWithGemini(input, apiKey, model) {
  const prompt = `당신은 대한민국 중소벤처기업부 예비창업패키지 심사위원 수준의 스타트업 사업계획서 전문가입니다.
아래 창업 아이디어를 바탕으로 PSST 4단계(Problem, Solution, Scale-up, Team) 사업계획서 데이터를 JSON 형식으로 작성하세요.

[입력 정보]
- 창업 아이템명: ${input.itemName}
- 한 줄 가치 제안: ${input.oneLiner}
- 핵심 아이디어 설명: ${input.ideaDesc}
- 목표 고객: ${input.targetCustomer || '자동 추론'}
- 수익 모델: ${input.revenueModel || '자동 추론'}
- 해결하려는 문제: ${input.problems || '자동 추론'}
- 핵심 기능/기술: ${input.features || '자동 추론'}
- 대표자/팀: ${input.founderName || '[대표자명]'} / ${input.teamSummary || '자동 추론'}

반드시 아래 JSON 스키마만 출력하세요 (설명 텍스트 없이 순수 JSON):
{
  "meta": { "itemName": "", "oneLiner": "", "ideaDesc": "", "targetCustomer": "", "revenueModel": "", "founderName": "", "teamSummary": "" },
  "problem": {
    "motivation": ["문장1", "문장2"],
    "painPoints": [{"title": "", "desc": ""}, {"title": "", "desc": ""}, {"title": "", "desc": ""}, {"title": "", "desc": ""}],
    "existingLimits": [{"alt": "", "limit": "", "gap": ""}, {"alt": "", "limit": "", "gap": ""}, {"alt": "", "limit": "", "gap": ""}]
  },
  "solution": {
    "overview": "",
    "workflow": [{"step": "STEP 1", "title": "", "desc": ""}, {"step": "STEP 2", "title": "", "desc": ""}, {"step": "STEP 3", "title": "", "desc": ""}, {"step": "STEP 4", "title": "", "desc": ""}, {"step": "STEP 5", "title": "", "desc": ""}],
    "modules": [{"code": "MODULE 01", "title": "", "bullets": ["", "", ""]}, {"code": "MODULE 02", "title": "", "bullets": ["", "", ""]}, {"code": "MODULE 03", "title": "", "bullets": ["", "", ""]}, {"code": "MODULE 04", "title": "", "bullets": ["", "", ""]}],
    "roadmap": [{"period": "M+1 ~ M+3", "title": "", "desc": ""}, {"period": "M+4 ~ M+6", "title": "", "desc": ""}, {"period": "M+7 ~ M+9", "title": "", "desc": ""}, {"period": "M+10 ~ M+12", "title": "", "desc": ""}]
  },
  "scaleup": {
    "tamSamSom": [{"tier": "TAM (전체 시장)", "desc": ""}, {"tier": "SAM (유효 시장)", "desc": ""}, {"tier": "SOM (초기 거점)", "desc": ""}],
    "pricing": [{"name": "Starter", "price": "", "target": "", "desc": ""}, {"name": "Pro", "price": "", "target": "", "desc": ""}, {"name": "Enterprise", "price": "", "target": "", "desc": ""}],
    "gtm": [{"phase": "PHASE 1", "title": "", "desc": ""}, {"phase": "PHASE 2", "title": "", "desc": ""}, {"phase": "PHASE 3", "title": "", "desc": ""}, {"phase": "PHASE 4", "title": "", "desc": ""}],
    "budget": [{"pct": "50%", "title": "제품 개발비", "desc": ""}, {"pct": "30%", "title": "마케팅·영업비", "desc": ""}, {"pct": "20%", "title": "자문·지재권·운영", "desc": ""}]
  },
  "team": {
    "members": [{"role": "CEO (대표자)", "name": "", "desc": ""}, {"role": "CTO / AI Lead", "name": "", "desc": ""}, {"role": "Product / FE", "name": "", "desc": ""}, {"role": "Growth / CS", "name": "", "desc": ""}],
    "advisory": ["", "", ""]
  }
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini API 오류 (${res.status})`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('응답을 파싱할 수 없습니다.');
  return JSON.parse(text);
}

async function handleGenerate() {
  const input = {
    itemName: document.getElementById('itemName').value.trim(),
    oneLiner: document.getElementById('oneLiner').value.trim(),
    ideaDesc: document.getElementById('ideaDesc').value.trim(),
    targetCustomer: document.getElementById('targetCustomer').value.trim(),
    revenueModel: document.getElementById('revenueModel').value.trim(),
    problems: document.getElementById('problems').value.trim(),
    features: document.getElementById('features').value.trim(),
    founderName: document.getElementById('founderName').value.trim(),
    teamSummary: document.getElementById('teamSummary').value.trim(),
  };

  if (!input.itemName || !input.ideaDesc) {
    genStatus.textContent = '창업 아이템명과 핵심 아이디어 설명을 입력해 주세요.';
    return;
  }

  const btn = document.getElementById('btnGenerate');
  btn.disabled = true;
  const apiKey = localStorage.getItem('psst_gemini_key');
  const model = localStorage.getItem('psst_gemini_model') || 'gemini-2.5-flash';

  try {
    if (apiKey && apiKey.trim().length > 10) {
      genStatus.textContent = `🤖 Gemini (${model})로 PSST 4단계 사업계획서를 생성 중입니다...`;
      currentPlan = await generateWithGemini(input, apiKey.trim(), model);
      genStatus.textContent = '';
    } else {
      genStatus.textContent = '⚡ PSST 4단계 사업계획서를 생성 중입니다...';
      currentPlan = buildLocalPlan(input);
      genStatus.textContent = '';
    }
  } catch (err) {
    console.warn(err);
    currentPlan = buildLocalPlan(input);
    genStatus.textContent = `⚠️ AI API 호출 실패(${err.message})로 내장 PSST 엔진으로 생성했습니다.`;
  } finally {
    btn.disabled = false;
  }

  renderPsstEditor(currentPlan);
  maxUnlockedStep = Math.max(maxUnlockedStep, 2);
  goToStep(2);
}

// =========================================================
// Step 2: Editable PSST 4-Stage Editor
// =========================================================
function escAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setByPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = /^\d+$/.test(keys[i]) ? Number(keys[i]) : keys[i];
    cur = cur[k];
  }
  const last = /^\d+$/.test(keys[keys.length - 1]) ? Number(keys[keys.length - 1]) : keys[keys.length - 1];
  cur[last] = value;
}

function renderPsstEditor(plan) {
  const { meta, problem, solution, scaleup, team } = plan;

  psstEditor.innerHTML = `
    <!-- 0. 사업 개요 -->
    <div class="psst-section">
      <div class="psst-section-header"><span class="pill">SUMMARY</span> 0. 사업 개요 (Executive Summary)</div>
      <div class="psst-section-body">
        <div class="edit-grid-2">
          <div class="field-group">
            <label>창업 아이템명</label>
            <input type="text" data-bind="meta.itemName" value="${escAttr(meta.itemName)}" />
          </div>
          <div class="field-group">
            <label>핵심 가치 제안 (한 줄 요약)</label>
            <input type="text" data-bind="meta.oneLiner" value="${escAttr(meta.oneLiner)}" />
          </div>
        </div>
        <div class="field-group">
          <label>아이디어 핵심 요약</label>
          <textarea rows="3" data-bind="meta.ideaDesc">${escHtml(meta.ideaDesc)}</textarea>
        </div>
        <div class="edit-grid-2">
          <div class="field-group">
            <label>목표 고객 (B2B/B2C)</label>
            <input type="text" data-bind="meta.targetCustomer" value="${escAttr(meta.targetCustomer)}" />
          </div>
          <div class="field-group">
            <label>수익 모델 (BM)</label>
            <input type="text" data-bind="meta.revenueModel" value="${escAttr(meta.revenueModel)}" />
          </div>
        </div>
      </div>
    </div>

    <!-- 1. Problem -->
    <div class="psst-section">
      <div class="psst-section-header"><span class="pill">P</span> 1. Problem (문제인식)</div>
      <div class="psst-section-body">
        <div>
          <h4 class="sub-title">1-1. 개발 동기 및 시장 배경</h4>
          <div class="edit-grid-2">
            ${problem.motivation
              .map(
                (m, i) => `
              <div class="field-group">
                <label>배경 ${i + 1}</label>
                <textarea rows="3" data-bind="problem.motivation.${i}">${escHtml(m)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">1-2. 목표 시장의 핵심 문제 (Pain Point 4가지)</h4>
          <div class="edit-grid-4">
            ${problem.painPoints
              .map(
                (p, i) => `
              <div class="edit-card">
                <div class="edit-card-label">문제 ${i + 1}</div>
                <input type="text" data-bind="problem.painPoints.${i}.title" value="${escAttr(p.title)}" placeholder="문제 제목" />
                <textarea rows="2" data-bind="problem.painPoints.${i}.desc" placeholder="상세 설명">${escHtml(p.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">1-3. 기존 대안의 한계</h4>
          <div class="edit-grid-3">
            ${problem.existingLimits
              .map(
                (e, i) => `
              <div class="edit-card">
                <div class="edit-card-label">기존 대안 ${i + 1}</div>
                <input type="text" data-bind="problem.existingLimits.${i}.alt" value="${escAttr(e.alt)}" placeholder="대안명" />
                <textarea rows="2" data-bind="problem.existingLimits.${i}.limit" placeholder="주요 한계점">${escHtml(e.limit)}</textarea>
                <input type="text" data-bind="problem.existingLimits.${i}.gap" value="${escAttr(e.gap)}" placeholder="미충족 니즈" />
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Solution -->
    <div class="psst-section">
      <div class="psst-section-header"><span class="pill">S</span> 2. Solution (실현가능성)</div>
      <div class="psst-section-body">
        <div class="field-group">
          <h4 class="sub-title">2-1. 솔루션 개요</h4>
          <textarea rows="2" data-bind="solution.overview">${escHtml(solution.overview)}</textarea>
        </div>

        <div>
          <h4 class="sub-title">2-2. 원스톱 워크플로우 (5단계)</h4>
          <div class="edit-grid-3">
            ${solution.workflow
              .map(
                (w, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(w.step)}</div>
                <input type="text" data-bind="solution.workflow.${i}.title" value="${escAttr(w.title)}" />
                <input type="text" data-bind="solution.workflow.${i}.desc" value="${escAttr(w.desc)}" />
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">2-3. 핵심 기능 및 기술 모듈 (4대 모듈)</h4>
          <div class="edit-grid-4">
            ${solution.modules
              .map(
                (m, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(m.code)}</div>
                <input type="text" data-bind="solution.modules.${i}.title" value="${escAttr(m.title)}" />
                <textarea rows="3" data-bind-bullets="solution.modules.${i}.bullets">${escHtml(m.bullets.join('\n'))}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">2-4. 단계별 기술 개발 로드맵 (12개월)</h4>
          <div class="edit-grid-4">
            ${solution.roadmap
              .map(
                (r, i) => `
              <div class="edit-card">
                <input type="text" data-bind="solution.roadmap.${i}.period" value="${escAttr(r.period)}" />
                <input type="text" data-bind="solution.roadmap.${i}.title" value="${escAttr(r.title)}" />
                <textarea rows="2" data-bind="solution.roadmap.${i}.desc">${escHtml(r.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Scale-up -->
    <div class="psst-section">
      <div class="psst-section-header"><span class="pill">S</span> 3. Scale-up (성장전략)</div>
      <div class="psst-section-body">
        <div>
          <h4 class="sub-title">3-1. 목표 시장 규모 (TAM - SAM - SOM)</h4>
          <div class="edit-grid-3">
            ${scaleup.tamSamSom
              .map(
                (t, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(t.tier)}</div>
                <textarea rows="2" data-bind="scaleup.tamSamSom.${i}.desc">${escHtml(t.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">3-2. 수익 모델 (요금제 티어)</h4>
          <div class="edit-grid-3">
            ${scaleup.pricing
              .map(
                (p, i) => `
              <div class="edit-card">
                <input type="text" data-bind="scaleup.pricing.${i}.name" value="${escAttr(p.name)}" />
                <input type="text" data-bind="scaleup.pricing.${i}.price" value="${escAttr(p.price)}" />
                <input type="text" data-bind="scaleup.pricing.${i}.target" value="${escAttr(p.target)}" />
                <textarea rows="2" data-bind="scaleup.pricing.${i}.desc">${escHtml(p.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">3-3. 시장 진입(GTM) 및 확장 전략</h4>
          <div class="edit-grid-4">
            ${scaleup.gtm
              .map(
                (g, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(g.phase)}</div>
                <input type="text" data-bind="scaleup.gtm.${i}.title" value="${escAttr(g.title)}" />
                <textarea rows="2" data-bind="scaleup.gtm.${i}.desc">${escHtml(g.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">3-4. 정부지원사업비 집행 계획</h4>
          <div class="edit-grid-3">
            ${scaleup.budget
              .map(
                (b, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(b.title)} (${escHtml(b.pct)})</div>
                <input type="text" data-bind="scaleup.budget.${i}.pct" value="${escAttr(b.pct)}" />
                <textarea rows="2" data-bind="scaleup.budget.${i}.desc">${escHtml(b.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Team -->
    <div class="psst-section">
      <div class="psst-section-header"><span class="pill">T</span> 4. Team (팀 구성)</div>
      <div class="psst-section-body">
        <div>
          <h4 class="sub-title">4-1. 대표자 및 핵심 팀원 구성</h4>
          <div class="edit-grid-4">
            ${team.members
              .map(
                (m, i) => `
              <div class="edit-card">
                <div class="edit-card-label">${escHtml(m.role)}</div>
                <input type="text" data-bind="team.members.${i}.name" value="${escAttr(m.name)}" />
                <textarea rows="2" data-bind="team.members.${i}.desc">${escHtml(m.desc)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <h4 class="sub-title">4-2. 외부 전문가 자문단 및 파트너십</h4>
          <div class="edit-grid-3">
            ${team.advisory
              .map(
                (a, i) => `
              <div class="field-group">
                <label>협력 네트워크 ${i + 1}</label>
                <textarea rows="2" data-bind="team.advisory.${i}">${escHtml(a)}</textarea>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind live editing listeners
  psstEditor.querySelectorAll('[data-bind]').forEach((el) => {
    el.addEventListener('input', () => {
      setByPath(currentPlan, el.dataset.bind, el.value);
    });
  });

  psstEditor.querySelectorAll('[data-bind-bullets]').forEach((el) => {
    el.addEventListener('input', () => {
      const lines = el.value
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      setByPath(currentPlan, el.dataset.bindBullets, lines);
    });
  });
}

// =========================================================
// Step 3: Slides Preview & Export
// =========================================================
function buildSlidesFromPlan(plan) {
  const { meta, problem, solution, scaleup, team } = plan;
  return [
    { num: 1, tag: 'COVER', title: meta.itemName, pts: [meta.oneLiner, `발표자: ${meta.founderName}`, `목표 고객: ${meta.targetCustomer}`] },
    { num: 2, tag: 'OVERVIEW', title: '사업 개요 및 PSST 목차', pts: [`아이템명: ${meta.itemName}`, `가치 제안: ${meta.oneLiner}`, `목표 고객: ${meta.targetCustomer}`, `수익 모델: ${meta.revenueModel}`] },
    { num: 3, tag: '1. PROBLEM', title: '개발 동기 및 시장 배경', pts: [...problem.motivation, `아이디어 요약: ${meta.ideaDesc}`] },
    { num: 4, tag: '1. PROBLEM', title: '핵심 문제 & 기존 대안의 한계', pts: [...problem.painPoints.map((p) => `${p.title}: ${p.desc}`), ...problem.existingLimits.map((e) => `[${e.alt}] ${e.limit} → ${e.gap}`)] },
    { num: 5, tag: '2. SOLUTION', title: '솔루션 개요 & 5단계 워크플로우', pts: [solution.overview, ...solution.workflow.map((w) => `${w.step} ${w.title}: ${w.desc}`)] },
    { num: 6, tag: '2. SOLUTION', title: '핵심 기술 및 4대 기능 모듈', pts: solution.modules.map((m) => `[${m.code}] ${m.title}: ${m.bullets.join(' / ')}`) },
    { num: 7, tag: '2. SOLUTION', title: '단계별 기술 개발 로드맵 (12개월)', pts: solution.roadmap.map((r) => `${r.period} | ${r.title}: ${r.desc}`) },
    { num: 8, tag: '3. SCALE-UP', title: '목표 시장(TAM-SAM-SOM) & 수익 모델', pts: [...scaleup.tamSamSom.map((t) => `${t.tier}: ${t.desc}`), ...scaleup.pricing.map((p) => `${p.name} (${p.price}, ${p.target}): ${p.desc}`)] },
    { num: 9, tag: '3. SCALE-UP', title: 'GTM(시장 진입) 및 확장 전략', pts: scaleup.gtm.map((g) => `${g.phase} ${g.title}: ${g.desc}`) },
    { num: 10, tag: '3. SCALE-UP', title: '협약기간 추진 일정 & 사업비 집행', pts: ['M1~M4: 시장 검증 및 MVP 핵심 기능 개발', 'M5~M8: 파일럿(CBT) 운영 및 정식 서비스 출시', 'M9~M10: 유료 고객 확보 및 성과 최적화', ...scaleup.budget.map((b) => `${b.pct} ${b.title}: ${b.desc}`)] },
    { num: 11, tag: '4. TEAM', title: '팀 구성 역량 & 외부 자문 네트워크', pts: [...team.members.map((m) => `${m.role} (${m.name}): ${m.desc}`), ...team.advisory.map((a) => `자문/협력: ${a}`)] },
    { num: 12, tag: 'CLOSING', title: 'THANK YOU / Q&A', pts: [meta.oneLiner, `${meta.itemName} | ${meta.founderName}`] },
  ];
}

function renderSlidesPreview(plan, forceRebuild = false) {
  const { meta } = plan;
  document.getElementById('pptBannerTitle').textContent = `${meta.itemName} — 예비창업패키지 발표자료 (총 12슬라이드)`;

  if (forceRebuild || !currentSlides.length) {
    currentSlides = buildSlidesFromPlan(plan);
  }

  slidesPreview.innerHTML = currentSlides
    .map(
      (c, idx) => `
      <div class="slide-card">
        <div class="slide-card-top">
          <span>${escHtml(c.tag)}</span>
          <span>Slide ${c.num} / 12</span>
        </div>
        <div class="slide-card-body">
          <div class="slide-edit-label">슬라이드 제목</div>
          <input type="text" class="slide-title-input" data-slide-title="${idx}" value="${escAttr(c.title)}" />
          <div class="slide-edit-label">슬라이드 내용 (줄바꿈으로 항목 구분)</div>
          <textarea rows="5" class="slide-points-input" data-slide-pts="${idx}">${escHtml(c.pts.join('\n'))}</textarea>
        </div>
      </div>`
    )
    .join('');

  slidesPreview.querySelectorAll('[data-slide-title]').forEach((el) => {
    el.addEventListener('input', () => {
      currentSlides[Number(el.dataset.slideTitle)].title = el.value;
    });
  });

  slidesPreview.querySelectorAll('[data-slide-pts]').forEach((el) => {
    el.addEventListener('input', () => {
      currentSlides[Number(el.dataset.slidePts)].pts = el.value
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    });
  });
}

function buildMarkdown(plan) {
  const { meta, problem, solution, scaleup, team } = plan;
  return `# [사업계획서] ${meta.itemName} (PSST 기반)

## 0. 사업 개요 (Executive Summary)
| 항목 | 내용 |
| :--- | :--- |
| **창업 아이템명** | ${meta.itemName} |
| **핵심 가치 제안** | ${meta.oneLiner} |
| **아이디어 요약** | ${meta.ideaDesc} |
| **목표 고객** | ${meta.targetCustomer} |
| **수익 모델** | ${meta.revenueModel} |

---

## 1. Problem (문제인식)
### 1-1. 개발 동기 및 시장 배경
${problem.motivation.map((m) => `- ${m}`).join('\n')}

### 1-2. 목표 시장의 핵심 문제 (Pain Point)
${problem.painPoints.map((p) => `- **${p.title}**: ${p.desc}`).join('\n')}

### 1-3. 기존 대안의 한계
| 기존 대안 | 주요 한계점 | 미충족 니즈 |
| :--- | :--- | :--- |
${problem.existingLimits.map((e) => `| **${e.alt}** | ${e.limit} | ${e.gap} |`).join('\n')}

---

## 2. Solution (실현가능성)
### 2-1. 솔루션 개요
${solution.overview}

### 2-2. 핵심 기능 및 모듈
${solution.modules.map((m) => `1. **[${m.code}] ${m.title}**\n${m.bullets.map((b) => `   - ${b}`).join('\n')}`).join('\n')}

### 2-3. 단계별 개발 로드맵
${solution.roadmap.map((r) => `- **${r.period} (${r.title})**: ${r.desc}`).join('\n')}

---

## 3. Scale-up (성장전략)
### 3-1. 목표 시장 (TAM-SAM-SOM)
${scaleup.tamSamSom.map((t) => `- **${t.tier}**: ${t.desc}`).join('\n')}

### 3-2. 수익 모델
${scaleup.pricing.map((p) => `- **${p.name} (${p.price})** [${p.target}]: ${p.desc}`).join('\n')}

### 3-3. 시장 진입(GTM) 전략
${scaleup.gtm.map((g) => `- **${g.phase} - ${g.title}**: ${g.desc}`).join('\n')}

### 3-4. 사업비 집행 계획
${scaleup.budget.map((b) => `- **${b.title} (${b.pct})**: ${b.desc}`).join('\n')}

---

## 4. Team (팀 구성)
### 4-1. 핵심 팀원
| 직책 | 성명/상태 | 핵심 역량 및 역할 |
| :--- | :--- | :--- |
${team.members.map((m) => `| **${m.role}** | ${m.name} | ${m.desc} |`).join('\n')}

### 4-2. 외부 협력 네트워크
${team.advisory.map((a) => `- ${a}`).join('\n')}
`;
}

function downloadMarkdown() {
  if (!currentPlan) return;
  const text = buildMarkdown(currentPlan);
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentPlan.meta.itemName.replace(/[\\/:*?"<>|]/g, '_')}_사업계획서_PSST.md`;
  a.click();
}

document.getElementById('btnDownloadMd2').addEventListener('click', downloadMarkdown);
document.getElementById('btnDownloadMd3').addEventListener('click', downloadMarkdown);
document.getElementById('btnPrint').addEventListener('click', () => window.print());

function triggerPptxDownload() {
  if (!currentPlan) return;
  if (typeof PptxGenJS === 'undefined') {
    alert('PPTX 생성 라이브러리가 로드되지 않았습니다.');
    return;
  }
  const slidesData = currentSlides.length ? currentSlides : buildSlidesFromPlan(currentPlan);
  exportPptx(currentPlan, slidesData);
}

document.getElementById('btnDownloadPptx').addEventListener('click', triggerPptxDownload);
document.getElementById('btnDownloadPptx4').addEventListener('click', triggerPptxDownload);

function exportPptx(plan, slidesData) {
  const { meta } = plan;
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = `${meta.itemName} - 예비창업패키지 사업계획서`;

  const t = THEMES[currentTheme] || THEMES.navy;
  const C = {
    navy: t.primary,
    blue: t.secondary,
    teal: t.accent,
    tealDark: t.accent,
    bgLight: t.bg,
    bgSoft: t.soft,
    border: 'CBD5E1',
    textDark: '1E293B',
    textMuted: '64748B',
    white: 'FFFFFF',
  };
  const FONT = '맑은 고딕';

  const header = (s, badge, title, num) => {
    s.background = { color: C.bgLight };
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal } });
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 0.25, w: 1.7, h: 0.3, fill: { color: C.navy }, rectRadius: 0.08 });
    s.addText(badge, { x: 0.5, y: 0.25, w: 1.7, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle' });
    s.addText(title, { x: 2.35, y: 0.22, w: 7.1, h: 0.38, fontFace: FONT, fontSize: 17.5, bold: true, color: C.navy, valign: 'middle' });
    s.addShape(pptx.ShapeType.line, { x: 0.5, y: 0.68, w: 9.0, h: 0, line: { color: C.border, width: 1 } });
    s.addText(`${meta.itemName} | 예비창업패키지 사업계획서 (PSST)`, { x: 0.5, y: 5.3, w: 7.5, h: 0.25, fontFace: FONT, fontSize: 8.5, color: C.textMuted });
    s.addText(`${num} / ${slidesData.length}`, { x: 8.5, y: 5.3, w: 1.0, h: 0.25, fontFace: FONT, fontSize: 8.5, bold: true, color: C.navy, align: 'right' });
  };

  const card = (s, x, y, w, h, fill = C.white, border = C.border) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: border, width: 1 }, rectRadius: 0.08 });
  };

  slidesData.forEach((sl, idx) => {
    const s = pptx.addSlide();
    const pts = sl.pts && sl.pts.length ? sl.pts : ['내용을 입력해 주세요.'];

    // Cover Slide (Slide 1)
    if (idx === 0) {
      s.background = { color: C.navy };
      s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.teal } });
      s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.05, w: 2.8, h: 0.38, fill: { color: C.blue }, rectRadius: 0.08 });
      s.addText('예비창업패키지 사업계획서 발표자료', { x: 0.8, y: 1.05, w: 2.8, h: 0.38, fontFace: FONT, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle' });
      s.addText(sl.title, { x: 0.8, y: 1.68, w: 8.5, h: 0.9, fontFace: FONT, fontSize: 32, bold: true, color: C.white });
      s.addText(pts[0] || '', { x: 0.8, y: 2.75, w: 8.4, h: 0.9, fontFace: FONT, fontSize: 15, color: 'E2E8F0', lineSpacingMultiple: 1.3 });
      s.addShape(pptx.ShapeType.line, { x: 0.8, y: 4.2, w: 8.4, h: 0, line: { color: C.blue, width: 1.2 } });
      s.addText(pts.slice(1).join('   |   '), { x: 0.8, y: 4.4, w: 8.4, h: 0.4, fontFace: FONT, fontSize: 11, color: 'CBD5E1' });
      return;
    }

    // Closing Slide (Last Slide)
    if (idx === slidesData.length - 1) {
      s.background = { color: C.navy };
      s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.teal } });
      s.addText(sl.title, { x: 0.8, y: 1.5, w: 8.4, h: 0.6, fontFace: FONT, fontSize: 32, bold: true, color: C.teal, align: 'center' });
      s.addText(pts[0] || '', { x: 0.8, y: 2.25, w: 8.4, h: 0.7, fontFace: FONT, fontSize: 17, bold: true, color: C.white, align: 'center' });
      s.addText(pts.slice(1).join('   |   '), { x: 0.8, y: 3.1, w: 8.4, h: 0.5, fontFace: FONT, fontSize: 12.5, color: 'CBD5E1', align: 'center' });
      return;
    }

    // Content Slides (Slides 2..11)
    header(s, sl.tag, sl.title, sl.num);

    if (pts.length <= 3) {
      const boxH = (4.15 - (pts.length - 1) * 0.18) / pts.length;
      pts.forEach((pt, i) => {
        const y = 0.9 + i * (boxH + 0.18);
        card(s, 0.5, y, 9.0, boxH, i === 0 ? C.bgSoft : C.white, i === 0 ? C.teal : C.border);
        s.addShape(pptx.ShapeType.rect, { x: 0.5, y, w: 0.12, h: boxH, fill: { color: i === 0 ? C.teal : C.navy } });
        s.addText(pt, { x: 0.8, y: y + 0.1, w: 8.5, h: boxH - 0.2, fontFace: FONT, fontSize: 11.5, color: C.textDark, valign: 'middle', lineSpacingMultiple: 1.3 });
      });
    } else if (pts.length <= 6) {
      const rows = Math.ceil(pts.length / 2);
      const boxH = (4.15 - (rows - 1) * 0.16) / rows;
      pts.forEach((pt, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 0.5 + col * 4.6;
        const y = 0.9 + row * (boxH + 0.16);
        card(s, x, y, 4.4, boxH, C.white, C.blue);
        s.addShape(pptx.ShapeType.roundRect, { x: x + 0.15, y: y + 0.14, w: 0.34, h: 0.28, fill: { color: C.teal }, rectRadius: 0.05 });
        s.addText(String(i + 1), { x: x + 0.15, y: y + 0.14, w: 0.34, h: 0.28, fontFace: FONT, fontSize: 9.5, bold: true, color: C.white, align: 'center', valign: 'middle' });
        s.addText(pt, { x: x + 0.58, y: y + 0.12, w: 3.68, h: boxH - 0.24, fontFace: FONT, fontSize: 10, color: C.textDark, valign: 'middle', lineSpacingMultiple: 1.25 });
      });
    } else {
      card(s, 0.5, 0.9, 9.0, 4.2, C.white, C.border);
      s.addText(pts.map((pt) => `• ${pt}`).join('\n'), {
        x: 0.75, y: 1.05, w: 8.5, h: 3.9,
        fontFace: FONT, fontSize: 10.5, color: C.textDark, valign: 'top', lineSpacingMultiple: 1.32,
      });
    }
  });

  const fileName = `${meta.itemName.replace(/[\\/:*?"<>|]/g, '_')}_예비창업패키지_발표자료.pptx`;
  pptx.writeFile({ fileName });
}

// =========================================================
// Step 4: Presentation Stage Renderer & Controls
// =========================================================
function renderPresentation() {
  if (!currentPlan || !currentSlides.length) return;
  const stage = document.getElementById('presStage');
  const thumbs = document.getElementById('presThumbs');
  const counter = document.getElementById('presCounter');

  stage.className = `pres-stage theme-${currentTheme}`;
  const sl = currentSlides[currentPresIdx] || currentSlides[0];
  const pts = sl.pts && sl.pts.length ? sl.pts : ['내용을 입력해 주세요.'];
  const total = currentSlides.length;

  if (currentPresIdx === 0) {
    stage.innerHTML = `
      <div class="pres-hero">
        <span class="pres-hero-badge">예비창업패키지 사업계획서 발표자료</span>
        <h2 class="pres-hero-title">${escHtml(sl.title)}</h2>
        <p class="pres-hero-sub">${escHtml(pts[0] || '')}</p>
        <div class="pres-hero-meta">${escHtml(pts.slice(1).join('   |   '))}</div>
      </div>
    `;
  } else if (currentPresIdx === total - 1) {
    stage.innerHTML = `
      <div class="pres-hero closing">
        <h2 class="pres-hero-title">${escHtml(sl.title)}</h2>
        <p class="pres-hero-sub">${escHtml(pts[0] || '')}</p>
        <div class="pres-hero-meta">${escHtml(pts.slice(1).join('   |   '))}</div>
      </div>
    `;
  } else {
    let bodyHtml = '';
    if (pts.length <= 3) {
      bodyHtml = `<div class="pres-cards-stack">
        ${pts.map((p, i) => `<div class="pres-stack-card ${i === 0 ? 'highlight' : ''}">${escHtml(p)}</div>`).join('')}
      </div>`;
    } else if (pts.length <= 6) {
      bodyHtml = `<div class="pres-cards-grid">
        ${pts.map((p, i) => `<div class="pres-grid-card"><span class="pres-grid-num">${i + 1}</span><span>${escHtml(p)}</span></div>`).join('')}
      </div>`;
    } else {
      bodyHtml = `<div class="pres-list-box"><ul>${pts.map((p) => `<li>${escHtml(p)}</li>`).join('')}</ul></div>`;
    }

    stage.innerHTML = `
      <div class="pres-content">
        <div class="pres-header">
          <span class="pres-badge">${escHtml(sl.tag)}</span>
          <h3 class="pres-title">${escHtml(sl.title)}</h3>
        </div>
        <div class="pres-body">${bodyHtml}</div>
        <div class="pres-footer">
          <span>${escHtml(currentPlan.meta.itemName)} | 예비창업패키지 사업계획서 (PSST)</span>
          <span><strong>${sl.num} / ${total}</strong></span>
        </div>
      </div>
    `;
  }

  counter.textContent = `${currentPresIdx + 1} / ${total}`;

  thumbs.innerHTML = currentSlides
    .map(
      (c, i) => `
      <button type="button" class="pres-thumb ${i === currentPresIdx ? 'active' : ''}" data-thumb="${i}">
        ${c.num}. ${escHtml(c.tag)}
      </button>`
    )
    .join('');

  thumbs.querySelectorAll('[data-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentPresIdx = Number(btn.dataset.thumb);
      renderPresentation();
    });
  });
}

document.getElementById('btnPrevSlide').addEventListener('click', () => {
  if (!currentSlides.length) return;
  currentPresIdx = (currentPresIdx - 1 + currentSlides.length) % currentSlides.length;
  renderPresentation();
});

document.getElementById('btnNextSlide').addEventListener('click', () => {
  if (!currentSlides.length) return;
  currentPresIdx = (currentPresIdx + 1) % currentSlides.length;
  renderPresentation();
});

document.addEventListener('keydown', (e) => {
  if (currentStep !== 4 || !currentSlides.length) return;
  if (e.key === 'ArrowLeft') {
    currentPresIdx = (currentPresIdx - 1 + currentSlides.length) % currentSlides.length;
    renderPresentation();
  } else if (e.key === 'ArrowRight') {
    currentPresIdx = (currentPresIdx + 1) % currentSlides.length;
    renderPresentation();
  }
});

document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentTheme = btn.dataset.theme;
    renderPresentation();
  });
});

document.getElementById('btnFullscreen').addEventListener('click', () => {
  const wrapper = document.getElementById('presWrapper');
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});
