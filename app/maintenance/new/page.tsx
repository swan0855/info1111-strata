'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { store } from '@/lib/store';

interface MaintenanceRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'plumbing' | 'electrical' | 'structural' | 'appliance' | 'other';
}

export default function NewMaintenanceRequest() {
  const router = useRouter();
  const [request, setRequest] = useState<MaintenanceRequest>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'other'
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 创建新的请求对象
    const newRequest = {
      ...request,
      id: Date.now().toString(), // 使用时间戳作为临时ID
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0]
    };

    // 添加到全局状态
    store.addRequest(newRequest);

    // 重定向到请求列表页面
    router.push('/maintenance');
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
          <h1 className="text-3xl font-bold text-white">Submit New Request</h1>
          <p className="mt-2 text-gray-400">Create a new maintenance request</p>
        </motion.div>

        {/* Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Title</label>
                <input
                  type="text"
                  value={request.title}
                  onChange={(e) => setRequest({ ...request, title: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  value={request.description}
                  onChange={(e) => setRequest({ ...request, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Priority</label>
                  <select
                    value={request.priority}
                    onChange={(e) => setRequest({ ...request, priority: e.target.value as MaintenanceRequest['priority'] })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400">Category</label>
                  <select
                    value={request.category}
                    onChange={(e) => setRequest({ ...request, category: e.target.value as MaintenanceRequest['category'] })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="structural">Structural</option>
                    <option value="appliance">Appliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/maintenance')}
                className="px-6 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
} 