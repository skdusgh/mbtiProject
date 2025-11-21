import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { 
  MessageSquare, 
  Users, 
  Zap, 
  Search, 
  PenSquare, 
  Heart, 
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { INITIAL_POSTS, MBTI_TYPES } from './constants';
import { Post, MBTIGroup } from './types';
import { MBTIBadge } from './components/MBTIBadge';
import { AIConsultant } from './components/AIConsultant';

const App: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState<'community' | 'ai'>('community');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [userMBTI, setUserMBTI] = useState<string>('ENTP'); // Default User
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  // Filter logic
  const filteredPosts = posts.filter(post => 
    selectedTypeFilter === 'ALL' ? true : post.authorType === selectedTypeFilter
  );

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      authorType: userMBTI,
      authorName: '익명의 ' + MBTI_TYPES[userMBTI].name,
      content: newPostContent,
      tags: ['일상'],
      likes: 0,
      comments: 0,
      timestamp: Date.now()
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsWriting(false);
  };

  // Render Helpers
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('community')}>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            MBTI Universe
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('community')}
            className={`flex items-center gap-2 font-medium transition-colors ${activeTab === 'community' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Users className="w-5 h-5" />
            커뮤니티
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 font-medium transition-colors ${activeTab === 'ai' ? 'text-purple-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <MessageSquare className="w-5 h-5" />
            AI 상담소
          </button>
        </nav>

        {/* User Profile Selector */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-slate-500">내 유형:</span>
          <select 
            value={userMBTI} 
            onChange={(e) => setUserMBTI(e.target.value)}
            className="bg-slate-100 border-none text-sm font-semibold text-slate-700 rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {Object.keys(MBTI_TYPES).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 animate-fade-in-down">
          <button 
            onClick={() => { setActiveTab('community'); setIsMobileMenuOpen(false); }}
            className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <Users className="w-5 h-5" /> 커뮤니티
          </button>
          <button 
            onClick={() => { setActiveTab('ai'); setIsMobileMenuOpen(false); }}
            className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <MessageSquare className="w-5 h-5" /> AI 상담소
          </button>
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs text-slate-400 mb-2">내 MBTI 설정</label>
            <select 
              value={userMBTI} 
              onChange={(e) => setUserMBTI(e.target.value)}
              className="w-full bg-slate-100 p-2 rounded-lg text-sm"
            >
              {Object.keys(MBTI_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );

  const renderCommunity = () => (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              유형별 필터
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTypeFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTypeFilter === 'ALL' 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                전체보기
              </button>
              {Object.keys(MBTI_TYPES).map(type => {
                const active = selectedTypeFilter === type;
                const typeData = MBTI_TYPES[type];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedTypeFilter(type)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                      active 
                        ? `${typeData.bg} ${typeData.text} border-${typeData.color.split('-')[1]}-500 shadow-sm` 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Helper Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl shadow-md text-white">
            <h4 className="font-bold text-lg mb-2">나의 유형은?</h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black opacity-90">{userMBTI}</span>
              <span className="text-sm opacity-80">{MBTI_TYPES[userMBTI].name}</span>
            </div>
            <p className="text-xs opacity-70 leading-relaxed mb-4">
              {MBTI_TYPES[userMBTI].description}
            </p>
            <button 
              onClick={() => setActiveTab('ai')}
              className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
            >
              AI에게 고민 상담하기
            </button>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Write Post Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20">
            <div className="flex gap-4">
              <div className="flex-shrink-0 hidden sm:block">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${MBTI_TYPES[userMBTI].bg} ${MBTI_TYPES[userMBTI].text}`}>
                  {userMBTI}
                </div>
              </div>
              <div className="flex-1">
                {isWriting ? (
                  <div className="space-y-3">
                    <textarea
                      autoFocus
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none resize-none h-32 text-sm"
                      placeholder={`${MBTI_TYPES[userMBTI].name}님의 생각을 들려주세요...`}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setIsWriting(false)}
                        className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg"
                      >
                        취소
                      </button>
                      <button 
                        onClick={handlePostSubmit}
                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200"
                      >
                        게시하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsWriting(true)}
                    className="w-full bg-slate-50 hover:bg-slate-100 p-3 rounded-xl text-slate-400 cursor-text flex items-center gap-2 transition-colors"
                  >
                    <PenSquare className="w-4 h-4" />
                    <span className="text-sm">무슨 생각을 하고 계신가요?</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400">아직 등록된 게시글이 없습니다.</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MBTIBadge type={post.authorType} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{post.authorName}</h4>
                      <span className="text-xs text-slate-400">
                        {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-pink-500 transition-colors group">
                    <Heart className="w-4 h-4 group-hover:fill-pink-500" />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50/50">
        {renderHeader()}
        <main>
          {activeTab === 'community' ? renderCommunity() : (
            <div className="max-w-3xl mx-auto px-4 py-8">
              <AIConsultant />
            </div>
          )}
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
