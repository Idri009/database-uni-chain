import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Simplified Supabase configuration
const createPrismaClient = () => {
  const baseUrl = process.env.DATABASE_URL?.split('?')[0] || '';
  const connectionString = `${baseUrl}?prepared_statements=false`;
  
  console.log('🔗 Prisma connecting to:', baseUrl.replace(/:[^:@]*@/, ':****@'));
  
  return new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Optimize for serverless
    transactionOptions: {
      maxWait: 5000, // 5 seconds
      timeout: 10000, // 10 seconds
    },
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Graceful shutdown for serverless
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
