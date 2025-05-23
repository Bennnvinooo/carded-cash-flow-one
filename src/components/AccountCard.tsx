
import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface AccountCardProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

const AccountCard: React.FC<AccountCardProps> = ({ balance, totalIncome, totalExpenses }) => {
  const handleIncomeClick = () => {
    console.log('Income section clicked');
    // Add your income-related functionality here
  };

  const handleExpensesClick = () => {
    console.log('Expenses section clicked');
    // Add your expenses-related functionality here
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6" />
          <span className="text-blue-100 font-medium">Total Balance</span>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-1">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
        <p className="text-blue-100 text-sm">Available balance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleIncomeClick}
          className="bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer group"
        >
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-300 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-blue-100 font-medium">Income</span>
          </div>
          <p className="text-lg font-semibold text-green-300">
            +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </button>
        
        <button
          onClick={handleExpensesClick}
          className="bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer group"
        >
          <div className="flex items-center space-x-2 mb-1">
            <TrendingDown className="w-4 h-4 text-red-300 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-blue-100 font-medium">Expenses</span>
          </div>
          <p className="text-lg font-semibold text-red-300">
            -${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
