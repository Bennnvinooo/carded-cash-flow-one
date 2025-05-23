
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Transaction } from '../types/finance';

interface QuickAddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const QuickAddTransaction: React.FC<QuickAddTransactionProps> = ({ onAddTransaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Shopping', 'Income'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const transaction = {
      amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : parseFloat(amount),
      description,
      category,
      date: new Date().toISOString().split('T')[0],
      type
    };

    onAddTransaction(transaction);
    setAmount('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Add</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all ${
              type === 'expense'
                ? 'bg-red-50 text-red-600 border-2 border-red-200'
                : 'bg-slate-50 text-slate-600 border-2 border-transparent'
            }`}
          >
            <Minus className="w-4 h-4" />
            <span>Expense</span>
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all ${
              type === 'income'
                ? 'bg-green-50 text-green-600 border-2 border-green-200'
                : 'bg-slate-50 text-slate-600 border-2 border-transparent'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Income</span>
          </button>
        </div>

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddTransaction;
