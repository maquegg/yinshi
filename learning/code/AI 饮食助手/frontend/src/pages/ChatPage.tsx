import React, { useState, useRef, useEffect } from 'react'
import { Send, ShoppingCart, Camera, BookOpen, Utensils, Upload } from 'lucide-react'
import { ChatMessage, FoodItem, NutritionPlan } from '../types'
import { chatAPI, foodAPI, nutritionAPI, imageAPI } from '../utils/api'
import ChatBubble from '../components/ChatBubble'
import FoodCard from '../components/FoodCard'
import NutritionTable from '../components/NutritionTable'
import LoadingSpinner from '../components/LoadingSpinner'

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '你好！我是AI饮食管家，很高兴为您服务。我可以帮您推荐食材、制定营养计划、计算热量等。请问今天想了解什么呢？',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [foodRecommendations, setFoodRecommendations] = useState<FoodItem[]>([])
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showNutritionPlan, setShowNutritionPlan] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // 初始化时加载食材推荐
    loadFoodRecommendations()
  }, [])

  const loadFoodRecommendations = async () => {
    try {
      const foods = await foodAPI.getRecommendations('apple', 3)
      setFoodRecommendations(foods)
    } catch (error) {
      console.error('加载食材推荐失败:', error)
    }
  }

  const loadNutritionPlan = async () => {
    try {
      const plan = await nutritionAPI.createPlan()
      setNutritionPlan(plan)
      setShowNutritionPlan(true)
    } catch (error) {
      console.error('加载营养计划失败:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await chatAPI.sendMessage({
        message: inputMessage,
        conversation_history: messages.slice(-10) // 只发送最近10条消息
      })

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // 根据用户消息内容决定是否显示相关功能
      if (inputMessage.includes('苹果') || inputMessage.includes('食材') || inputMessage.includes('推荐')) {
        setShowRecommendations(true)
        loadFoodRecommendations()
      }

      if (inputMessage.includes('营养') || inputMessage.includes('搭配') || inputMessage.includes('今天吃什么')) {
        loadNutritionPlan()
      }

    } catch (error: any) {
      console.error('发送消息失败:', error)
      let errorContent = '抱歉，我现在无法回复您的消息。请稍后再试。'
      
      if (error.message) {
        errorContent = error.message
      }
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    if (action === '拍照识菜') {
      fileInputRef.current?.click()
    } else {
      setInputMessage(action)
      inputRef.current?.focus()
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      // 添加用户上传图片的消息
      const userMessage: ChatMessage = {
        role: 'user',
        content: '我上传了一张食物图片，请帮我识别一下',
        timestamp: new Date(),
        image: URL.createObjectURL(file)
      }
      setMessages(prev => [...prev, userMessage])

      // 调用图片识别API
      const result = await imageAPI.recognizeFood(file)
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: result.description || '图片分析完成，请查看详细信息。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      
    } catch (error: any) {
      console.error('图片识别失败:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，图片识别失败。请确保图片清晰并重新尝试。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsUploading(false)
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI饮食管家</h1>
              <p className="text-sm text-gray-500">智能饮食推荐助手</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </header>

      {/* 聊天区域 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble-ai flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>正在思考中...</span>
                </div>
              </div>
            )}

            {/* 食材推荐 */}
            {showRecommendations && foodRecommendations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">为您推荐：</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {foodRecommendations.map((food, index) => (
                    <FoodCard key={index} food={food} />
                  ))}
                </div>
              </div>
            )}

            {/* 营养计划 */}
            {showNutritionPlan && nutritionPlan.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">营养计划表：</h3>
                <NutritionTable plans={nutritionPlan} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 快捷操作按钮 */}
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => handleQuickAction('今天吃什么')}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                <Utensils size={16} />
                <span>今天吃什么</span>
              </button>
              <button
                onClick={() => handleQuickAction('拍照识菜')}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                <Camera size={16} />
                <span>拍照识菜</span>
              </button>
              <button
                onClick={() => handleQuickAction('营养搭配建议')}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                <BookOpen size={16} />
                <span>营养搭配</span>
              </button>
            </div>

            {/* 输入框 */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="请输入您的问题..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  disabled={isLoading || isUploading}
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isUploading}
                className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                title="上传图片识别食物"
              >
                {isUploading ? <LoadingSpinner size="sm" /> : <Upload size={20} />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || isUploading}
                className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage