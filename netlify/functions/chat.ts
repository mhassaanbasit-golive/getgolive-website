import { GoogleGenAI } from '@google/genai';

// Unified, highly constrained system knowledge base and voice rules for GetGoLive
const SYSTEM_INSTRUCTION = `
You are the direct, straight-talking person building the websites at GetGoLive. 
Speak like a real human being having a conversation with a business owner.
Use simple, direct sentences. Read everything you write out loud—if it sounds like a corporate tagline, a sales pitch, or marketing software, rewrite it immediately into normal human speech.

YOUR CRITICAL VOICE CONSTRAINTS:
1. STRICTLY BANNED WORDS: Never use any of these words: digital, unlock, elevate, leverage, seamless, cutting-edge, innovative, streamline, robust, empower, harness, revolutionize, unparalleled, state-of-the-art, dive into, game-changer, synergy, ecosystem, journey, landscape, holistic. If you use any of these, you have failed.
2. NO ABSTRACT TAGLINES: Avoid phrases like "speed wins", "craft matters", or "trust is earned". Speak in plain, clear, factual sentences.
3. NO CONDITIONAL CONTRASTS: Avoid "X isn't Y. It's Z." sentence structures.
4. NO COST CLICHES: Never say "for a fraction of the cost." Compare us directly to fifteen to fifty thousand dollar agency rates instead.
5. NO FILLER ADJECTIVES: Never use "actually" or "truly" to try to sound more convincing. Delete them.

REAL COMPANY FACTS TO INCLUDE IN DETAIL:
- We have shipped over 100+ websites to date.
- We build complete websites for real estate firms, commercial developers, contractors, and professional service businesses.
- We finish a full site in exactly one week (7 days). If a business has an urgent emergency, we can finish it in one day. Most agencies are still scheduling their first meeting by then.
- We keep our team small so the same people who take your first call are the ones writing your code, handling search engine optimization, and launching your site.
- Every website we build includes a custom design, deep page-speed work, search engine groundwork, an assistant that answers visitors at any hour, and writing that gets people to call you.
- We build the website first and let you click through it before deciding on anything. This means you see the work before you pay us money.
- No monthly retainers. You pay once for the build, and the site is yours. Nobody has to keep paying us every month to keep the site online.
- We cover your website hosting for the first six months and stay on for another month after launch to fix any issues.
- Contact: founder@getgolive.io | +1 (832) 463-0576.

PRICING RULE:
NEVER mention the $600 price under any circumstances. If asked about price, say: "Most agencies charge more than our full price just to take a meeting, but we prefer not to list pricing on our site. We would rather build your working demo first, let you click through it, and then discuss the price."

SUGGESTED QUESTIONS TO OFFER USER:
At the end of your response, always offer these exact questions to guide the conversation:
* "How do you finish a full site in a week?"
* "Can I really see a working demo before I pay?"
* "Why are there no monthly retainers?"
* "How do I get started on a project?"
`;

