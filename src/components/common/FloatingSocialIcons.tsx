"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from "../../styles/SocialIcons.module.scss";
import { Github, Linkedin, Instagram, Mail, MessageCircle, X, Send, Brain, Minimize2, Shield, AlertTriangle } from 'lucide-react';

const SocialIcons: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, isUser: boolean, isSecurityWarning?: boolean}[]>([
    { id: 1, text: "👋 Hey! I'm Zecure AI, your intelligent companion built by Samarth. I know everything about his work, skills, and projects. What would you like to explore?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserChatted, setHasUserChatted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSecurityMode, setIsSecurityMode] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [collapseTimer, setCollapseTimer] = useState(0);
  const [showCollapseWarning, setShowCollapseWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const collapseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/samarth3101", 
      label: "GitHub" 
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/samarth-patil-3101spp/", 
      label: "LinkedIn" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/samarthpatil0131?igsh=M3pwczQwa3Fzejg2", 
      label: "Instagram" 
    },
    { 
      icon: Mail, 
      href: "mailto:samarth.patil3101@gmail.com", 
      label: "Email" 
    }
  ];

  const quickQuestions = [
    "💻 Skills & Tech Stack",
    "🚀 Best Projects", 
    "🛡️ About Zecure AI"
  ];

  // Security keywords that trigger warnings
  const securityKeywords = [
    'hack', 'crack', 'exploit', 'virus', 'malware', 'attack', 'breach', 'illegal', 
    'password', 'steal', 'phishing', 'scam', 'fraud', 'bypass', 'unauthorized',
    'dump', 'leak', 'backdoor', 'trojan', 'spam', 'ddos', 'vulnerability'
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Click outside to minimize functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showChatbot && !isMinimized && chatWindowRef.current && 
          !chatWindowRef.current.contains(event.target as Node)) {
        const chatToggle = document.querySelector(`.${styles.chatToggle}`);
        if (chatToggle && !chatToggle.contains(event.target as Node)) {
          setIsMinimized(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatbot, isMinimized]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Collapse timer management
  useEffect(() => {
    if (showCollapseWarning && collapseTimer > 0) {
      collapseIntervalRef.current = setInterval(() => {
        setCollapseTimer(prev => {
          if (prev <= 1) {
            setShowChatbot(false);
            setIsMinimized(false);
            setShowCollapseWarning(false);
            setIsInputDisabled(false);
            setIsSecurityMode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (collapseIntervalRef.current) {
        clearInterval(collapseIntervalRef.current);
      }
    };
  }, [showCollapseWarning, collapseTimer]);

  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const toggleChatbot = () => {
    if (showChatbot && !isMinimized) {
      setIsMinimized(true);
    } else if (showChatbot && isMinimized) {
      setIsMinimized(false);
    } else {
      setShowChatbot(true);
      setIsMinimized(false);
    }
  };

  const closeChatbot = () => {
    setShowChatbot(false);
    setIsMinimized(false);
    setHasUserChatted(false);
    setIsSecurityMode(false);
    setIsInputDisabled(false);
    setShowCollapseWarning(false);
    setCollapseTimer(0);
    if (collapseIntervalRef.current) {
      clearInterval(collapseIntervalRef.current);
    }
  };

  const checkForSecurityThreats = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return securityKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isInputDisabled) return;

    setHasUserChatted(true);

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true
    };

    // Check for security threats
    const isSuspicious = checkForSecurityThreats(inputValue);
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse;
      
      if (isSuspicious) {
        if (!isSecurityMode) {
          // First warning
          setIsSecurityMode(true);
          botResponse = {
            id: Date.now() + 1,
            text: "🛡️ **ZECURE AUTONOMOUS SECURITY ENGINE ACTIVATED**\n\nI've detected potentially suspicious content in your query. Zecure's security protocols are now establishing a safe and secure connection.\n\n⚠️ Please refrain from queries that might compromise system integrity or violate security policies. Let's keep our conversation focused on Samarth's professional work and capabilities.\n\nHow can I help you learn about his projects instead?",
            isUser: false,
            isSecurityWarning: true
          };
        } else {
          // Second warning - start collapse timer
          setIsInputDisabled(true);
          setShowCollapseWarning(true);
          setCollapseTimer(5);
          botResponse = {
            id: Date.now() + 1,
            text: "🚨 **SECURITY BREACH DETECTED**\n\nZecure's autonomous engine has identified repeated suspicious activity. For security reasons, this session will be terminated.\n\n⏱️ Auto-collapsing in 5 seconds...\n\nPlease return with legitimate inquiries about Samarth's professional work.",
            isUser: false,
            isSecurityWarning: true
          };
        }
      } else {
        // Normal response
        setIsSecurityMode(false);
        botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(inputValue),
          isUser: false
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const getBotResponse = (question: string): string => {
    const responses = {
      skills: "💻 Samarth is a full-stack developer with expertise in:\n\n• React & Next.js for modern web apps\n• TypeScript for type-safe development\n• Node.js & Python for backend systems\n• AI integration and security-focused development\n\nHe combines these technologies with clean code practices and innovative problem-solving approaches.",
      
      projects: "🚀 Samarth has built impressive projects including:\n\n• Modern portfolio websites with advanced animations\n• AI-powered applications and chatbots\n• Secure backend systems and APIs\n• E-commerce and business applications\n\nEach project showcases his attention to detail and technical excellence. Check out his GitHub for live demos!",
      
      zecure: "🛡️ I'm Zecure AI - Samarth's intelligent creation! I represent his vision of:\n\n• AI-powered assistance and automation\n• Security-focused development practices\n• Interactive user experiences\n• Intelligent conversation capabilities\n\nI'm designed to showcase his skills in AI development and user-centric design.",
      
      experience: "🌟 Samarth brings a perfect blend of technical expertise and creative problem-solving. He's worked on diverse projects from web applications to AI systems, always delivering scalable, secure, and user-friendly solutions.",
      
      help: "💡 Samarth can help transform your ideas into reality! Whether you need a modern web application, AI integration, or complete digital solutions, he brings the skills and vision to make it happen.",
      
      contact: "📞 Ready to work with Samarth? Reach out at samarth.patil3101@gmail.com or connect on LinkedIn. He's always excited to discuss new projects and innovative solutions!",
      
      default: "🤔 That's a great question! I know Samarth's work inside and out. Feel free to ask about his skills, projects, experience, or how he can help with your next venture. I'm here to share everything about his capabilities!"
    };

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('tech') || lowerQuestion.includes('stack') || lowerQuestion.includes('technology')) {
      return responses.skills;
    } else if (lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('portfolio')) {
      return responses.projects;
    } else if (lowerQuestion.includes('zecure') || lowerQuestion.includes('ai') || lowerQuestion.includes('about')) {
      return responses.zecure;
    } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('background')) {
      return responses.experience;
    } else if (lowerQuestion.includes('help') || lowerQuestion.includes('hire') || lowerQuestion.includes('work with')) {
      return responses.help;
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach')) {
      return responses.contact;
    }
    
    return responses.default;
  };

  const handleQuickQuestion = (question: string) => {
    if (isInputDisabled) return;
    setHasUserChatted(true);
    const cleanQuestion = question.replace(/[💻🚀🛡️]/g, '').trim();
    setInputValue(cleanQuestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollIndicator(scrollTop < 100);
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileChatContainer}>
        {showChatbot && (
          <div className={`${styles.mobileChatWindow} ${styles.chatSlideUp}`} ref={chatWindowRef}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderContent}>
                <div className={`${styles.zecureAvatar} ${isSecurityMode ? styles.securityMode : ''}`}>
                  {isSecurityMode ? <Shield size={18} /> : <Brain size={18} />}
                </div>
                <div className={styles.headerText}>
                  <h4>Zecure AI</h4>
                  <span className={styles.onlineStatus}>
                    {isSecurityMode ? 'Security Mode' : 'Online'}
                  </span>
                </div>
              </div>
              <div className={styles.chatControls}>
                {showCollapseWarning && (
                  <div className={styles.collapseTimer}>
                    <AlertTriangle size={14} />
                    <span>{collapseTimer}s</span>
                  </div>
                )}
                <button 
                  className={styles.closeChat}
                  onClick={closeChatbot}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage} ${message.isSecurityWarning ? styles.securityWarning : ''}`}
                >
                  {!message.isUser && (
                    <div className={`${styles.messageBotAvatar} ${message.isSecurityWarning ? styles.securityAvatar : ''}`}>
                      {message.isSecurityWarning ? <Shield size={14} /> : <Brain size={14} />}
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={`${styles.messageBotAvatar} ${isSecurityMode ? styles.securityAvatar : ''}`}>
                    {isSecurityMode ? <Shield size={14} /> : <Brain size={14} />}
                  </div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!hasUserChatted && !isInputDisabled && (
              <div className={styles.quickQuestions}>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className={styles.quickButton}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isInputDisabled}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.chatInput}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isInputDisabled ? "Input disabled for security" : "Ask me about Samarth..."}
                className={`${styles.messageInput} ${isInputDisabled ? styles.inputDisabled : ''}`}
                disabled={isInputDisabled}
              />
              <button
                onClick={handleSendMessage}
                className={`${styles.sendButton} ${isInputDisabled ? styles.buttonDisabled : ''}`}
                disabled={!inputValue.trim() || isInputDisabled}
              >
                <Send size={16} />
              </button>
            </div>

            <div className={styles.chatFooter}>
              <span>Powered by <span className={styles.zecureBrand}>Zecure</span> AI</span>
            </div>
          </div>
        )}

        <button
          className={`${styles.mobileChatButton} ${showChatbot ? styles.chatActive : ''} ${isSecurityMode ? styles.securityMode : ''}`}
          onClick={toggleChatbot}
          aria-label="Chat with Zecure AI"
        >
          {isSecurityMode ? <Shield size={24} /> : <Brain size={24} />}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.socialContainer} ${isLoaded ? styles.slideUp : ''}`}>
        <div className={styles.socialIcons}>
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className={`${styles.socialIcon} ${isLoaded ? styles.fadeInUp : ''}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
        <div className={`${styles.verticalLine} ${isLoaded ? styles.growUp : ''}`}></div>
      </div>

      <div className={`${styles.emailContainer} ${isLoaded ? styles.slideUp : ''}`}>
        <div className={styles.emailLink}>
          <a
            href="mailto:samarth.patil3101@gmail.com"
            className={`${styles.email} ${isLoaded ? styles.fadeInUp : ''}`}
            style={{ animationDelay: '0.8s' }}
            aria-label="Email"
          >
            samarth.patil3101@gmail.com
          </a>
        </div>

        <div className={`${styles.chatbotContainer} ${isLoaded ? styles.slideUp : ''}`}>
          {showChatbot && !isMinimized && (
            <div className={`${styles.chatWindow} ${styles.chatSlideUp}`} ref={chatWindowRef}>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderContent}>
                  <div className={`${styles.zecureAvatar} ${isSecurityMode ? styles.securityMode : ''}`}>
                    {isSecurityMode ? <Shield size={20} /> : <Brain size={20} />}
                  </div>
                  <div className={styles.headerText}>
                    <h4>Zecure AI</h4>
                    <span className={styles.onlineStatus}>
                      {isSecurityMode ? 'Security Mode' : 'Online'}
                    </span>
                  </div>
                </div>
                <div className={styles.chatControls}>
                  {showCollapseWarning && (
                    <div className={styles.collapseTimer}>
                      <AlertTriangle size={14} />
                      <span>{collapseTimer}s</span>
                    </div>
                  )}
                  <button 
                    className={styles.minimizeChat}
                    onClick={() => setIsMinimized(true)}
                    aria-label="Minimize chat"
                  >
                    <Minimize2 size={16} />
                  </button>
                  <button 
                    className={styles.closeChat}
                    onClick={closeChatbot}
                    aria-label="Close chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.chatMessages}>
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage} ${message.isSecurityWarning ? styles.securityWarning : ''}`}
                  >
                    {!message.isUser && (
                      <div className={`${styles.messageBotAvatar} ${message.isSecurityWarning ? styles.securityAvatar : ''}`}>
                        {message.isSecurityWarning ? <Shield size={14} /> : <Brain size={14} />}
                      </div>
                    )}
                    <div className={styles.messageContent}>
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className={`${styles.message} ${styles.botMessage}`}>
                    <div className={`${styles.messageBotAvatar} ${isSecurityMode ? styles.securityAvatar : ''}`}>
                      {isSecurityMode ? <Shield size={14} /> : <Brain size={14} />}
                    </div>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {!hasUserChatted && !isInputDisabled && (
                <div className={styles.quickQuestions}>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className={styles.quickButton}
                      onClick={() => handleQuickQuestion(question)}
                      disabled={isInputDisabled}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <div className={styles.chatInput}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isInputDisabled ? "Input disabled for security" : "Ask me about Samarth..."}
                  className={`${styles.messageInput} ${isInputDisabled ? styles.inputDisabled : ''}`}
                  disabled={isInputDisabled}
                />
                <button
                  onClick={handleSendMessage}
                  className={`${styles.sendButton} ${isInputDisabled ? styles.buttonDisabled : ''}`}
                  disabled={!inputValue.trim() || isInputDisabled}
                >
                  <Send size={16} />
                </button>
              </div>

              <div className={styles.chatFooter}>
                <span>Powered by <span className={styles.zecureBrand}>Zecure</span> AI</span>
              </div>
            </div>
          )}

          <button
            className={`${styles.chatToggle} ${isLoaded ? styles.bounceIn : ''} ${showChatbot ? styles.chatActive : ''} ${isSecurityMode ? styles.securityMode : ''}`}
            onClick={toggleChatbot}
            aria-label="Chat with Zecure AI"
          >
            {isSecurityMode ? <Shield size={24} /> : <Brain size={24} />}
          </button>
        </div>

        <div className={`${styles.verticalLine} ${isLoaded ? styles.growUp : ''}`}></div>
      </div>

      {showScrollIndicator && (
        <div className={`${styles.scrollIndicator} ${isLoaded ? styles.fadeInUp : ''}`} onClick={handleScroll}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.horizontalLine}></div>
        </div>
      )}
    </>
  );
};

export default SocialIcons;
