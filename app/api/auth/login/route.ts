import { NextResponse } from 'next/server';
import type { LoginCredentials } from '@/types/user';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    console.log('Login API route called');
    const body: LoginCredentials = await request.json();
    console.log('Login request body:', body);
    const { email, password } = body;

    // Find user by email
    const user = await db.users.findByEmail(email);
    console.log('Found user:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (in a real app, this would compare hashed passwords)
    if (user.password !== password) {
      console.log('Invalid password');
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create a simple token (in a real app, this would be a JWT)
    const token = Math.random().toString(36).substring(7);
    console.log('Generated token');

    // Remove password from user object before sending
    const { password: unused, ...userWithoutPassword } = user;
    void unused;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 