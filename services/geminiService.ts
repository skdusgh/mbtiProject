import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMBTIResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[]
) => {
  try {
    // Construct history for the chat
    // Note: The new SDK manages history within the Chat object usually,
    // but for stateless-like function calls or simple integration, we can instantiate a chat.
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
    return "죄송합니다. 현재 MBTI 분석 엔진에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};
