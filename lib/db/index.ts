import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

/**
 * Prisma Client Singleton for Next.js with Neon Adapter
 *
 * In development, the module is reloaded frequently due to Next.js hot reload,
 * which would create multiple Prisma Client instances. To prevent this,
 * we store the client in the global object.
 *
 * In production, a single instance is used throughout the application lifecycle.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create Prisma Client with Neon adapter for Prisma 7.3
 */
function createPrismaClient(): PrismaClient {
  // Create Neon adapter with the connection string
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

/**
 * Get or create the Prisma Client instance
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Prevent multiple instances during hot reloading in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Database connection helper functions
 */

/**
 * Disconnect from the database
 * Useful for graceful shutdown or cleanup
 */
export async function disconnect(): Promise<void> {
  await prisma.$disconnect();
}

/**
 * Connect to the database
 * Explicitly connects to the database (usually not needed as Prisma connects lazily)
 */
export async function connect(): Promise<void> {
  await prisma.$connect();
}

/**
 * Health check for database connection
 * Returns true if the database is accessible
 */
export async function healthCheck(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Execute a transaction with automatic retry
 * @param fn - The transaction function to execute
 * @param maxRetries - Maximum number of retries (default: 3)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Only retry on connection/timeout errors
      const isRetryable =
        error instanceof Error &&
        (error.message.includes('connection') ||
          error.message.includes('timeout') ||
          error.message.includes('ECONNRESET'));

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Default export for convenience
export default prisma;
