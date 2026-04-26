# TechBot - Techvix AI Chatbot Documentation

## Overview

TechBot is an AI-powered chatbot integrated into the Techvix website. It serves as a 24/7 virtual assistant that helps visitors learn about Techvix's services, team, and capabilities. The chatbot uses OpenAI's GPT-4o-mini model and is built with the Vercel AI SDK.

---

## Technical Architecture

### Components

| File | Purpose |
|------|---------|
| `/app/api/chat/route.ts` | API route handling chat requests and AI responses |
| `/components/chatbot.tsx` | Client-side chat UI component |
| `/app/layout.tsx` | Root layout where chatbot is globally mounted |

### Technologies Used

- **AI SDK 6** - Vercel's AI SDK for streaming chat responses
- **OpenAI GPT-4o-mini** - Language model for generating responses
- **React** - UI component framework
- **Tailwind CSS** - Styling

---

## Features

### UI Features
- Floating chat button (bottom-right corner)
- Expandable chat window with minimize/maximize
- Real-time typing indicators
- Auto-scroll to latest messages
- Suggested quick questions
- Mobile-responsive design
- Glass-morphism design matching site theme

### AI Capabilities
- Understands context from conversation history
- Streams responses in real-time
- Trained on comprehensive Techvix knowledge base
- Professional yet conversational tone

---

## Knowledge Base Coverage

TechBot has complete knowledge of:

### Company Information
- Company overview and mission
- Leadership team (CEO, COO, CTO)
- Service experts for each department
- Company statistics (500+ projects, 98% satisfaction, etc.)

### All 13 Services
1. Web Development
2. App Development
3. Cybersecurity
4. Graphic Design
5. Video Editing
6. AI Chatbot Integration
7. Copywriting
8. SEO
9. Social Media Marketing
10. Ads Management
11. SaaS Development
12. Digital Marketing
13. Email Automation

### For Each Service, TechBot Knows:
- Service tagline
- Description and full details
- Sub-services offered
- Technologies used
- Why the service matters
- Features included

---

## Question & Response Examples

### General Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "What services do you offer?" | Lists all 13 services with brief descriptions |
| "Tell me about your team" | Introduces leadership (CEO, COO, CTO) and mentions service experts |
| "What makes Techvix different?" | Highlights expertise, 500+ projects, 98% satisfaction, end-to-end solutions |
| "How can I contact you?" | Provides contact page link, mentions WhatsApp availability |

### Service-Specific Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "Tell me about web development" | Explains service, technologies (React, Next.js), sub-services, benefits |
| "Do you build mobile apps?" | Details iOS/Android development, React Native, Flutter, app store optimization |
| "Can you help with cybersecurity?" | Explains security audits, penetration testing, compliance consulting |
| "What's your SEO process?" | Covers keyword research, on-page/technical SEO, link building, local SEO |
| "Do you do email marketing?" | Describes email automation, sequences, abandoned cart recovery, ROI stats |

### Pricing Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "How much does a website cost?" | Explains pricing is customized, encourages consultation |
| "What are your rates?" | Notes pricing depends on project scope, offers free consultation |
| "Do you offer packages?" | Explains tailored solutions based on needs |

### Process Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "What's your process?" | Outlines: Discovery > Strategy > Design/Dev > Testing > Launch > Support |
| "How long does a project take?" | Explains timelines vary by scope, discusses typical phases |
| "Do you offer support after launch?" | Confirms ongoing support and optimization services |

### Technical Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "What technologies do you use?" | Lists tech by service area (React, Node.js, Flutter, etc.) |
| "Can you work with WordPress?" | Confirms CMS development capabilities |
| "Do you use AI in your solutions?" | Explains AI chatbot services, NLP, automation capabilities |

### Team Questions

| User Question | TechBot Response Type |
|---------------|----------------------|
| "Who is your CEO?" | Introduces Zainab Rehan and her role |
| "Who handles cybersecurity?" | Mentions Sara Malik, Cybersecurity Expert |
| "Who leads web development?" | Introduces Ali Hassan, Web Development Lead |

---

## Response Guidelines (How TechBot Behaves)

1. **Friendly & Professional** - Maintains warm, helpful tone while being informative
2. **Accurate** - Only provides verified information from knowledge base
3. **Concise** - Keeps responses to 2-4 paragraphs maximum
4. **Action-Oriented** - Encourages visitors to get in touch or explore services
5. **Redirects Gracefully** - For off-topic questions, politely steers back to Techvix services
6. **Enthusiastic** - Shows genuine excitement about helping and Techvix's capabilities

