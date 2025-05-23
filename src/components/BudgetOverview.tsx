
import React from 'react';
import { Category } from '../types/finance';

interface BudgetOverviewProps {
  categories: Category[];
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ categories }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Budget Overview</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = category.spent > category.budget;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium text-slate-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-slate-700'}`}>
                    ${category.spent.toFixed(2)}
                  </span>
                  <span className="text-slate-500 text-sm"> / ${category.budget}</span>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r'
                  }`}
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    background: isOverBudget ? undefined : `linear-gradient(to right, ${category.color}, ${category.color}99)`
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-slate-500">
                <span>{percentage.toFixed(1)}% used</span>
                <span>${(category.budget - category.spent).toFixed(2)} left</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;
