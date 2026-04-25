'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const suggestedQuestions = [
    'What services do you offer?',
    'How can you help my business?',
    'Tell me about your team',
    'How much do your services cost?',
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110',
          'bg-gradient-to-r from-cyan-500 to-purple-600 text-white',
          isOpen && 'rotate-90 opacity-0 pointer-events-none'
        )}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none',
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] max-h-[80vh]'
        )}
      >
        <div className="h-full flex flex-col bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold text-white">TechBot</h3>
                <p className="text-xs text-gray-400">Techvix AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-gray-800/80 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                        <p className="text-gray-200 text-sm leading-relaxed">
                          Hi there! I&apos;m TechBot, your AI assistant at Techvix. I can help you learn about our services, team, and how we can transform your digital presence. What would you like to know?
                        </p>
                      </div>
                    </div>

                    {/* Suggested Questions */}
                    <div className="pl-11 space-y-2">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Sparkles size={12} /> Suggested questions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              sendMessage({ text: question })
                            }}
                            className="text-xs px-3 py-2 bg-gray-800/60 hover:bg-gray-700/80 text-cyan-400 rounded-full transition-colors border border-gray-700/50 hover:border-cyan-500/50"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        message.role === 'user'
                          ? 'bg-cyan-500'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600'
                      )}
                    >
                      {message.role === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'rounded-2xl p-4 max-w-[85%]',
                        message.role === 'user'
                          ? 'bg-cyan-500/20 rounded-tr-none text-white'
                          : 'bg-gray-800/80 rounded-tl-none text-gray-200'
                      )}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === 'text') {
                          return (
                            <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-800/80 rounded-2xl rounded-tl-none p-4">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by Techvix AI
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
