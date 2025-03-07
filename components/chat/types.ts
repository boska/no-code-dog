export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatState {
  messages: Message[]
  isTyping: boolean
}