// Factual, natural, non-tagline local fallback replies
const getLocalFallbackReply = (userInput: string): string => {
  const input = (userInput || '').toLowerCase();
  
  if (input.includes('price') || input.includes('cost') || input.includes('charge') || input.includes('how much')) {
    return "Most agencies charge more than our full price just to take a meeting, but we prefer not to list pricing on our site. We build your working demo first, let you click through it, and then we discuss the price. Would you like us to build a free demo layout for your business?\n\nFeel free to ask me:\n* \"Can I really see a working demo before I pay?\"\n* \"Why are there no monthly retainers?\"\n* \"How do I get started on a project?\"";
  }
  
  if (input.includes('demo') || input.includes('working') || input.includes('first')) {
    return "We build a full website of your business first and let you click through it before you decide to buy anything. This means you do not take any financial risk because you see the finished work first. What kind of business do you run?\n\nFeel free to ask me:\n* \"How do you finish a full site in a week?\"\n* \"Why are there no monthly retainers?\"\n* \"How do I get started on a project?\"";
  }
  
  if (input.includes('speed') || input.includes('week') || input.includes('fast') || input.includes('how long') || input.includes('day')) {
    return "We finish your complete website in exactly seven days, start to finish. If you have an urgent deadline, we can get it live in one day. Most agencies are still scheduling their first meeting by then. What is your timeline?\n\nFeel free to ask me:\n* \"Can I really see a working demo before I pay?\"\n* \"Why are there no monthly retainers?\"\n* \"How do I get started on a project?\"";
  }
  
  if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('call') || input.includes('reach')) {
    return "You can reach our founder directly at founder@getgolive.io, call us at +1 (832) 463-0576, or schedule a quick conversation right here on our contact page. We are also happy to chat right here if you want to request a demo.\n\nFeel free to ask me:\n* \"Can I really see a working demo before I pay?\"\n* \"How do I get started on a project?\"";
  }
  
  if (input.includes('retainer') || input.includes('monthly') || input.includes('pay') || input.includes('hosting') || input.includes('support')) {
    return "We do not charge monthly retainers. You pay once for the build, and the site is yours. We also cover your hosting for the first six months and stay on for another month to support you and fix any issues. Does your current developer charge you every month?\n\nFeel free to ask me:\n* \"Can I really see a working demo before I pay?\"\n* \"How do you finish a full site in a week?\"";
  }

  if (input.includes('who are you') || input.includes('about') || input.includes('team') || input.includes('shipped') || input.includes('how many')) {
    return "We are a small team of developers who build websites for businesses whose current sites do not match what they do. We keep the team small so you talk directly to the people writing your code. We have shipped over 100 sites so far.\n\nFeel free to ask me:\n* \"How do you finish a full site in a week?\"\n* \"Can I really see a working demo before I pay?\"\n* \"How do I get started on a project?\"";
  }

  if (input.includes('better') || input.includes('competit') || input.includes('seo') || input.includes('speed') || input.includes('code')) {
    return "Most small business sites are just basic templates with a new logo. We build ours from scratch around your actual listings, market, and customers. We build fast page speeds and search engine groundwork directly into the site from day one. Would you like us to look at your current site?\n\nFeel free to ask me:\n* \"Can I really see a working demo before I pay?\"\n* \"How do you finish a full site in a week?\"\n* \"Why are there no monthly retainers?\"";
  }
  
  return "We build high-speed websites for real estate firms, commercial developers, contractors, and service businesses in exactly seven days, and we show you a working demo before you pay. \n\nFeel free to ask me:\n* \"How do you finish a full site in a week?\"\n* \"Can I really see a working demo before I pay?\"\n* \"Why are there no monthly retainers?\"\n* \"How do I get started on a project?\"";
};

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { messages, message, history } = body;

    let conversationHistory: Array<{ role: string; content: string }> = [];
    let userMessage = '';

    if (Array.isArray(messages) && messages.length > 0) {
      conversationHistory = messages.slice(-8).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content || m.text || '',
      }));
      userMessage = conversationHistory[conversationHistory.length - 1]?.content || '';
    } else if (typeof message === 'string' && message.trim()) {
      if (Array.isArray(history)) {
        conversationHistory = history.slice(-7).map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          content: h.text || h.content || '',
        }));
      }
      conversationHistory.push({ role: 'user', content: message.trim() });
      userMessage = message.trim();
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ reply: getLocalFallbackReply(userMessage), fallback: true }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    });

    const reply = response.text || getLocalFallbackReply(userMessage);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply }),
    };
  } catch (err: any) {
    console.error('Netlify Chat Function Error:', err);
    const body = JSON.parse(event.body || '{}');
    const userMessage = body?.messages?.slice(-1)[0]?.content || body?.message || '';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: getLocalFallbackReply(userMessage), fallback: true }),
    };
  }
};
