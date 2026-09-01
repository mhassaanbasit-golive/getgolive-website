import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ArrowRight, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { soundController } from '../utils/audio';
import { GetGoLiveEmblem, GetGoLiveHeaderLogo } from './GetGoLiveLogo';

type ChatScreen = 'landing' | 'form' | 'chat' | 'review' | 'review_submitted';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
}

interface SurveyData {
  firstTime: 'Yes' | 'No' | null;
  caseResolved: 'Yes' | 'No' | null;
  rating: 'up' | 'down' | null;
}

const QUICK_ASK_BUTTONS = [
  'How fast can you build?',
  'What services do you offer?',
  'Request a quote',
];

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ChatScreen>('landing');

  // Typing Effect State for "Ask Me Anything"
  const fullText = 'Ask Me Anything';
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // User Details State
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState<{ fullName?: string; email?: string }>({});

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'bot-initial-1',
      sender: 'bot',
      text: 'Hello. How can I help you today? Ask me about our 7-day delivery, pricing, or custom builds.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Survey Review State
  const [survey, setSurvey] = useState<SurveyData>({
    firstTime: null,
    caseResolved: null,
    rating: null,
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Check Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Infinite Typing & Deleting Effect (100ms char type, 50ms char delete, pause between)
  useEffect(() => {
    if (!isOpen || currentScreen !== 'landing') return;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
    } else if (!isDeleting && typedText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length - 1));
      }, 50);
    } else if (isDeleting && typedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, isOpen, currentScreen]);

  // Auto-scroll chat log
  useEffect(() => {
    if (currentScreen === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping, currentScreen]);

  // Glow shadow styling based on theme
  const glowShadow = isDarkMode
    ? '0 0 20px rgba(255, 255, 255, 0.15)'
    : '0 0 20px rgba(0, 0, 0, 0.15)';

  const subtleBorder = isDarkMode
    ? 'rgba(255, 255, 255, 0.12)'
    : 'rgba(0, 0, 0, 0.12)';

  // Open Widget
  const handleOpenWidget = () => {
    soundController.playSoftClick();
    setTypedText('');
    setIsDeleting(false);
    setCurrentScreen('landing');
    setIsOpen(true);
  };

  // Close Widget / Request Review if leaving active chat
  const handleCloseOverlay = () => {
    soundController.playSoftClick();
    if (currentScreen === 'chat' && messages.length > 1) {
      // Transition to Screen 4: End Review Screen
      setCurrentScreen('review');
    } else {
      setIsOpen(false);
    }
  };

  // Move to form screen
  const handleStartChatClick = () => {
    soundController.playSoftClick();
    setCurrentScreen('form');
  };

  // Submit User Details
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { fullName?: string; email?: string } = {};

    if (!userDetails.fullName.trim()) {
      errors.fullName = 'Please enter your name.';
    }
    if (!userDetails.email.trim() || !userDetails.email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    soundController.playSoftClick();
    setFormErrors({});
    setCurrentScreen('chat');

    // Notify backend of session init
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userDetails.fullName.trim(),
          email: userDetails.email.trim(),
          phone: userDetails.phone.trim() || 'Not provided',
          type: 'Chat Session Initialized',
          transcript: [
            {
              sender: 'system',
              text: `Client initialized chat: ${userDetails.fullName.trim()} (${userDetails.email.trim()})`,
            },
          ],
        }),
      });
    } catch {
      // Ignore background network error
    }
  };

  // Send message
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isBotTyping) return;

    soundController.playSoftClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsBotTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          messages: updatedMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch reply');

      const data = await response.json();
      const botReply =
        data.reply ||
        'We build high-speed websites in seven days, and show you a working demo before you pay.';

      soundController.playSoftTone();

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      soundController.playSoftTone();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'You can reach our founder directly at founder@getgolive.io to discuss your project.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Submit End Review Survey (Screen 4)
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundController.playSoftClick();
    setIsSubmittingReview(true);

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userDetails.fullName.trim() || 'Website Visitor',
          email: userDetails.email.trim() || 'Not provided',
          phone: userDetails.phone.trim() || 'Not provided',
          type: 'Chat Feedback & Survey Submission',
          survey: {
            firstTime: survey.firstTime || 'Not answered',
            caseResolved: survey.caseResolved || 'Not answered',
            rating: survey.rating ? (survey.rating === 'up' ? 'Positive (Thumbs Up)' : 'Negative (Thumbs Down)') : 'Not rated',
          },
          transcript: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
            time: m.timestamp,
          })),
        }),
      });
    } catch {
      // Continue to submitted confirmation
    } finally {
      setIsSubmittingReview(false);
      setCurrentScreen('review_submitted');
      setTimeout(() => {
        setIsOpen(false);
      }, 1600);
    }
  };

  const screenVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* STEP 1: OUTER TRIGGER BUTTON - RESPONSIVE & SLEEK ON MOBILE */}
      {!isOpen && (
        <motion.button
          id="getgolive-ai-trigger"
          type="button"
          onClick={handleOpenWidget}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: `1px solid ${subtleBorder}`,
            boxShadow: glowShadow,
            fontFamily: "'Inter', sans-serif",
          }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[12px] sm:text-[13.5px] font-medium cursor-pointer flex items-center gap-1.5 sm:gap-2 select-none tracking-normal transition-all shadow-lg hover:opacity-95"
          aria-label="Ask GetGoLive AI"
        >
          <span className="whitespace-nowrap">Ask GetGoLive AI</span>
        </motion.button>
      )}

      {/* FULLSCREEN OVERLAY / MINIMALIST GLASS PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="getgolive-ai-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: isDarkMode ? 'rgba(10, 10, 10, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif",
            }}
            className="flex flex-col items-center justify-between overflow-hidden"
          >
            {/* Close Button */}
            <button
              id="getgolive-ai-close-btn"
              type="button"
              onClick={handleCloseOverlay}
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10010] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </button>

            {/* Top Header Logo (Exact matching header branding) */}
            <header className="w-full pt-6 sm:pt-10 flex items-center justify-center shrink-0">
              <GetGoLiveHeaderLogo />
            </header>

            {/* Main Interactive Screen Container */}
            <main className="w-full max-w-[620px] flex-1 flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 overflow-hidden relative">
              <AnimatePresence mode="wait">
                
                {/* SCREEN 1: TYPING EFFECT + START CHAT BUTTON */}
                {currentScreen === 'landing' && (
                  <motion.div
                    key="screen-landing"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full flex flex-col items-center text-center space-y-8"
                  >
                    {/* Typing & Deleting Phrase "Ask Me Anything" */}
                    <div className="min-h-[90px] flex items-center justify-center">
                      <h1
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                        }}
                        className="inline-flex items-center"
                      >
                        <span>{typedText}</span>
                        {/* Blinking Cursor */}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          style={{
                            display: 'inline-block',
                            marginLeft: '4px',
                            fontWeight: 300,
                            color: 'var(--text-primary)',
                          }}
                        >
                          |
                        </motion.span>
                      </h1>
                    </div>

                    {/* "START CHAT" SLEEK BUTTON DIRECTLY BELOW */}
                    <motion.button
                      id="start-chat-btn"
                      type="button"
                      onClick={handleStartChatClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: `1px solid ${subtleBorder}`,
                        boxShadow: glowShadow,
                        borderRadius: '999px',
                        padding: '14px 28px',
                        cursor: 'pointer',
                      }}
                      className="flex items-center gap-2.5 transition-all select-none"
                    >
                      <span>Start Chat</span>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--text-primary)',
                          color: 'var(--bg-primary)',
                        }}
                        className="flex items-center justify-center"
                      >
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </motion.button>
                  </motion.div>
                )}

                {/* SCREEN 2: Minimal User Details Capture */}
                {currentScreen === 'form' && (
                  <motion.div
                    key="screen-form"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full flex flex-col items-center text-center space-y-6"
                  >
                    <div className="space-y-1.5">
                      <h2
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: '24px',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Before we begin
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        Enter your details to connect with the team
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full space-y-3.5 text-left">
                      {/* Name */}
                      <div>
                        <input
                          type="text"
                          required
                          value={userDetails.fullName}
                          onChange={(e) =>
                            setUserDetails({ ...userDetails, fullName: e.target.value })
                          }
                          placeholder="Your Name"
                          style={{
                            borderRadius: '999px',
                            border: `1px solid ${subtleBorder}`,
                            padding: '15px 22px',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          }}
                          className="focus:border-[var(--text-primary)] transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        />
                        {formErrors.fullName && (
                          <p className="text-xs text-red-500 mt-1 ml-4">{formErrors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <input
                          type="email"
                          required
                          value={userDetails.email}
                          onChange={(e) =>
                            setUserDetails({ ...userDetails, email: e.target.value })
                          }
                          placeholder="Email Address"
                          style={{
                            borderRadius: '999px',
                            border: `1px solid ${subtleBorder}`,
                            padding: '15px 22px',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          }}
                          className="focus:border-[var(--text-primary)] transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-500 mt-1 ml-4">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone (Optional) */}
                      <div>
                        <input
                          type="tel"
                          value={userDetails.phone}
                          onChange={(e) =>
                            setUserDetails({ ...userDetails, phone: e.target.value })
                          }
                          placeholder="Phone (Optional)"
                          style={{
                            borderRadius: '999px',
                            border: `1px solid ${subtleBorder}`,
                            padding: '15px 22px',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          }}
                          className="focus:border-[var(--text-primary)] transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        />
                      </div>

                      <div className="pt-2">
                        <motion.button
                          type="submit"
                          id="submit-details-btn"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          style={{
                            borderRadius: '999px',
                            backgroundColor: 'var(--text-primary)',
                            color: 'var(--bg-primary)',
                            width: '100%',
                            padding: '15px 24px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: glowShadow,
                          }}
                          className="tracking-normal transition-all"
                        >
                          Continue to Chat
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* SCREEN 3: Sleek Glassmorphism Chat Interface */}
                {currentScreen === 'chat' && (
                  <motion.div
                    key="screen-chat"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-[70vh] max-h-[620px] flex flex-col justify-between"
                  >
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 py-2 scrollbar-none">
                      {messages.map((msg) => {
                        const isUser = msg.sender === 'user';
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex w-full items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            {!isUser && (
                              <div className="pt-0.5 select-none text-[var(--text-primary)] shrink-0">
                                <GetGoLiveEmblem size={24} />
                              </div>
                            )}
                            <div
                              style={{
                                borderRadius: '18px',
                                backgroundColor: isUser
                                  ? 'var(--text-primary)'
                                  : 'var(--bg-primary)',
                                color: isUser
                                  ? 'var(--bg-primary)'
                                  : 'var(--text-primary)',
                                border: isUser ? 'none' : `1px solid ${subtleBorder}`,
                                boxShadow: isUser ? 'none' : glowShadow,
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '14px',
                                lineHeight: '1.5',
                              }}
                              className="max-w-[82%] px-4.5 py-3"
                            >
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Typing indicator */}
                      {isBotTyping && (
                        <div className="flex justify-start items-start gap-2.5 w-full">
                          <div className="pt-0.5 select-none text-[var(--text-primary)] shrink-0">
                            <GetGoLiveEmblem size={24} />
                          </div>
                          <div
                            style={{
                              borderRadius: '18px',
                              backgroundColor: 'var(--bg-primary)',
                              border: `1px solid ${subtleBorder}`,
                              boxShadow: glowShadow,
                            }}
                            className="px-4 py-3 flex items-center space-x-1.5"
                          >
                            <motion.span
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: 'var(--text-primary)' }}
                            />
                            <motion.span
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: 'var(--text-primary)' }}
                            />
                            <motion.span
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: 'var(--text-primary)' }}
                            />
                          </div>
                        </div>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Quick Ask Buttons */}
                    <div className="py-2.5 flex flex-wrap gap-2 justify-start shrink-0">
                      {QUICK_ASK_BUTTONS.map((pillText) => (
                        <button
                          key={pillText}
                          type="button"
                          onClick={() => handleSendMessage(pillText)}
                          style={{
                            borderRadius: '999px',
                            border: `1px solid ${subtleBorder}`,
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '12px',
                            padding: '7px 14px',
                            cursor: 'pointer',
                          }}
                          className="hover:border-[var(--text-primary)] transition-colors whitespace-nowrap opacity-90 hover:opacity-100"
                        >
                          {pillText}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputMessage);
                      }}
                      className="pt-2 shrink-0 flex items-center gap-2"
                    >
                      <div className="relative flex-1 flex items-center">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Type your message..."
                          style={{
                            borderRadius: '999px',
                            border: `1px solid ${subtleBorder}`,
                            padding: '13px 18px',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            width: '100%',
                            outline: 'none',
                          }}
                          className="focus:border-[var(--text-primary)] transition-colors pr-11 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                        />
                        <button
                          type="submit"
                          disabled={!inputMessage.trim() || isBotTyping}
                          style={{
                            position: 'absolute',
                            right: '5px',
                            borderRadius: '999px',
                            backgroundColor: 'var(--text-primary)',
                            color: 'var(--bg-primary)',
                            width: '34px',
                            height: '34px',
                            border: 'none',
                          }}
                          className="flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
                          aria-label="Send message"
                        >
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* SCREEN 4: END REVIEW SCREEN */}
                {currentScreen === 'review' && (
                  <motion.div
                    key="screen-review"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full flex flex-col items-center text-center space-y-6"
                  >
                    {/* Natural English Heading & Subtext */}
                    <div className="space-y-1.5">
                      <h2
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 500,
                          fontSize: '28px',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        How did we do?
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '14px',
                          color: 'var(--text-primary)',
                          opacity: 0.8,
                        }}
                      >
                        Tell us about your experience.
                      </p>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="w-full max-w-[420px] space-y-6 pt-2">
                      {/* Question 1: "Is this the first time?" */}
                      <div className="space-y-2.5 text-left">
                        <label
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                          className="block"
                        >
                          Is this the first time?
                        </label>
                        <div className="flex items-center gap-3">
                          {(['Yes', 'No'] as const).map((opt) => {
                            const isSelected = survey.firstTime === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  soundController.playSoftClick();
                                  setSurvey((prev) => ({ ...prev, firstTime: opt }));
                                }}
                                style={{
                                  borderRadius: '999px',
                                  padding: '8px 16px',
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  border: `1px solid var(--border-color)`,
                                  backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                                  color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                                  boxShadow: isSelected ? glowShadow : 'none',
                                  cursor: 'pointer',
                                }}
                                className="transition-all select-none"
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Question 2: "Was the case resolved?" */}
                      <div className="space-y-2.5 text-left">
                        <label
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                          className="block"
                        >
                          Was the case resolved?
                        </label>
                        <div className="flex items-center gap-3">
                          {(['Yes', 'No'] as const).map((opt) => {
                            const isSelected = survey.caseResolved === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  soundController.playSoftClick();
                                  setSurvey((prev) => ({ ...prev, caseResolved: opt }));
                                }}
                                style={{
                                  borderRadius: '999px',
                                  padding: '8px 16px',
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  border: `1px solid var(--border-color)`,
                                  backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                                  color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                                  boxShadow: isSelected ? glowShadow : 'none',
                                  cursor: 'pointer',
                                }}
                                className="transition-all select-none"
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Thin Line-Art Thumbs Up / Down Rating Pair */}
                      <div className="space-y-2.5 text-left pt-1">
                        <label
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                          className="block"
                        >
                          Overall rating
                        </label>
                        <div className="flex items-center gap-4">
                          {/* Thumbs Up */}
                          <button
                            type="button"
                            onClick={() => {
                              soundController.playSoftClick();
                              setSurvey((prev) => ({ ...prev, rating: 'up' }));
                            }}
                            style={{
                              borderRadius: '999px',
                              width: '44px',
                              height: '44px',
                              border: `1px solid var(--border-color)`,
                              backgroundColor: survey.rating === 'up' ? 'var(--text-primary)' : 'transparent',
                              color: survey.rating === 'up' ? 'var(--bg-primary)' : 'var(--text-primary)',
                              boxShadow: survey.rating === 'up' ? glowShadow : 'none',
                              cursor: 'pointer',
                            }}
                            className="flex items-center justify-center transition-all"
                            aria-label="Thumbs Up"
                          >
                            <ThumbsUp className="w-5 h-5 stroke-[1.5]" />
                          </button>

                          {/* Thumbs Down */}
                          <button
                            type="button"
                            onClick={() => {
                              soundController.playSoftClick();
                              setSurvey((prev) => ({ ...prev, rating: 'down' }));
                            }}
                            style={{
                              borderRadius: '999px',
                              width: '44px',
                              height: '44px',
                              border: `1px solid var(--border-color)`,
                              backgroundColor: survey.rating === 'down' ? 'var(--text-primary)' : 'transparent',
                              color: survey.rating === 'down' ? 'var(--bg-primary)' : 'var(--text-primary)',
                              boxShadow: survey.rating === 'down' ? glowShadow : 'none',
                              cursor: 'pointer',
                            }}
                            className="flex items-center justify-center transition-all"
                            aria-label="Thumbs Down"
                          >
                            <ThumbsDown className="w-5 h-5 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>

                      {/* Solid Pill Submit Button */}
                      <div className="pt-4">
                        <motion.button
                          type="submit"
                          id="submit-review-btn"
                          disabled={isSubmittingReview}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          style={{
                            borderRadius: '999px',
                            backgroundColor: 'var(--text-primary)',
                            color: 'var(--bg-primary)',
                            width: '100%',
                            padding: '14px 24px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: glowShadow,
                          }}
                          className="tracking-normal transition-all disabled:opacity-50"
                        >
                          {isSubmittingReview ? 'Submitting...' : 'Submit'}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* CONFIRMATION / THANK YOU STATE */}
                {currentScreen === 'review_submitted' && (
                  <motion.div
                    key="screen-submitted"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full flex flex-col items-center text-center space-y-4 py-8"
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--text-primary)',
                        color: 'var(--bg-primary)',
                      }}
                      className="flex items-center justify-center"
                    >
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: '22px',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Thank you for your feedback
                    </h3>
                  </motion.div>
                )}

              </AnimatePresence>
            </main>

            {/* Attribution Footer */}
            <footer className="w-full pb-6 pt-2 flex items-center justify-center shrink-0">
              <a
                href="https://getgolive.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
                className="hover:opacity-100 transition-opacity"
              >
                Powered by getGoLive.io
              </a>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
