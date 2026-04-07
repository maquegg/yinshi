import axios from 'axios'
import { ChatRequest, ChatResponse, FoodItem, NutritionPlan } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 增加到120秒，适应AI模型响应时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    
    // 提供更友好的错误信息
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      error.message = 'AI正在思考中，请求超时。请稍后重试或简化您的问题。'
    } else if (error.response?.status === 408) {
      error.message = error.response.data?.detail || 'AI模型响应超时，请稍后重试或简化您的问题'
    } else if (error.response?.status === 500) {
      error.message = '服务器内部错误，请稍后重试'
    } else if (error.response?.status === 404) {
      error.message = 'API接口不存在'
    } else if (!error.response) {
      error.message = '网络连接失败，请检查网络设置'
    } else if (error.name === 'AbortError') {
      error.message = '请求被取消'
    }
    
    return Promise.reject(error)
  }
)

export const chatAPI = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post('/api/chat', request)
    return response.data
  },
}

export const foodAPI = {
  getRecommendations: async (category: string = 'apple', limit: number = 5): Promise<FoodItem[]> => {
    const response = await api.get('/api/foods/recommend', {
      params: { category, limit }
    })
    return response.data
  },
}

export const nutritionAPI = {
  createPlan: async (preferences: any = {}): Promise<NutritionPlan[]> => {
    const response = await api.post('/api/nutrition/plan', preferences)
    return response.data
  },
}

export const imageAPI = {
  analyzeImage: async (imageUrl: string, question: string = '这是什么食物？请分析其营养价值和推荐搭配。') => {
    const response = await api.post('/api/analyze-image', {
      image_url: imageUrl,
      question: question
    })
    return response.data
  },
  
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.image_url
  },
  
  recognizeFood: async (file: File) => {
    try {
      // 先上传图片
      const imageUrl = await imageAPI.uploadImage(file)
      
      // 然后分析图片
      const analysis = await imageAPI.analyzeImage(imageUrl, '请识别这张图片中的食物，并提供详细的营养信息，包括食物名称、热量、蛋白质、碳水化合物、脂肪含量等。')
      
      // 解析AI分析结果，提取关键信息
      const analysisText = analysis.analysis || ''
      
      return {
        food_name: '上传的食物图片',
        calories: '请查看详细分析',
        protein: '请查看详细分析',
        carbs: '请查看详细分析', 
        fat: '请查看详细分析',
        description: analysisText,
        image_url: imageUrl
      }
    } catch (error) {
      console.error('图片识别API调用失败:', error)
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      throw new Error(`食物识别失败: ${errorMessage}`)
    }
  },
}

export const healthAPI = {
  check: async () => {
    const response = await api.get('/api/health')
    return response.data
  },
}

export default api