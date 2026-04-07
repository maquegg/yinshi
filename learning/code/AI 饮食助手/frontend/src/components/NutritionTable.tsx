import React from 'react'
import { NutritionPlan } from '../types'

interface NutritionTableProps {
  plans: NutritionPlan[]
}

const NutritionTable: React.FC<NutritionTableProps> = ({ plans }) => {
  const totalCalories = plans.reduce((sum, plan) => sum + plan.calories, 0)
  const totalProtein = plans.reduce((sum, plan) => sum + plan.protein, 0)
  const totalCarbs = plans.reduce((sum, plan) => sum + plan.carbs, 0)
  const totalFat = plans.reduce((sum, plan) => sum + plan.fat, 0)

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                菜品
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                重量 (克)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                热量 (千卡)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                蛋白质 (g)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                碳水 (g)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                脂肪 (g)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {plan.dish_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {plan.weight_grams}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {plan.calories}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {plan.protein.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {plan.carbs.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {plan.fat.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr className="font-semibold">
              <td className="px-4 py-3 text-sm text-gray-900">总计</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {plans.reduce((sum, plan) => sum + plan.weight_grams, 0)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {totalCalories}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {totalProtein.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {totalCarbs.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {totalFat.toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* 营养摘要 */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span className="text-gray-600">总热量: <span className="font-semibold">{totalCalories} 千卡</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-gray-600">蛋白质: <span className="font-semibold">{totalProtein.toFixed(1)}g</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-600">碳水化合物: <span className="font-semibold">{totalCarbs.toFixed(1)}g</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-600">脂肪: <span className="font-semibold">{totalFat.toFixed(1)}g</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionTable