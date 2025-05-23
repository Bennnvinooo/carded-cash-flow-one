
import React, { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';
import QuickAddTransaction from '../components/QuickAddTransaction';
import TransactionList from '../components/TransactionList';
import BudgetOverview from '../components/BudgetOverview';
import { Transaction, Category } from '../types/finance';

const Index = () => {
  const [balance, setBalance] = useState(2450.75);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: -85.50,
      description: 'Grocery Shopping',
      category: 'Food',
      date: '2025-05-23',
      type: 'expense'
    },
    {
      id: '2',
      amount: 2500.00,
      description: 'Monthly Salary',
      category: 'Income',
      date: '2025-05-20',
      type: 'income'
    },
    {
      id: '3',
      amount: -45.00,
      description: 'Gas Station',
      category: 'Transport',
      date: '2025-05-22',
      type: 'expense'
    },
    {
      id: '4',
      amount: -120.00,
      description: 'Electric Bill',
      category: 'Bills',
      date: '2025-05-21',
      type: 'expense'
    }
  ]);

  const categories: Category[] = [
    { name: 'Food', budget: 400, spent: 85.50, color: '#FF6B6B' },
    { name: 'Transport', budget: 200, spent: 45.00, color: '#4ECDC4' },
    { name: 'Bills', budget: 800, spent: 120.00, color: '#45B7D1' },
    { name: 'Entertainment', budget: 300, spent: 0, color: '#96CEB4' },
    { name: 'Shopping', budget: 250, spent: 0, color: '#FFEAA7' }
  ];

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + transaction.amount);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Finance Tracker</h1>
          <p className="text-slate-600 text-sm">Manage your money wisely</p>
        </div>

        {/* Account Balance Card */}
        <AccountCard 
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Quick Add Transaction */}
        <QuickAddTransaction onAddTransaction={addTransaction} />

        {/* Budget Overview */}
        <BudgetOverview categories={categories} />

        {/* Recent Transactions */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default Index;
