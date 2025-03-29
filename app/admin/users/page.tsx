'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { store } from '@/lib/store';

interface User {
  name: string;
  email: string;
  role: string;
  unitNumber?: string;
}

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.role !== 'manager') {
        router.push('/dashboard');
      } else {
        // 从全局状态获取用户列表
        setUsers(store.getUsers());
      }
    }
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'inactive':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-purple-500/20 text-purple-400';
      case 'resident':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
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
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="mt-2 text-gray-400">Manage users and their permissions</p>
        </motion.div>

        {/* User List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white">Users</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Add New User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-4 text-sm font-medium text-gray-400">Name</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Email</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Role</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Unit</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <span className="text-blue-400">👤</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-white">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-gray-400">{user.email}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-gray-400">{user.unitNumber || 'N/A'}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('active')}`}>
                          Active
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-400 hover:text-blue-300">
                            Edit
                          </button>
                          <button className="p-1 text-red-400 hover:text-red-300">
                            Delete
                          </button>
                        </div>
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