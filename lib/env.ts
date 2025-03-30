export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  enableEdgeFunctions: process.env.NEXT_PUBLIC_ENABLE_EDGE_FUNCTIONS === 'true',
  isProduction: process.env.NODE_ENV === 'production',
  vercelUrl: process.env.VERCEL_URL,
} as const; 