'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'maintenance' | 'event' | 'emergency';
}

export default function Announcements() {
  const router = useRouter();
  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Monthly Meeting',
      content: 'Join us for the monthly residents meeting next week.',
      date: '2024-02-20',
      priority: 'medium',
      category: 'event'
    },
    {
      id: '2',
      title: 'Building Maintenance',
      content: 'Scheduled maintenance work will be carried out this weekend.',
      date: '2024-02-19',
      priority: 'high',
      category: 'maintenance'
    },
    {
      id: '3',
      title: 'Community Event',
      content: 'Annual community BBQ event coming up next month.',
      date: '2024-02-18',
      priority: 'low',
      category: 'event'
    }
  ]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

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
      case 'general':
        return '📢';
      case 'maintenance':
        return '🔧';
      case 'event':
        return '🎉';
      case 'emergency':
        return '🚨';
      default:
        return '📝';
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
          <h1 className="text-3xl font-bold text-white">Announcements</h1>
          <p className="mt-2 text-gray-400">Stay updated with the latest news and updates</p>
        </motion.div>

        {/* Announcements List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-xl">{getCategoryIcon(announcement.category)}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{announcement.title}</h2>
                        <div className="mt-1 flex items-center space-x-4">
                          <span className="text-sm text-gray-400">{announcement.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 