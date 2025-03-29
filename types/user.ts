export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'resident' | 'manager';
  unitNumber?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  unitNumber: string;
} 