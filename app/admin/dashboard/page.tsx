'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalUsers: number;
  activeRequests: number;
  totalRevenue: number;
  pendingApprovals: number;
}

interface RecentActivity {
  type: 'user' | 'request' | 'payment' | 'announcement';
  title: string;
  time: string;
  details: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 150,
    activeRequests: 12,
    totalRevenue: 45000,
    pendingApprovals: 5
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      type: 'user',
      title: 'New User Registration',
      time: '2 hours ago',
      details: 'John Doe registered as a new resident'
    },
    {
      type: 'request',
      title: 'Maintenance Request',
      time: '4 hours ago',
      details: 'Unit 123 submitted a new maintenance request'
    },
    {
      type: 'payment',
      title: 'Payment Received',
      time: '6 hours ago',
      details: 'Monthly fee payment from Unit 456'
    },
    {
      type: 'announcement',
      title: 'Announcement Created',
      time: '8 hours ago',
      details: 'New community event announcement'
    }
  ]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.role !== 'manager') {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return '👤';
      case 'request':
        return '🔧';
      case 'payment':
        return '💰';
      case 'announcement':
        return '📢';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-500/20';
      case 'request':
        return 'bg-yellow-500/20';
      case 'payment':
        return 'bg-green-500/20';
      case 'announcement':
        return 'bg-purple-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };

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
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-400">Overview of your property management system</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
              <h3 className="text-sm font-medium text-gray-400">
                {key.split(/(?=[A-Z])/).join(' ')}
              </h3>
              <div className="mt-2">
                <p className="text-2xl font-semibold text-white">
                  {typeof value === 'number' && key.includes('Revenue') ? `$${value.toLocaleString()}` : value.toLocaleString()}
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    </div>
                    <div>
                      <p className="text-white">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.details}</p>
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