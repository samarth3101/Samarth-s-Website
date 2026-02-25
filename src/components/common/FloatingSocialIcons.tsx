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
    { id: 1, text: "👋 **Hey there! I'm Zecure AI**\n\nI'm Samarth's intelligent assistant, designed to help you explore his work and expertise.\n\n✨ **I can tell you about:**\n• Tech skills & stack\n• Featured projects\n• Work experience\n• Education & certifications\n• Contact information\n\n💡 **Try the quick questions below, or just ask me anything!**", isUser: false }
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
    "Skills",
    "Projects", 
    "About",
    "Contact",
    "Experience"
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

  // Lock body scroll when chatbot is open
  useEffect(() => {
    if (showChatbot && !isMinimized) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showChatbot, isMinimized]);

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

  // Format message text with proper line breaks and styling
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Check if line contains **text** pattern for headings
      if (line.includes('**')) {
        const parts = line.split(/\*\*/);
        return (
          <div key={index} className={styles.messageLine}>
            {parts.map((part, i) => {
              // Odd indices are bold text (between **)
              if (i % 2 === 1) {
                return (
                  <strong key={i} className={styles.messageHeading} style={{display: 'inline'}}>
                    {part}
                  </strong>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </div>
        );
      }
      // Regular line
      return line.trim() ? (
        <div key={index} className={styles.messageLine}>
          {line}
        </div>
      ) : (
        <div key={index} className={styles.messageSpacing} />
      );
    });
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
      skills: "💻 **TECHNICAL EXPERTISE**\n\n🎨 **Frontend Development:**\n• React.js & Next.js 14 (App Router, SSR, ISR)\n• TypeScript for type-safe applications\n• Tailwind CSS, SCSS, Framer Motion\n• Responsive & accessible UI/UX design\n\n⚙️ **Backend Development:**\n• Node.js, Express.js, FastAPI\n• RESTful APIs & GraphQL\n• MongoDB, PostgreSQL, SQL\n• JWT authentication & security\n\n🤖 **AI & Machine Learning:**\n• Python for ML/AI development\n• LLM integration & prompt engineering\n• TensorFlow & PyTorch basics\n• AI-powered chatbots & automation\n\n🛠️ **Tools & Technologies:**\n• Git, GitHub, VS Code\n• Docker, AWS basics\n• Agile methodologies\n• Performance optimization",
      
      projects: "🚀 **FEATURED PROJECTS**\n\n🌐 **PCU ACM Website**\nFull-stack platform with ticketing system, contact forms, and modern UI. Built with React, Node.js, MongoDB.\n🔗 Live: pcuacm.netlify.app\n\n🛡️ **Zecure - AI Cybersecurity**\nModular AI framework with autonomous threat detection, real-time monitoring, 3D visualization. Python, TypeScript, React, ML.\n\n📊 **UniPass - Event Management**\nJWT-signed QR tickets, SSE streaming analytics, multi-role dashboards. FastAPI, Next.js, PostgreSQL.\n\n📈 **Real-Time Stock Visualization**\nFinancial data dashboard using Perspective, inspired by J.P. Morgan experience. React, WebSocket.\n\n💡 **SkillSwap eLearning**\nInteractive learning platform with AI instructor. MERN stack.\n\n✨ View all projects on GitHub: github.com/samarth3101",
      
      zecure: "🛡️ **ZECURE AI - YOUR INTELLIGENT ASSISTANT**\n\n👋 **About Me:**\nI'm Zecure - an AI-powered chatbot created by Samarth to showcase his expertise in:\n\n✨ **Key Features:**\n• Natural language understanding\n• Context-aware conversations\n• Built-in security monitoring\n• Real-time response generation\n• Professional information delivery\n\n🔐 **Security Focus:**\nI actively monitor conversations for security threats and inappropriate content, demonstrating Samarth's commitment to safe, ethical AI development.\n\n💡 **Purpose:**\nI help visitors learn about Samarth's work, skills, and projects through an engaging conversational interface.\n\n🎯 **Ask me about:**\nSkills, projects, experience, contact info, or anything about Samarth's capabilities!",
      
      experience: "🌟 **PROFESSIONAL EXPERIENCE**\n\n💼 **Current Role:**\nB.Tech Computer Science student specializing in AI/ML at Parul University\n\n🏆 **Leadership:**\n• Vice President - ACM Student Chapter\n• Leading tech-driven initiatives\n• Organizing workshops and hackathons\n• Mentoring fellow students\n\n🎯 **Focus Areas:**\n• Full-stack web development\n• AI/ML implementation\n• Secure backend architecture\n• Algorithmic problem-solving\n\n📚 **Continuous Learning:**\n• AWS Machine Learning (Graduate Level)\n• Red Hat App Development\n• Oracle Cloud Infrastructure\n• Multiple certifications in ML, Data Science\n\n💪 **Key Strengths:**\n• Clean, maintainable code\n• Scalable system design\n• Security-first approach\n• User-centric development",
      
help: "💡 **HOW SAMARTH CAN HELP YOU**\n\n🎯 **Services Offered:**\n\n🌐 **Web Development:**\n• Modern, responsive websites\n• E-commerce platforms\n• Business applications\n• SaaS products\n\n🤖 **AI Integration:**\n• Chatbots & virtual assistants\n• ML model integration\n• Data analysis & visualization\n• Automation solutions\n\n⚙️ **Backend Development:**\n• RESTful API design\n• Database architecture\n• Authentication systems\n• Cloud deployment\n\n✨ **Why Choose Samarth:**\n• Attention to detail\n• Security-focused\n• Scalable solutions\n• Modern tech stack\n• Clean code practices\n\n📧 **Let's Collaborate!**\nReach out to discuss your project and transform ideas into reality!",
      
      contact: "📧 **GET IN TOUCH WITH SAMARTH**\n\n✉️ **Email:**\nsamarth.patil3101@gmail.com\n\n🔗 **Professional Links:**\n• LinkedIn: /in/samarth-patil-3101spp\n• GitHub: github.com/samarth3101\n• Portfolio: [This Website]\n\n💬 **Social Media:**\n• Instagram: @samarthpatil0131\n\n⏰ **Response Time:**\nTypically responds within 24 hours\n\n💼 **Currently Available For:**\n• Freelance projects\n• Collaboration opportunities\n• Full-time positions\n• Consulting work\n\n🚀 **Ready to work together?**\nDon't hesitate to reach out - Samarth is always excited to discuss new projects and innovative solutions!",
      
      education: "🎓 **EDUCATION & CERTIFICATIONS**\n\n🏫 **Current Education:**\nB.Tech in Computer Science (AI & ML)\nParul University\n\n📜 **Professional Certifications:**\n\n☁️ **Cloud & Infrastructure:**\n• AWS Machine Learning (Graduate Level)\n• AWS Cloud Architect\n• Oracle Cloud Infrastructure AI\n\n💻 **Development:**\n• Red Hat App Development\n• Full Stack Development (Apna College)\n• Django Full-Stack Development\n\n🤖 **AI & Data Science:**\n• Machine Learning Master (RapidMiner)\n• Data Engineering Master (Altair)\n• Data Science Master (AICTE)\n• Introduction to AI (IBM)\n\n🔒 **Security:**\n• Cybersecurity for Everyone (UMD)\n\n📊 **Database:**\n• Understanding Basic SQL\n\n🎯 12+ Professional Certifications demonstrating continuous learning and expertise!",
      
      hire: "💼 **HIRE SAMARTH**\n\n✅ **Why Work With Samarth:**\n\n🎯 **Proven Track Record:**\n• 25+ completed projects\n• 3+ years of coding experience\n• Strong portfolio across domains\n\n💪 **Technical Excellence:**\n• Full-stack development expertise\n• Modern tech stack (React, Next.js, Node.js, Python)\n• AI/ML integration capabilities\n• Security-first approach\n\n🚀 **Reliable & Professional:**\n• Clean, maintainable code\n• Documentation & best practices\n• Agile methodology\n• Excellent communication\n\n🎨 **Complete Solutions:**\n• Frontend + Backend\n• Database design\n• Cloud deployment\n• Ongoing maintenance\n\n📧 **Next Steps:**\n1. Email: samarth.patil3101@gmail.com\n2. Share your project requirements\n3. Schedule a discovery call\n4. Get a detailed proposal\n\n💡 Let's build something amazing together!",
      
      default: "🤔 **NEED MORE INFORMATION?**\n\nI'm Zecure AI, and I can help you learn about:\n\n💻 **Skills & Tech Stack** - Programming languages, frameworks, tools\n🚀 **Projects** - Featured work and accomplishments\n👨‍💻 **Experience** - Background and expertise\n🎓 **Education** - Certifications and qualifications\n📧 **Contact** - How to get in touch\n💼 **Hiring** - Why work with Samarth\n\n✨ **Try asking:**\n• \"What technologies does Samarth know?\"\n• \"Tell me about his best projects\"\n• \"How can I contact Samarth?\"\n• \"What is his experience?\"\n\n🎯 I'm here to help - just ask away!"
    };

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('tech') || lowerQuestion.includes('stack') || lowerQuestion.includes('technology') || lowerQuestion.includes('language') || lowerQuestion.includes('framework')) {
      return responses.skills;
    } else if (lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('portfolio') || lowerQuestion.includes('built') || lowerQuestion.includes('created')) {
      return responses.projects;
    } else if (lowerQuestion.includes('zecure') || lowerQuestion.includes('about you') || lowerQuestion.includes('who are you') || lowerQuestion.includes('chatbot')) {
      return responses.zecure;
    } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('background') || lowerQuestion.includes('role') || lowerQuestion.includes('position')) {
      return responses.experience;
    } else if (lowerQuestion.includes('education') || lowerQuestion.includes('certification') || lowerQuestion.includes('degree') || lowerQuestion.includes('certificate') || lowerQuestion.includes('course')) {
      return responses.education;
    } else if (lowerQuestion.includes('hire') || lowerQuestion.includes('freelance') || lowerQuestion.includes('available') || lowerQuestion.includes('work with')) {
      return responses.hire;
    } else if (lowerQuestion.includes('help') || lowerQuestion.includes('service') || lowerQuestion.includes('offer')) {
      return responses.help;
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach') || lowerQuestion.includes('connect') || lowerQuestion.includes('linkedin')) {
      return responses.contact;
    } else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return"👋 **Hello there!**\n\nI'm Zecure AI, Samarth's intelligent assistant. I'm here to help you learn about his skills, projects, and how he can help with your needs.\n\n✨ **What would you like to know?**\n\nFeel free to ask about his tech stack, projects, experience, or anything else!";
    } else if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
      return "😊 **You're welcome!**\n\nHappy to help! If you have any other questions about Samarth or his work, feel free to ask.\n\n📧 Or connect directly at: samarth.patil3101@gmail.com";
    }
    
    return responses.default;
  };

  const handleQuickQuestion = (question: string) => {
    if (isInputDisabled) return;
    setHasUserChatted(true);
    setInputValue(question);
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
                    {formatMessage(message.text)}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim() && !isInputDisabled) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
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
                      {formatMessage(message.text)}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim() && !isInputDisabled) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
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
