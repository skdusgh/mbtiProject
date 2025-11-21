export enum MBTIGroup {
  ANALYSTS = 'Analysts', // NT
  DIPLOMATS = 'Diplomats', // NF
  SENTINELS = 'Sentinels', // SJ
  EXPLORERS = 'Explorers', // SP
}

export interface MBTITypeData {
  code: string;
  name: string;
  group: MBTIGroup;
  color: string;
  bg: string;
  text: string;
  description: string;
}

export interface Post {
  id: string;
  authorType: string;
  authorName: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
