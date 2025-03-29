'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { store } from '@/lib/store';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  date: string;
  category: 'plumbing' | 'electrical' | 'structural' | 'appliance' | 'other';
}

export default function MaintenanceRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      // 从全局状态获取请求列表
      setRequests(store.getRequests());
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'plumbing':
        return '🚰';
      case 'electrical':
        return '⚡';
      case 'structural':
        return '🏗️';
      case 'appliance':
        return '🔌';
      default:
        return '🔧';
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Maintenance Requests</h1>
              <p className="mt-2 text-gray-400">View and manage maintenance requests</p>
            </div>
            <button
              onClick={() => router.push('/maintenance/new')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit New Request
            </button>
          </div>
        </motion.div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-4 text-sm font-medium text-gray-400">Title</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Priority</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Category</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-white/5">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <span className="text-blue-400">{getCategoryIcon(request.category)}</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-white">{request.title}</p>
                            <p className="text-sm text-gray-400">{request.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-400">{request.category}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-400">{request.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 