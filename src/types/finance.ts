
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Category {
  name: string;
  budget: number;
  spent: number;
  color: string;
}
