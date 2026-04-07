import React from 'react'
import { FoodItem } from '../types'
import { ShoppingCart, MapPin } from 'lucide-react'

interface FoodCardProps {
  food: FoodItem
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const handleAddToCart = () => {
    // TODO: 实现添加到购物车功能
    console.log('添加到购物车:', food.name)
  }

  return (
    <div className="food-card group">
      {/* 食材图片 */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
          <span className="text-4xl">🍎</span>
        </div>
        
        {/* 标签 */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {food.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded ${
                tag === '自营之选' 
                  ? 'bg-red-500 text-white'
                  : tag === '新品'
                  ? 'bg-green-500 text-white'
                  : tag === '限量'
                  ? 'bg-orange-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 食材信息 */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
          {food.name}
        </h3>
        
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <MapPin size={12} className="mr-1" />
          <span>{food.origin}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-3">{food.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-red-500">¥{food.price}</span>
            <span className="text-xs text-gray-500">/{food.weight}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="btn-secondary flex items-center space-x-1 text-sm px-3 py-2"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          热量: {food.calories_per_100g}千卡/100g
        </div>
      </div>
    </div>
  )
}

export default FoodCard