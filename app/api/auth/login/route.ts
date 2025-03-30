import { NextResponse } from 'next/server';
import type { LoginCredentials } from '@/types/user';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body: LoginCredentials = await request.json();
    const { email, password } = body;

    if (email === 'admin@example.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Admin',
          email: 'admin@example.com',
          role: 'manager',
          unitNumber: '001'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 