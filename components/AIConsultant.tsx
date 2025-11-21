import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { generateMBTIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '안녕하세요! MBTI 전문 상담 AI입니다. \n"INTJ와 ENFP의 궁합이 궁금해" 또는 "회사에서 ESTJ 상사와 잘 지내는 법 알려줘" 처럼 무엇이든 물어보세요.',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Convert current messages to history format (excluding the last one we just added conceptually for the UI)
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      const responseText = await generateMBTIResponse(userMsg.text, history);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "응답을 생성하지 못했습니다.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center gap-3 text-white">
        <div className="p-2 bg-white/20 rounded-full">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">AI MBTI 상담소</h2>
          <p className="text-xs text-indigo-100 opacity-80">Gemini 2.5 Flash 기반</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${msg.role === 'user' ? 'bg-slate-700' : 'bg-indigo-500'}
            `}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm
              ${msg.role === 'user' 
                ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100' 
                : 'bg-indigo-50 text-indigo-900 rounded-tl-none border border-indigo-100'
              }
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
               <Bot className="w-5 h-5 text-white" />
             </div>
             <div className="bg-indigo-50 p-4 rounded-2xl rounded-tl-none border border-indigo-100 flex items-center">
               <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
               <span className="ml-2 text-sm text-indigo-500">분석 중입니다...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="MBTI에 대해 궁금한 점을 물어보세요..."
            className="w-full bg-slate-100 text-slate-800 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className={`
              absolute right-2 p-2 rounded-lg transition-colors
              ${inputValue.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
