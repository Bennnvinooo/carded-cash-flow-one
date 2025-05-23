
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Category } from '../types/finance';
import { MessageCircle, Loader2 } from 'lucide-react';

interface BudgetOverviewProps {
  categories: Category[];
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ categories }) => {
  const [gptInsight, setGptInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  // Prepare data for the radial chart
  const chartData = categories.map(category => ({
    name: category.name,
    value: category.spent,
    budget: category.budget,
    color: category.color,
    percentage: (category.spent / category.budget) * 100
  }));

  const chartConfig = {
    value: {
      label: "Spent",
    },
  };

  const getGptInsight = async () => {
    setIsLoadingInsight(true);
    try {
      // Simulate GPT API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
      const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
      const utilizationRate = ((totalSpent / totalBudget) * 100).toFixed(1);
      
      setGptInsight(`💡 Budget Analysis: You've used ${utilizationRate}% of your total budget. Your highest spending category is ${categories.reduce((max, cat) => cat.spent > max.spent ? cat : max).name}. Consider reducing expenses in this area to stay on track.`);
    } catch (error) {
      setGptInsight('Unable to generate insights at the moment. Please try again later.');
    } finally {
      setIsLoadingInsight(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Budget Overview</h3>
      
      <Carousel className="w-full">
        <CarouselContent>
          {/* List View */}
          <CarouselItem>
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
          </CarouselItem>

          {/* Chart View */}
          <CarouselItem>
            <div className="space-y-4">
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              {/* Chart Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-slate-600">{entry.name}</span>
                    <span className="font-medium">${entry.value.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>

          {/* GPT Insights View */}
          <CarouselItem>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-700">AI Insights</h4>
                <button
                  onClick={getGptInsight}
                  disabled={isLoadingInsight}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isLoadingInsight ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                  <span>{isLoadingInsight ? 'Analyzing...' : 'Get Insights'}</span>
                </button>
              </div>

              {gptInsight ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-slate-700 text-sm leading-relaxed">{gptInsight}</p>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <p className="text-slate-500 text-sm">Click "Get Insights" to receive AI-powered budget analysis</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                  <div className="text-xs text-green-600 font-medium">Total Budget</div>
                  <div className="text-lg font-bold text-green-700">
                    ${categories.reduce((sum, cat) => sum + cat.budget, 0).toFixed(0)}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="text-xs text-orange-600 font-medium">Total Spent</div>
                  <div className="text-lg font-bold text-orange-700">
                    ${categories.reduce((sum, cat) => sum + cat.spent, 0).toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {/* Swipe indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default BudgetOverview;
