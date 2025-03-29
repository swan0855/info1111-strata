import { NextResponse } from 'next/server';
import type { RegisterData } from '@/types/user';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    console.log('Register API route called');
    const body: RegisterData = await request.json();
    console.log('Register request body:', body);
    const { email, password, name, unitNumber } = body;

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email);
    console.log('Existing user check:', existingUser ? 'Yes' : 'No');

    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await db.users.create({
      email,
      password, // In a real app, this would be hashed
      name,
      unitNumber,
      role: 'resident',
    });
    console.log('New user created');

    // Create a simple token (in a real app, this would be a JWT)
    const token = Math.random().toString(36).substring(7);
    console.log('Generated token');

    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 