import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 这里应该是真实的用户验证逻辑
    if (email === 'admin@example.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'manager',
          unitNumber: '101'
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