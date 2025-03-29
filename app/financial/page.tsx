'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

export default function Financial() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const financialStats = [
    { name: 'Monthly Fee', value: '$500', status: 'Paid', date: 'Due 1st of each month' },
    { name: 'Special Levy', value: '$1,200', status: 'Pending', date: 'Due in 2 weeks' },
    { name: 'Insurance', value: '$2,500', status: 'Paid', date: 'Annual payment' },
    { name: 'Maintenance Fund', value: '$5,000', status: 'Active', date: 'Current balance' },
  ];

  const recentTransactions = [
    { type: 'payment', description: 'Monthly Fee Payment', amount: '$500', date: 'Mar 1, 2024' },
    { type: 'refund', description: 'Maintenance Refund', amount: '$200', date: 'Feb 28, 2024' },
    { type: 'charge', description: 'Special Levy', amount: '$1,200', date: 'Feb 15, 2024' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-white/10"
        >
          <h1 className="text-3xl font-bold text-white">Financial Overview</h1>
          <p className="mt-2 text-gray-400">Manage your property finances and payments</p>
        </motion.div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-sm font-medium text-gray-400">{stat.name}</h3>
              <div className="mt-2">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    stat.status === 'Paid' ? 'text-green-400' :
                    stat.status === 'Pending' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>
                    {stat.status}
                  </span>
                  <span className="text-sm text-gray-400">{stat.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-medium text-white">Recent Transactions</h2>
            <div className="mt-4 space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'payment' ? 'bg-green-500/20' :
                      transaction.type === 'refund' ? 'bg-blue-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <span className="text-lg">
                        {transaction.type === 'payment' ? '💰' :
                         transaction.type === 'refund' ? '💸' : '📝'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white">{transaction.description}</p>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-medium ${
                    transaction.type === 'payment' ? 'text-green-400' :
                    transaction.type === 'refund' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 