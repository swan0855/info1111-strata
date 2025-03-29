'use client';

import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

interface FinancialData {
  income: number;
  expenses: number;
}

interface FinancialPieChartProps {
  isAdmin: boolean;
}

export default function FinancialPieChart({ isAdmin }: FinancialPieChartProps) {
  const [financialData, setFinancialData] = useState<FinancialData>({
    income: 300000,
    expenses: 250000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<FinancialData>({
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    setEditValues(financialData);
  }, [financialData]);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [financialData.income, financialData.expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setFinancialData(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(financialData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof FinancialData, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [field]: Number(value) || 0,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2">
          <Pie data={chartData} />
        </div>
        <div className="w-full md:w-1/2">
          {isEditing && isAdmin ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Income</label>
                <input
                  type="number"
                  value={editValues.income}
                  onChange={(e) => handleChange('income', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expenses</label>
                <input
                  type="number"
                  value={editValues.expenses}
                  onChange={(e) => handleChange('expenses', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Income</p>
                <p className="text-2xl font-semibold text-green-600">
                  ${financialData.income.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Expenses</p>
                <p className="text-2xl font-semibold text-red-600">
                  ${financialData.expenses.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Balance</p>
                <p className="text-2xl font-semibold text-blue-600">
                  ${(financialData.income - financialData.expenses).toLocaleString()}
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Values
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 