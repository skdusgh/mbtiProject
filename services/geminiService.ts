import { GoogleGenAI } from "@google/genai";

export const generateMBTIResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[]
) => {
  // Guidelines require using process.env.API_KEY exclusively.
  const apiKey = process.env.API_KEY;

  // 1. API 키가 없는 경우 앱을 멈추지 않고 안내 메시지 반환
  if (!apiKey) {
    console.warn("API Key is missing");
    return `🚨 **API 키 설정 오류**
    
환경 변수에 API 키가 설정되지 않았습니다.

**해결 방법:**
1. 환경 변수 설정에서 \`API_KEY\`를 확인해주세요.
2. 값으로 Google Gemini API 키를 입력해야 합니다.`;
  }

  try {
    // 2. 요청이 들어올 때 클라이언트 생성 (지연 초기화)
    const ai = new GoogleGenAI({ apiKey });
    
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
    
    // 구체적인 에러 상황별 안내
    if (errorMessage.includes("API Key") || errorMessage.includes("403")) {
      return "⚠️ **API 키 인증 실패**\n\n입력된 API 키가 올바르지 않거나 만료되었습니다. 환경 변수를 확인해주세요.";
    }
    
    if (errorMessage.includes("429")) {
      return "⏳ **사용량 초과**\n\n잠시 후 다시 시도해주세요. (무료 사용량 한도에 도달했을 수 있습니다.)";
    }

    return "죄송합니다. 일시적인 오류로 답변을 생성할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};