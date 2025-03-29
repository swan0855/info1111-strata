import type { User } from '@/types/user';

// In-memory database
const users: User[] = [
  {
    id: '1',
    email: '1@1.com',
    password: '1', 
    name: '1',
    role: 'manager',
    createdAt: new Date(),
  },
];

export const db = {
  users: {
    create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },
    findByEmail: async (email: string): Promise<User | null> => {
      return users.find(user => user.email === email) || null;
    },
    findById: async (id: string): Promise<User | null> => {
      return users.find(user => user.id === id) || null;
    },
  },
}; 