---

## Sample Conversations

### Conversation 1: Service Inquiry

```
User: What services do you offer?

TechBot: Great question! At Techvix, we offer a comprehensive suite of 13 digital services:

**Development:** Web Development, App Development (iOS & Android), and SaaS Development

**Creative:** Graphic Design, Video Editing, and Copywriting

**Marketing:** SEO, Social Media Marketing, Ads Management, Digital Marketing, and Email Automation

**Technology:** Cybersecurity and AI Chatbot Integration

Each service is handled by our expert team with years of experience. We've completed 500+ projects with a 98% client satisfaction rate. Would you like to learn more about any specific service?
```

### Conversation 2: Pricing Question

```
User: How much does it cost to build a website?

TechBot: Website pricing at Techvix is customized based on your specific needs and project scope. Factors that influence pricing include:

- Type of website (landing page, corporate site, e-commerce, web app)
- Design complexity and custom features
- Number of pages and functionality required
- Integrations needed (payment systems, CRMs, etc.)
- Timeline and ongoing support needs

I'd recommend scheduling a free consultation with our team. We'll discuss your vision, understand your requirements, and provide a detailed quote. You can reach us through our contact page or WhatsApp for a quick chat!
```

### Conversation 3: Technical Question

```
User: What technologies do you use for web development?

TechBot: Our web development team uses modern, industry-leading technologies:

**Frontend:** React, Next.js, TypeScript, Tailwind CSS
**Backend:** Node.js, Python, PostgreSQL, MongoDB
**CMS:** WordPress, Webflow, custom solutions
**E-commerce:** Shopify, WooCommerce, custom platforms

We follow best practices including responsive design, SEO-friendly architecture, and performance optimization. Our lead developer Ali Hassan and the team stay current with the latest frameworks to ensure your project uses cutting-edge solutions.

What kind of web project are you considering?
```

### Conversation 4: Team Information

```
User: Who leads your company?

TechBot: Techvix is led by an experienced leadership team:

**Zainab Rehan - CEO:** Our visionary leader who drives company strategy and growth. She ensures we deliver exceptional value to every client.

**Maryam Ahsan - COO:** Operations excellence expert who manages our teams and ensures smooth project delivery.

**Muhammad Ahmad Abid - CTO:** Technology innovation leader who oversees all technical decisions and development practices.

We also have dedicated experts leading each service area, from Sara Malik (Cybersecurity) to Ali Hassan (Web Development). Would you like to meet our full team on our Team page?
```

---

## Error Handling

| Scenario | TechBot Behavior |
|----------|-----------------|
| Off-topic question | Politely acknowledges, redirects to Techvix services |
| Unclear question | Asks for clarification while offering related options |
| Technical issue | Suggests contacting support directly |
| Competitor questions | Focuses on Techvix's strengths without disparaging others |

---

## Customization Guide

### Updating Knowledge Base

To update TechBot's knowledge, edit the `TECHVIX_KNOWLEDGE` constant in `/app/api/chat/route.ts`:

```typescript
const TECHVIX_KNOWLEDGE = `
  // Add or modify information here
`
```

### Modifying Suggested Questions

Edit the `suggestedQuestions` array in `/components/chatbot.tsx`:

```typescript
const suggestedQuestions = [
  'Your new question here',
  // ...
]
```

### Changing AI Model

Update the model parameter in `/app/api/chat/route.ts`:

```typescript
const result = streamText({
  model: 'openai/gpt-4o',  // or other supported model
  // ...
})
```

---

## Performance Notes

- **Response Time:** Typically 1-3 seconds for first token
- **Streaming:** Responses stream in real-time for better UX
- **Context Window:** Maintains full conversation history
- **Rate Limiting:** Handled by Vercel AI Gateway

---

## Future Enhancements

Potential improvements to consider:

1. **Lead Capture** - Collect email/phone before starting chat
2. **Appointment Booking** - Integrate calendar scheduling
3. **Multi-language Support** - Add support for other languages
4. **Analytics** - Track common questions and conversation flows
5. **Handoff to Human** - Transfer to live agent when needed
6. **Voice Support** - Add voice input/output capabilities

---

## Support

For issues with the chatbot, contact the Techvix development team or review the codebase at:
- API Route: `/app/api/chat/route.ts`
- UI Component: `/components/chatbot.tsx`
