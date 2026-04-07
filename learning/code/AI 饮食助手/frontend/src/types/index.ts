export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
  image?: string
}

export interface ChatResponse {
  response: string
  conversation_id?: string
}

export interface FoodItem {
  name: string
  price: number
  weight: string
  origin: string
  description: string
  image_url: string
  calories_per_100g: number
  tags: string[]
}

export interface NutritionPlan {
  dish_name: string
  weight_grams: number
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ChatRequest {
  message: string
  conversation_history?: ChatMessage[]
}