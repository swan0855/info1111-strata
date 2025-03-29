'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

interface Settings {
  propertyName: string;
  address: string;
  totalUnits: number;
  monthlyFee: number;
  maintenanceFee: number;
  emergencyContact: string;
  officeHours: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({
    propertyName: 'Sunset Apartments',
    address: '123 Main Street, City, State 12345',
    totalUnits: 100,
    monthlyFee: 500,
    maintenanceFee: 100,
    emergencyContact: '+1 (555) 123-4567',
    officeHours: 'Monday - Friday: 9:00 AM - 5:00 PM'
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update
    console.log('Settings updated:', settings);
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
          <h1 className="text-3xl font-bold text-white">Property Settings</h1>
          <p className="mt-2 text-gray-400">Manage your property configuration</p>
        </motion.div>

        {/* Settings Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white">Property Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Property Name</label>
                  <input
                    type="text"
                    value={settings.propertyName}
                    onChange={(e) => setSettings({ ...settings, propertyName: e.target.value })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Total Units</label>
                  <input
                    type="number"
                    value={settings.totalUnits}
                    onChange={(e) => setSettings({ ...settings, totalUnits: parseInt(e.target.value) })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Financial Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white">Financial Settings</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Monthly Fee ($)</label>
                  <input
                    type="number"
                    value={settings.monthlyFee}
                    onChange={(e) => setSettings({ ...settings, monthlyFee: parseInt(e.target.value) })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Maintenance Fee ($)</label>
                  <input
                    type="number"
                    value={settings.maintenanceFee}
                    onChange={(e) => setSettings({ ...settings, maintenanceFee: parseInt(e.target.value) })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Emergency Contact</label>
                  <input
                    type="text"
                    value={settings.emergencyContact}
                    onChange={(e) => setSettings({ ...settings, emergencyContact: e.target.value })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Office Hours</label>
                  <input
                    type="text"
                    value={settings.officeHours}
                    onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                    className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
} 