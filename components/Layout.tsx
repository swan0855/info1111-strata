'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  role: string;
  unitNumber?: string;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        userButtonRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navigation = [
    { name: 'Financial Overview', href: '/financial', icon: '💰' },
    { name: 'Announcements', href: '/announcements', icon: '📢' },
    { name: 'Requests', href: '/maintenance', icon: '🔧' },
  ];

  // Add admin navigation if user is admin
  if (user?.role === 'manager') {
    navigation.push(
      { name: 'Admin Dashboard', href: '/admin/dashboard', icon: '⚙️' },
      { name: 'User Management', href: '/admin/users', icon: '👥' },
      { name: 'Settings', href: '/admin/settings', icon: '⚙️' }
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="relative bg-gray-900/50 backdrop-blur-xl border-r border-white/10"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <span className="text-2xl">🏢</span>
              {!isCollapsed && <span className="text-xl font-bold">Strata</span>}
            </Link>
          </div>

          {/* User Profile */}
          <div className="px-4 py-3 border-t border-white/10">
            <div 
              ref={userButtonRef}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="font-medium">{user?.name || 'Loading...'}</p>
                  <p className="text-sm text-gray-400">{user?.unitNumber || 'No Unit'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-4 border-t border-white/10 hover:bg-white/5 transition-colors"
          >
            <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </div>

      {/* User Menu */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            ref={userMenuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed top-20 left-4 z-50 w-64 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 