import React from 'react'
import { ChatMessage } from '../types'
import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatBubbleProps {
  message: ChatMessage
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} fade-in`}>
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* 头像 */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        {/* 消息内容 */}
        <div className={`px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
        }`}>
          {/* 图片显示 */}
          {message.image && (
            <div className="mb-2">
              <img 
                src={message.image} 
                alt="上传的图片" 
                className="max-w-full h-auto rounded-lg border border-gray-200"
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
          {isAssistant ? (
            <div className="prose prose-sm max-w-none prose-gray">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // 自定义样式以适应聊天气泡
                  h1: ({children}) => <h1 className="text-base font-bold mb-2 mt-0">{children}</h1>,
                  h2: ({children}) => <h2 className="text-sm font-semibold mb-2 mt-0">{children}</h2>,
                  h3: ({children}) => <h3 className="text-sm font-medium mb-1 mt-0">{children}</h3>,
                  p: ({children}) => <p className="text-sm mb-2 last:mb-0 mt-0">{children}</p>,
                  ul: ({children}) => <ul className="text-sm mb-2 mt-0">{children}</ul>,
                  ol: ({children}) => <ol className="text-sm mb-2 mt-0">{children}</ol>,
                  li: ({children}) => <li className="text-sm">{children}</li>,
                  code: ({children}) => <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{children}</code>,
                  pre: ({children}) => <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto mb-2 mt-0">{children}</pre>,
                  blockquote: ({children}) => <blockquote className="text-sm border-l-4 border-gray-300 pl-3 italic mb-2 mt-0">{children}</blockquote>,
                  table: ({children}) => <table className="text-xs border-collapse border border-gray-300 mb-2 mt-0">{children}</table>,
                  th: ({children}) => <th className="border border-gray-300 px-2 py-1 bg-gray-50 font-semibold">{children}</th>,
                  td: ({children}) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
          {message.timestamp && (
            <p className={`text-xs mt-1 ${
              isUser ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatBubble