import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

// 환경에 따라 API Key를 안전하게 가져오는 함수
const getApiKey = (): string | undefined => {
  // 1. Vite / Modern Browser Environment (VITE_API_KEY)
  // import.meta.env가 존재하는지 안전하게 확인
  try {
    const meta = import.meta as any;
    if (meta && meta.env && meta.env.VITE_API_KEY) {
      return meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // import.meta 접근 오류 무시
  }

  // 2. Node.js / Webpack Environment (API_KEY)
  // process 객체가 존재하는지 안전하게 확인
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // process 접근 오류 무시
  }
  
  return undefined;
};

const getAI = () => {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("API Key가 설정되지 않았습니다. Vercel 환경 변수 설정에서 'VITE_API_KEY'를 등록했는지 확인해주세요.");
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateMBTIResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[]
) => {
  try {
    const ai = getAI();
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          당신은 세계 최고의 MBTI 전문가이자 심리 상담가입니다. 
          사용자의 질문에 대해 MBTI 이론(8기능, 유형별 특징 등)을 바탕으로 깊이 있고 따뜻한 조언을 해주세요.
          
          다음 규칙을 따르세요:
          1. 사용자가 자신의 유형을 밝히면 그 유형의 인지 기능(Ni, Te 등)을 언급하며 설명해주세요.
          2. 관계 고민 상담 시, 상대방 유형과의 궁합 및 갈등 해결 방안을 구체적으로 제시하세요.
          3. 말투는 전문적이지만 친근하고 공감 능력 있게 해주세요.
          4. 한국어로 자연스럽게 답변하세요.
        `,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes("API Key") || errorMessage.includes("API_KEY")) {
      return "⚠️ 시스템 설정 오류: API 키가 없습니다. Vercel 환경 변수에 'VITE_API_KEY'가 올바르게 설정되었는지 확인해주세요.";
    }
    
    return "죄송합니다. 현재 MBTI 분석 엔진에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};
