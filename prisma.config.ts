import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: path.join(__dirname, '.env.local') });

/**
 * Prisma Configuration for Prisma 7.3+
 * 
 * This file configures the database connection URL for Prisma CLI commands
 * and the Prisma Client. In Prisma 7+, datasource URLs are configured here
 * instead of in the schema.prisma file.
 */

export default defineConfig({
  // Schema configuration
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),

  // Database connection configuration
  datasource: {
    // Primary connection URL (uses connection pooler for better performance)
    url: process.env.DATABASE_URL!,
  },
});
