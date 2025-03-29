'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  category: 'general' | 'maintenance' | 'event' | 'emergency';
}

export default function Announcements() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Building Maintenance Schedule',
      content: 'Regular maintenance will be conducted next week. Please ensure your unit is accessible.',
      author: 'Property Manager',
      date: 'Mar 28, 2024',
      priority: 'high',
      category: 'maintenance'
    },
    {
      id: '2',
      title: 'Community BBQ Event',
      content: 'Join us for our monthly community BBQ event in the common area.',
      author: 'Events Committee',
      date: 'Mar 25, 2024',
      priority: 'medium',
      category: 'event'
    },
    {
      id: '3',
      title: 'Fire Alarm Testing',
      content: 'Fire alarm testing will be conducted tomorrow morning. Please do not be alarmed.',
      author: 'Safety Officer',
      date: 'Mar 24, 2024',
      priority: 'high',
      category: 'general'
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
        return 'text-red-400 bg-red-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'low':
        return 'text-green-400 bg-green-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maintenance':
        return '🔧';
      case 'event':
        return '🎉';
      case 'emergency':
        return '🚨';
      default:
        return '📢';
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
          <p className="mt-2 text-gray-400">Stay updated with the latest community news and updates</p>
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-xl">{getCategoryIcon(announcement.category)}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{announcement.title}</h2>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-400">By {announcement.author}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                  </span>
                </div>
                <p className="mt-4 text-gray-300">{announcement.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 