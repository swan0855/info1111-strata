import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 这里应该使用支持 Edge Runtime 的数据库客户端
    // 例如: Vercel KV, Upstash Redis, 或 PlanetScale
    const announcements = [
      {
        id: '1',
        title: 'Monthly Meeting',
        content: 'Join us for the monthly residents meeting next week.',
        date: '2024-02-20',
        priority: 'medium',
        category: 'event'
      },
      {
        id: '2',
        title: 'Building Maintenance',
        content: 'Scheduled maintenance work will be carried out this weekend.',
        date: '2024-02-19',
        priority: 'high',
        category: 'maintenance'
      },
      {
        id: '3',
        title: 'Community Event',
        content: 'Annual community BBQ event coming up next month.',
        date: '2024-02-18',
        priority: 'low',
        category: 'event'
      }
    ];

    return NextResponse.json({ announcements });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
} 