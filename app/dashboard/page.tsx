'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface User {
  name: string;
  email: string;
  role: string;
  unitNumber: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const stats = [
    { name: 'Total Units', value: '150', change: '+2%', changeType: 'increase' },
    { name: 'Active Requests', value: '12', change: '-3', changeType: 'decrease' },
    { name: 'Monthly Revenue', value: '$45,000', change: '+8%', changeType: 'increase' },
    { name: 'Pending Approvals', value: '5', change: '+2', changeType: 'increase' },
  ];

  const recentActivity = [
    { type: 'request', title: 'New Maintenance Request', time: '2 hours ago', unit: 'Unit 123' },
    { type: 'payment', title: 'Payment Received', time: '4 hours ago', unit: 'Unit 456' },
    { type: 'announcement', title: 'New Announcement', time: '6 hours ago', unit: 'All Units' },
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
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || 'User'}</h1>
          <p className="mt-2 text-gray-400">Here's what's happening with your property</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-sm font-medium text-gray-400">{stat.name}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-lg font-medium text-white">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'request' ? 'bg-blue-500/20' :
                      activity.type === 'payment' ? 'bg-green-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      <span className="text-lg">
                        {activity.type === 'request' ? '🔧' :
                         activity.type === 'payment' ? '💰' : '📢'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.unit}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 