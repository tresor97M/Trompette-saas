import { PrismaClient } from '.prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const connectionString = process.env.DATABASE_URL;

let prismaClient: PrismaClient;

// Safeguard against missing or placeholder DATABASE_URL (especially during initial setup or build checks)
const isDbConfigured = connectionString && !connectionString.includes('[PASSWORD]');

if (process.env.NODE_ENV === 'production') {
  if (isDbConfigured) {
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prismaClient = new PrismaClient({ adapter });
  } else {
    // Fallback instance to prevent import-time crash, will fail on actual queries.
    prismaClient = new PrismaClient();
  }
} else {
  if (!globalForPrisma.prisma) {
    if (isDbConfigured) {
      const pool = new pg.Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log: ['query', 'error', 'warn'],
      });
    } else {
      // Fallback instance for dev without configured DB
      globalForPrisma.prisma = new PrismaClient();
    }
  }
  prismaClient = globalForPrisma.prisma;
}

export const db = prismaClient;
