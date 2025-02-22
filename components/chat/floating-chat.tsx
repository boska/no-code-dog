'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Yang's AI assistant. I have detailed knowledge of Yang's background and experience. Feel free to ask me anything about his work, skills, or projects!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          // You could also send conversation history here if needed
          // history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      if (data.message) {
        const responseMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, responseMessage])
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-background border rounded-lg shadow-lg w-[calc(100vw-32px)] h-[80vh] md:w-[360px] md:h-[480px] flex flex-col max-w-[500px]"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <h3 className="font-medium">Chat with Yang</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2 ${message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-muted mr-4'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && <div className="loading">Thinking...</div>} {/* Loading indicator */}

            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-4 border-t flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-sm md:text-base rounded-md border bg-background"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 whitespace-nowrap text-sm md:text-base"
              >
                Send
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-primary text-primary-foreground rounded-full p-3 md:p-4 shadow-lg hover:bg-primary/90"
          >
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
