import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 这里应该使用支持 Edge Runtime 的数据库客户端
    // 例如: Vercel KV, Upstash Redis, 或 PlanetScale
    const requests = [
      {
        id: '1',
        title: 'Leaking Faucet',
        description: 'The kitchen faucet is leaking',
        status: 'pending',
        priority: 'high',
        date: '2024-02-19',
        category: 'plumbing'
      },
      {
        id: '2',
        title: 'Broken Light',
        description: 'Light fixture in living room not working',
        status: 'in_progress',
        priority: 'medium',
        date: '2024-02-18',
        category: 'electrical'
      },
      {
        id: '3',
        title: 'Cracked Window',
        description: 'Window in bedroom has a crack',
        status: 'completed',
        priority: 'low',
        date: '2024-02-17',
        category: 'general'
      }
    ];

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
} 