import { MBTIGroup, MBTITypeData } from './types';

export const MBTI_TYPES: Record<string, MBTITypeData> = {
  // Analysts (Purple)
  INTJ: { code: 'INTJ', name: '전략가', group: MBTIGroup.ANALYSTS, color: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-700', description: '용의주도한 전략가' },
  INTP: { code: 'INTP', name: '논리술사', group: MBTIGroup.ANALYSTS, color: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-700', description: '논리적인 사색가' },
  ENTJ: { code: 'ENTJ', name: '통솔자', group: MBTIGroup.ANALYSTS, color: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-700', description: '대담한 통솔자' },
  ENTP: { code: 'ENTP', name: '변론가', group: MBTIGroup.ANALYSTS, color: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-700', description: '뜨거운 논쟁을 즐기는 변론가' },

  // Diplomats (Green)
  INFJ: { code: 'INFJ', name: '옹호자', group: MBTIGroup.DIPLOMATS, color: 'border-green-500', bg: 'bg-green-100', text: 'text-green-700', description: '선의의 옹호자' },
  INFP: { code: 'INFP', name: '중재자', group: MBTIGroup.DIPLOMATS, color: 'border-green-500', bg: 'bg-green-100', text: 'text-green-700', description: '열정적인 중재자' },
  ENFJ: { code: 'ENFJ', name: '선도자', group: MBTIGroup.DIPLOMATS, color: 'border-green-500', bg: 'bg-green-100', text: 'text-green-700', description: '정의로운 사회운동가' },
  ENFP: { code: 'ENFP', name: '활동가', group: MBTIGroup.DIPLOMATS, color: 'border-green-500', bg: 'bg-green-100', text: 'text-green-700', description: '재기발랄한 활동가' },

  // Sentinels (Blue)
  ISTJ: { code: 'ISTJ', name: '현실주의자', group: MBTIGroup.SENTINELS, color: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', description: '청렴결백한 논리주의자' },
  ISFJ: { code: 'ISFJ', name: '수호자', group: MBTIGroup.SENTINELS, color: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', description: '용감한 수호자' },
  ESTJ: { code: 'ESTJ', name: '경영자', group: MBTIGroup.SENTINELS, color: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', description: '엄격한 관리자' },
  ESFJ: { code: 'ESFJ', name: '집정관', group: MBTIGroup.SENTINELS, color: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-700', description: '사교적인 외교관' },

  // Explorers (Yellow)
  ISTP: { code: 'ISTP', name: '장인', group: MBTIGroup.EXPLORERS, color: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700', description: '만능 재주꾼' },
  ISFP: { code: 'ISFP', name: '모험가', group: MBTIGroup.EXPLORERS, color: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700', description: '호기심 많은 예술가' },
  ESTP: { code: 'ESTP', name: '사업가', group: MBTIGroup.EXPLORERS, color: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700', description: '모험을 즐기는 사업가' },
  ESFP: { code: 'ESFP', name: '연예인', group: MBTIGroup.EXPLORERS, color: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700', description: '자유로운 영혼의 연예인' },
};

export const INITIAL_POSTS = [
  {
    id: '1',
    authorType: 'INTJ',
    authorName: '새벽감성',
    content: '사람들이 왜 감정적으로 반응하는지 논리적으로 분석해보려고 했는데 역시 이해가 안 가네요. 저만 그런가요?',
    tags: ['공감불가', '분석'],
    likes: 42,
    comments: 12,
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    authorType: 'ENFP',
    authorName: '해피바이러스',
    content: '오늘 날씨가 너무 좋아서 갑자기 여행 가고 싶어짐!! ✈️ 지금 당장 갈 사람?? 제주도 어때요?',
    tags: ['번개여행', '텐션업'],
    likes: 88,
    comments: 24,
    timestamp: Date.now() - 7200000,
  },
  {
    id: '3',
    authorType: 'ISTJ',
    authorName: '계획대로',
    content: '내일 할 일 리스트 작성 완료했습니다. 계획이 틀어지면 스트레스 받는데, 유연하게 대처하는 팁 있나요?',
    tags: ['계획', '스트레스'],
    likes: 15,
    comments: 5,
    timestamp: Date.now() - 10800000,
  },
];
