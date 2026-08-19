import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const QUICK_REPLY_PILLS = [
  'How do you finish a full site in a week?',
  'Can I really see a working demo before I pay?',
  'Why are there no monthly retainers?',
  'How do I get started on a project?',
];

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "We build custom websites for businesses in seven days, and show you a working demo before you pay. What would you like to know about our process?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const sendUserMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const messagesPayload = newMessages.slice(-8).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesPayload,
          message: trimmed,
          history: newMessages.slice(-8).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      const assistantReply =
        data.reply ||
        'We build high-speed websites in seven days and show you a working demo before you pay.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: assistantReply,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Reach our team directly at founder@getgolive.io or +1 (832) 463-0576 to discuss your project.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sendUserMessage(input);
  };

  const quickPillVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        delay: (index + 1) * 0.1,
      },
    }),
  };

  return (
    <>
      {/* FULL-SCREEN BACKDROP OVERLAY WHEN OPEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[6px]"
          />
        )}
      </AnimatePresence>

      {/* FIXED CHAT CONTAINER */}
      <div className="fixed z-50 pointer-events-none md:bottom-6 md:right-6 bottom-0 left-0 right-0 flex flex-col items-end">
        
        {/* 1. EXPANDED CHAT PANEL */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="expanded-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              style={{ willChange: 'transform, opacity' }}
              className="pointer-events-auto card glass-card border-t md:border text-[var(--text-primary)] shadow-2xl overflow-hidden flex flex-col w-full md:w-[380px] h-[75vh] md:h-[480px] rounded-t-[20px] md:rounded-[24px] p-4 md:p-5 mb-0 md:mb-3"
            >
              {/* Header Bar */}
              <div className="w-full h-[36px] md:h-[44px] pb-1.5 md:pb-2 border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--cta-bg)] animate-pulse" />
                  <span className="text-[13px] md:text-[16px] font-bold font-headline tracking-tight text-[var(--text-primary)] leading-none">
                    The Assistant
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all cursor-pointer hover:scale-105"
                  aria-label="Close Assistant"
                >
                  <X className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2]" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto space-y-2.5 md:space-y-3 pr-1 my-2.5 md:my-3 scrollbar-none">
                {messages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  const isFirstAI = !isUser && index === 0;

                  return (
                    <React.Fragment key={msg.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 30,
                        }}
                        style={{ willChange: 'transform, opacity' }}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
                      >
                        <div
                          className={`max-w-[85%] px-3.5 py-2 md:px-4 md:py-2.5 text-[12.5px] md:text-[14px] leading-relaxed font-body ${
                            isUser
                              ? 'bg-[var(--cta-bg)] text-[var(--cta-text)] font-medium'
                              : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]'
                          }`}
                          style={{
                            borderRadius: '14px',
                            ...(isUser
                              ? { borderTopRightRadius: '0px' }
                              : { borderTopLeftRadius: '0px' }),
                          }}
                        >
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      </motion.div>

                      {/* Suggested Quick Reply Pills with 0.1s Stagger Delay */}
                      {isFirstAI && (
                        <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1 pb-1">
                          {QUICK_REPLY_PILLS.map((pillLabel, pillIdx) => (
                            <motion.button
                              key={pillLabel}
                              type="button"
                              custom={pillIdx}
                              variants={quickPillVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                              whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
                              onClick={() => sendUserMessage(pillLabel)}
                              style={{ willChange: 'transform, opacity' }}
                              className="magnetic-btn h-[28px] md:h-[34px] px-2.5 md:px-3.5 bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-[11px] md:text-[12px] font-body hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center shadow-sm"
                            >
                              {pillLabel}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start w-full"
                  >
                    <div
                      className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] px-3.5 py-2 md:px-4 md:py-2.5 max-w-[85%] flex items-center gap-1.5"
                      style={{
                        borderRadius: '14px',
                        borderTopLeftRadius: '0px',
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar & Strict Circular Send Button */}
              <form onSubmit={handleSubmit} className="pt-1.5 md:pt-2 shrink-0">
                <div className="relative flex items-center h-[40px] md:h-[48px] bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full pl-3.5 md:pl-4 pr-1 md:pr-1.5 focus-within:border-[var(--text-primary)] transition-colors">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent text-[var(--text-primary)] text-[12.5px] md:text-[14px] placeholder-[var(--text-muted)] focus:outline-none pr-2 font-body"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 400 } }}
                    className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-[var(--cta-bg)] flex items-center justify-center hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                    aria-label="Send Message"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--cta-text)] stroke-[2.5]" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. TRIGGER BUTTON / MORPH PILL */}
        <div className="hidden md:flex flex-col items-end pr-0 pointer-events-auto">
          {/* Hover Tooltip when collapsed */}
          <AnimatePresence>
            {!isOpen && isHovered && (
              <motion.div
                key="hover-badge-container"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mb-2 pointer-events-none flex items-center justify-end"
              >
                <div
                  style={{
                    background: 'var(--surface-card)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] shadow-2xl flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--cta-bg)] animate-pulse" />
                  <span className="font-headline font-semibold text-[13px] tracking-tight text-[var(--text-primary)] whitespace-nowrap">
                    Ask the assistant
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Pill with 4s breathing loop & spring hover */}
          <motion.button
            id="ai-widget-button"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={!isOpen ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{
              scale: !isOpen
                ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                : undefined,
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: 'spring', stiffness: 200, damping: 30 },
            }}
            whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
            style={{
              background: 'var(--surface-card)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              willChange: 'transform, opacity',
            }}
            className="magnetic-btn w-[128px] h-[46px] rounded-full border border-[var(--border-color)] hover:border-[var(--text-primary)]/40 flex items-center justify-center cursor-pointer shadow-2xl transition-colors duration-300 group"
            aria-label={isOpen ? 'Close Assistant' : 'Open Assistant'}
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* Collapsed: "Ask me" with pulse dot */
                <motion.span
                  key="ask-me-label"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="font-headline font-bold text-[14px] text-[var(--text-primary)] tracking-tight leading-none whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--cta-bg)] group-hover:scale-125 transition-transform" />
                  Ask me
                </motion.span>
              ) : (
                /* Morphed Open: ✕ icon rotated */
                <motion.span
                  key="close-icon"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold text-[13px] font-headline"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                  <span>Close</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Trigger Button (Floating Pill at bottom-right on mobile when closed with animated glowing aura) */}
        {!isOpen && (
          <div className="md:hidden fixed bottom-4 right-4 pointer-events-auto z-40">
            <div className="relative flex items-center justify-center">
              {/* Outer Animated Glow Aura */}
              <div className="ai-widget-aura" />

              <motion.button
                id="ai-widget-mobile-button"
                onClick={() => setIsOpen(true)}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 400 } }}
                style={{
                  background: 'var(--surface-card)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  willChange: 'transform, opacity',
                }}
                className="ai-widget-mobile-glow relative z-10 px-3.5 h-[36px] rounded-full border border-[var(--border-color)] flex items-center justify-center cursor-pointer text-[var(--text-primary)] font-headline font-semibold text-[12px] gap-2 overflow-hidden shadow-2xl"
                aria-label="Open Assistant"
              >
                {/* Shimmer Light Reflection Sweep */}
                <div className="ai-shimmer-light" />

                {/* Animated Pulsing Beacon Dot */}
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cta-bg)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--cta-bg)]" />
                </span>

                <span className="relative z-10">Ask me</span>
                <span className="relative z-10 text-[10px] font-mono opacity-60">↗</span>
              </motion.button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
