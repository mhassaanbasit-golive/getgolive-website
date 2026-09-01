import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Create Nodemailer Transporter with SSL & STARTTLS fallback support
const createMailTransporter = (options?: { forcePort?: number; forceSecure?: boolean }) => {
  const host = process.env.SMTP_HOST;
  const configuredPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const port = options?.forcePort ?? configuredPort;
  const secure = options?.forceSecure !== undefined ? options.forceSecure : (port === 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        // Support standard TLS / STARTTLS negotiation
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  // Fallback testing transporter or dummy transporter
  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

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
6. NO EMOJIS: Do not use any emojis in your responses.

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

SUGGESTED QUESTIONS TO OFFER USER (No emojis):
At the end of your response, keep suggestions clean and concise:
* How fast can you build?
* What services do you offer?
* Request a quote
`;

// Factual, natural, non-tagline local fallback replies
const getLocalFallbackReply = (userInput: string): string => {
  const input = (userInput || '').toLowerCase();
  
  if (input.includes('price') || input.includes('cost') || input.includes('charge') || input.includes('how much') || input.includes('quote')) {
    return "Most agencies charge more than our full price just to take a meeting, but we prefer not to list pricing on our site. We build your working demo first, let you click through it, and then we discuss the price. Would you like us to build a working demo layout for your business?\n\nQuick questions you can ask:\n* How fast can you build?\n* What services do you offer?\n* Request a quote";
  }
  
  if (input.includes('demo') || input.includes('working') || input.includes('first')) {
    return "We build a full website of your business first and let you click through it before you decide to buy anything. This means you do not take any financial risk because you see the finished work first. What kind of business do you run?\n\nQuick questions you can ask:\n* How fast can you build?\n* What services do you offer?\n* Request a quote";
  }
  
  if (input.includes('speed') || input.includes('week') || input.includes('fast') || input.includes('how long') || input.includes('day') || input.includes('how fast')) {
    return "We finish your complete website in exactly seven days, start to finish. If you have an urgent deadline, we can get it live in one day. Most agencies are still scheduling their first meeting by then. What is your timeline?\n\nQuick questions you can ask:\n* What services do you offer?\n* Request a quote";
  }
  
  if (input.includes('service') || input.includes('offer') || input.includes('what do you do') || input.includes('what services')) {
    return "We build high-performance custom websites for premier real estate firms, commercial brokers, and established businesses. Every build includes custom design, search engine groundwork, speed optimization, and an automated lead-capture engine.\n\nQuick questions you can ask:\n* How fast can you build?\n* Request a quote";
  }
  
  if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('call') || input.includes('reach')) {
    return "You can reach our founder directly at founder@getgolive.io, call us at +1 (832) 463-0576, or leave your details here so we can start your demo right away.\n\nQuick questions you can ask:\n* How fast can you build?\n* What services do you offer?";
  }
  
  if (input.includes('retainer') || input.includes('monthly') || input.includes('pay') || input.includes('hosting') || input.includes('support')) {
    return "We do not charge monthly retainers. You pay once for the build, and the site is yours. We also cover your hosting for the first six months and stay on for another month to support you and fix any issues.\n\nQuick questions you can ask:\n* How fast can you build?\n* Request a quote";
  }

  if (input.includes('who are you') || input.includes('about') || input.includes('team') || input.includes('shipped') || input.includes('how many')) {
    return "We are a small team of developers who build websites for businesses whose current sites do not match what they do. We keep the team small so you talk directly to the people writing your code. We have shipped over 100 sites so far.\n\nQuick questions you can ask:\n* How fast can you build?\n* What services do you offer?";
  }
  
  return "We build high-speed websites for real estate firms, commercial developers, contractors, and service businesses in exactly seven days, and we show you a working demo before you pay.\n\nQuick questions you can ask:\n* How fast can you build?\n* What services do you offer?\n* Request a quote";
};

// API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message, history } = req.body;

    // Normalize messages format
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
    } else {
      res.status(400).json({ error: 'Bad Request: Missing messages or message' });
      return;
    }

    // Try Gemini API with multi-model fallback to handle high demand (503) spikes
    const ai = getGeminiClient();
    if (ai) {
      const contents = conversationHistory.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      // Candidate models in priority order for resilience against 503 high demand spikes
      const candidateModels = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let modelReply = '';

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.3,
            },
          });

          if (response?.text) {
            modelReply = response.text;
            break;
          }
        } catch (genErr: any) {
          console.warn(`[GEMINI RETRY] Model ${model} encountered an issue (${genErr?.status || genErr?.code || 'error'}), attempting fallback:`, genErr?.message || genErr);
          // Continue to next candidate model if 503 / 429 / overloaded
        }
      }

      if (modelReply) {
        res.json({ reply: modelReply });
        return;
      }
    }

    res.json({ reply: getLocalFallbackReply(userMessage), fallback: true });
  } catch (error: any) {
    console.warn('Chat endpoint caught error, serving domain fallback:', error?.message || error);
    const userMessage =
      req.body?.messages?.slice(-1)[0]?.content || req.body?.message || '';
    res.json({ reply: getLocalFallbackReply(userMessage), fallback: true });
  }
});

// API Submit Endpoint (Sends email to founder@getgolive.io via nodemailer)
app.post('/api/submit', async (req, res) => {
  try {
    const { name, fullName, email, phone, transcript, survey, type } = req.body;
    const clientName = name || fullName || 'Anonymous Visitor';
    const clientEmail = email || 'Not provided';
    const clientPhone = phone || 'Not provided';
    const submissionType = type || 'Chat Inquiry';

    // Format chat transcript into clean readable text & HTML
    let transcriptText = '';
    let transcriptHtml = '';

    if (Array.isArray(transcript)) {
      transcriptText = transcript
        .map((m: any) => `[${(m.sender || m.role || 'user').toUpperCase()}]: ${m.text || m.content || ''}`)
        .join('\n\n');

      transcriptHtml = transcript
        .map((m: any) => {
          const isUser = (m.sender || m.role || '').toLowerCase() === 'user';
          return `
            <div style="margin-bottom: 12px; padding: 10px 14px; border-radius: 8px; background: ${isUser ? '#000000' : '#F3F4F6'}; color: ${isUser ? '#FFFFFF' : '#000000'}; font-family: sans-serif; font-size: 14px;">
              <strong style="display: block; font-size: 11px; text-transform: uppercase; margin-bottom: 4px; color: ${isUser ? '#A1A1AA' : '#71717A'};">${isUser ? 'Client' : 'GetGoLive AI'}</strong>
              <div style="white-space: pre-wrap; line-height: 1.5;">${m.text || m.content || ''}</div>
            </div>
          `;
        })
        .join('');
    } else if (typeof transcript === 'string') {
      transcriptText = transcript;
      transcriptHtml = `<div style="white-space: pre-wrap; font-family: sans-serif; font-size: 14px;">${transcript}</div>`;
    } else {
      transcriptText = 'No messages recorded.';
      transcriptHtml = '<em>No messages recorded.</em>';
    }

    // Survey information formatting
    let surveySectionText = '';
    let surveySectionHtml = '';
    if (survey) {
      surveySectionText = `
SURVEY FEEDBACK:
- First Time: ${survey.firstTime || 'N/A'}
- Case Resolved: ${survey.caseResolved || 'N/A'}
- Rating: ${survey.rating || 'N/A'}
`;
      surveySectionHtml = `
        <div style="margin-top: 24px; padding: 16px; border: 1px solid #E5E7EB; border-radius: 8px; background: #FAFAFA;">
          <h4 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #18181B;">Survey Feedback</h4>
          <p style="margin: 4px 0; font-size: 13px; color: #3F3F46;"><strong>First Time Visitor:</strong> ${survey.firstTime || 'N/A'}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #3F3F46;"><strong>Case Resolved:</strong> ${survey.caseResolved || 'N/A'}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #3F3F46;"><strong>Rating:</strong> ${survey.rating || 'N/A'}</p>
        </div>
      `;
    }

    const emailSubject = `New GetGoLive Inquiry from ${clientName}`;
    const emailPlainText = `
========================================
NEW GETGOLIVE INQUIRY
========================================

Type: ${submissionType}
Timestamp: ${new Date().toISOString()}

CONTACT DETAILS:
- Name: ${clientName}
- Email: ${clientEmail}
- Phone: ${clientPhone}
${surveySectionText}
----------------------------------------
FULL CHAT TRANSCRIPT:
----------------------------------------
${transcriptText}

========================================
Sent automatically by GetGoLive AI Widget
========================================
`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${emailSubject}</title>
      </head>
      <body style="margin: 0; padding: 24px; background: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #000000;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px; padding: 32px; background: #FFFFFF;">
          <div style="border-bottom: 2px solid #000000; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">GETGOLIVE</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #71717A; text-transform: uppercase; letter-spacing: 0.05em;">New Lead Submission — ${submissionType}</p>
          </div>

          <div style="background: #F4F4F5; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #18181B;">Contact Information</h3>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Full Name:</strong> ${clientName}</p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Email Address:</strong> <a href="mailto:${clientEmail}" style="color: #000000; text-decoration: underline;">${clientEmail}</a></p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Phone Number:</strong> ${clientPhone}</p>
            <p style="margin: 6px 0; font-size: 12px; color: #71717A;"><strong>Received At:</strong> ${new Date().toLocaleString()}</p>
          </div>

          ${surveySectionHtml}

          <div style="margin-top: 28px;">
            <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #18181B;">Full Conversation Transcript</h3>
            <div style="background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px;">
              ${transcriptHtml}
            </div>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #A1A1AA; text-align: center;">
            Sent automatically by GetGoLive AI Chatbot &bull; <a href="https://getgolive.io" style="color: #71717A; text-decoration: none;">getgolive.io</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // Ensure From header matches authenticated SMTP_USER to prevent bouncebacks and protect domain health
    const authenticatedUser = process.env.SMTP_USER;
    const fromAddress = process.env.SMTP_FROM || (authenticatedUser ? `"GetGoLive" <${authenticatedUser}>` : '"GetGoLive" <founder@getgolive.io>');
    const recipientEmail = process.env.INQUIRY_RECIPIENT_EMAIL || authenticatedUser || 'mhassanbasit@gmail.com';

    const mailOptions = {
      from: fromAddress,
      to: recipientEmail,
      replyTo: clientEmail && clientEmail !== 'Not provided' ? clientEmail : undefined,
      subject: emailSubject,
      text: emailPlainText,
      html: emailHtml,
    };

    let sendResult: any;
    try {
      const transporter = createMailTransporter();
      sendResult = await transporter.sendMail(mailOptions);
    } catch (primaryErr: any) {
      console.warn('[EMAIL WARNING] Primary SMTP attempt failed. Retrying with Port 587 and TLS/STARTTLS:', primaryErr?.message || primaryErr);
      
      // Fallback to Port 587 with TLS / STARTTLS
      const fallbackTransporter = createMailTransporter({ forcePort: 587, forceSecure: false });
      sendResult = await fallbackTransporter.sendMail(mailOptions);
    }

    console.log(`[EMAIL DISPATCH] Sent inquiry email to ${recipientEmail}:`, {
      name: clientName,
      email: clientEmail,
      messageId: sendResult.messageId,
    });

    res.json({
      success: true,
      message: `Inquiry dispatched to ${recipientEmail}`,
      id: sendResult.messageId,
    });
  } catch (error: any) {
    console.error('Submit endpoint error:', error?.message || error);
    res.status(500).json({
      success: false,
      error: 'Failed to process inquiry submission',
      details: error?.message,
    });
  }
});

// Vite middleware setup for development/production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
