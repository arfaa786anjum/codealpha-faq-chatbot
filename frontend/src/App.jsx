import { useState, useRef, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/chat';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Apply dark theme dynamically
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const resetTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSend = async (userQuestion) => {
    if (!userQuestion.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
    setIsLoading(true);
    setInputValue('');
    resetTextarea();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.answer || "I couldn't find an answer to that."
      }]);
    } catch (error) {
      console.error("Error fetching chat:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Error: Could not reach the server. Please make sure the backend is running.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleSuggestionClick = (question) => {
    handleSend(question);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const startNewChat = () => {
    setMessages([]);
    setInputValue('');
    resetTextarea();
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const formatMessageText = (text) => {
    return text.split('\n').map((line, i) => (
      <p key={i}>{line}</p>
    ));
  };

  const suggestions = [
    { title: "Reset my password", desc: "Get help resetting your university account password." },
    { title: "Connect to campus Wi-Fi", desc: "Instructions for connecting to eduroam." },
    { title: "Access my student account", desc: "Login help for the student portal." },
    { title: "Report a technical issue", desc: "Submit a ticket for broken equipment." }
  ];

  return (
    <div className="app-layout">
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', verticalAlign: 'middle'}}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            FAQ Assistant
          </div>
        </div>
        
        <button className="new-chat-btn" onClick={startNewChat}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New chat
        </button>

        <div className="sidebar-content">
          <div style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px', paddingLeft: '8px'}}>FAQ Topics</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                className="sidebar-topic-btn"
                onClick={() => handleSuggestionClick(s.title)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <span>FAQ Assistant v1.0</span>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <span style={{display: 'flex', flexDirection: 'column'}}>
              <span>FAQ Assistant</span>
              <span className="header-subtitle">Ask questions and get answers from the knowledge base.</span>
            </span>
          </div>
          <div className="header-status" style={{fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px'}}>
            <span style={{width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block'}}></span>
            Ready
          </div>
        </header>

        <div className="conversation-area" aria-live="polite">
          <div className="conversation-inner">
            {messages.length === 0 ? (
              <div className="welcome-screen">
                <h2 className="welcome-title">How can I help you today?</h2>
                <p className="welcome-subtitle">Ask a question about the University IT Helpdesk.</p>
                <div className="suggestions-grid">
                  {suggestions.map((s, index) => (
                    <button 
                      key={index} 
                      className="suggestion-card"
                      onClick={() => handleSuggestionClick(s.title)}
                    >
                      <div className="suggestion-title">{s.title}</div>
                      <div className="suggestion-desc">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`message-row ${msg.role} ${msg.isError ? 'error' : ''}`}
                  >
                    {msg.role === 'bot' && (
                      <div className="message-avatar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                    )}
                    <div className="message-content">
                      {formatMessageText(msg.content)}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="message-row bot">
                    <div className="message-avatar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="composer-container">
          <div className="composer-box">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the University IT Helpdesk..."
              disabled={isLoading}
              aria-label="Question input"
              rows={1}
            />
            <button 
              className="send-button"
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send question"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <div className="composer-footer">
            FAQ Assistant can make mistakes. Verify important information.
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
