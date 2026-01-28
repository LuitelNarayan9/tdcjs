import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// Create Neon adapter with the connection string (bun auto-loads .env.local)
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

// Create a local Prisma client instance for seeding
const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

/**
 * Database Seed Script for Tumin Dhanbari Chandra Jyoti Sanstha
 * 
 * This script seeds the database with initial data including:
 * - Forum categories
 * - Blog categories
 * - News categories
 * - Event categories
 * - Document categories
 * - Video categories
 * - Site settings
 * - Email templates
 * 
 * Run with: bun run db:seed
 */

export async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed Forum Categories
    console.log('📁 Seeding forum categories...');
    const forumCategories = await prisma.forumCategory.createMany({
      data: [
        {
          name: 'General Discussion',
          slug: 'general-discussion',
          description: 'General community discussions and conversations',
          icon: '💬',
          color: '#3B82F6',
          order: 1,
        },
        {
          name: 'Announcements',
          slug: 'announcements',
          description: 'Official announcements from the Sanstha',
          icon: '📢',
          color: '#EF4444',
          order: 2,
        },
        {
          name: 'Cultural Events',
          slug: 'cultural-events',
          description: 'Discussions about cultural events and celebrations',
          icon: '🎉',
          color: '#F59E0B',
          order: 3,
        },
        {
          name: 'Family Tree',
          slug: 'family-tree',
          description: 'Questions and discussions about family tree and genealogy',
          icon: '🌳',
          color: '#10B981',
          order: 4,
        },
        {
          name: 'Help & Support',
          slug: 'help-support',
          description: 'Get help from the community',
          icon: '🆘',
          color: '#8B5CF6',
          order: 5,
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${forumCategories.count} forum categories`);

    // Seed Blog Categories
    console.log('📝 Seeding blog categories...');
    const blogCategories = await prisma.blogCategory.createMany({
      data: [
        {
          name: 'Community Stories',
          slug: 'community-stories',
          description: 'Stories from our community members',
          color: '#3B82F6',
          order: 1,
        },
        {
          name: 'History & Heritage',
          slug: 'history-heritage',
          description: 'Articles about our village history and heritage',
          color: '#059669',
          order: 2,
        },
        {
          name: 'Culture & Traditions',
          slug: 'culture-traditions',
          description: 'Articles about our cultural practices and traditions',
          color: '#D97706',
          order: 3,
        },
        {
          name: 'News & Updates',
          slug: 'news-updates',
          description: 'Latest news and updates from the Sanstha',
          color: '#DC2626',
          order: 4,
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${blogCategories.count} blog categories`);

    // Seed News Categories
    console.log('📰 Seeding news categories...');
    const newsCategories = await prisma.newsCategory.createMany({
      data: [
        {
          name: 'Announcements',
          slug: 'announcements',
          description: 'Official announcements from Sanstha',
          color: '#EF4444',
          order: 1,
        },
        {
          name: 'Events',
          slug: 'events',
          description: 'Upcoming and past event coverage',
          color: '#3B82F6',
          order: 2,
        },
        {
          name: 'Community',
          slug: 'community',
          description: 'Community news and updates',
          color: '#10B981',
          order: 3,
        },
        {
          name: 'Development',
          slug: 'development',
          description: 'Village and community development news',
          color: '#F59E0B',
          order: 4,
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${newsCategories.count} news categories`);

    // Seed Event Categories
    console.log('📅 Seeding event categories...');
    const eventCategories = await prisma.eventCategory.createMany({
      data: [
        {
          name: 'Annual Gatherings',
          slug: 'annual-gatherings',
          description: 'Yearly community gatherings and meetings',
          color: '#3B82F6',
          icon: '📅',
        },
        {
          name: 'Cultural Festivals',
          slug: 'cultural-festivals',
          description: 'Cultural and religious festivals',
          color: '#F59E0B',
          icon: '🎊',
        },
        {
          name: 'Community Service',
          slug: 'community-service',
          description: 'Social work and community service events',
          color: '#10B981',
          icon: '🤝',
        },
        {
          name: 'Workshops',
          slug: 'workshops',
          description: 'Educational workshops and seminars',
          color: '#8B5CF6',
          icon: '📚',
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${eventCategories.count} event categories`);

    // Seed Document Categories
    console.log('📄 Seeding document categories...');
    const documentCategories = await prisma.documentCategory.createMany({
      data: [
        {
          name: 'Constitution',
          slug: 'constitution',
          description: 'Sanstha constitution and bylaws',
          icon: '📜',
        },
        {
          name: 'Meeting Minutes',
          slug: 'meeting-minutes',
          description: 'Minutes from official meetings',
          icon: '📋',
        },
        {
          name: 'Financial Reports',
          slug: 'financial-reports',
          description: 'Annual financial reports and statements',
          icon: '💰',
        },
        {
          name: 'Forms',
          slug: 'forms',
          description: 'Official forms and applications',
          icon: '📝',
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${documentCategories.count} document categories`);

    // Seed Video Categories
    console.log('🎥 Seeding video categories...');
    const videoCategories = await prisma.videoCategory.createMany({
      data: [
        {
          name: 'Events',
          slug: 'events',
          description: 'Videos from community events',
        },
        {
          name: 'Interviews',
          slug: 'interviews',
          description: 'Interviews with community members',
        },
        {
          name: 'Tutorials',
          slug: 'tutorials',
          description: 'Educational and tutorial videos',
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${videoCategories.count} video categories`);

    // Seed Site Settings
    console.log('⚙️ Seeding site settings...');
    const siteSettings = await prisma.siteSetting.createMany({
      data: [
        {
          key: 'site_name',
          value: 'Tumin Dhanbari Chandra Jyoti Sanstha',
          type: 'string',
          category: 'general',
          description: 'The name of the website',
        },
        {
          key: 'site_description',
          value: 'A comprehensive community platform for Tumin Dhanbari village members',
          type: 'string',
          category: 'seo',
          description: 'Meta description for SEO',
        },
        {
          key: 'contact_email',
          value: 'contact@tdcjs.org',
          type: 'string',
          category: 'contact',
          description: 'Contact email address',
        },
        {
          key: 'maintenance_mode',
          value: 'false',
          type: 'boolean',
          category: 'general',
          description: 'Enable maintenance mode',
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${siteSettings.count} site settings`);

    // Seed Email Templates
    console.log('📧 Seeding email templates...');
    const emailTemplates = await prisma.emailTemplate.createMany({
      data: [
        {
          name: 'welcome',
          subject: 'Welcome to Tumin Dhanbari Chandra Jyoti Sanstha!',
          body: '<h1>Welcome, {{name}}!</h1><p>Thank you for joining our community platform.</p>',
          variables: ['name', 'email'],
        },
        {
          name: 'verify-email',
          subject: 'Verify your email address',
          body: '<h1>Verify Your Email</h1><p>Click the link below to verify your email address:</p><a href="{{verificationUrl}}">Verify Email</a>',
          variables: ['name', 'verificationUrl'],
        },
        {
          name: 'reset-password',
          subject: 'Reset your password',
          body: '<h1>Reset Password</h1><p>Click the link below to reset your password:</p><a href="{{resetUrl}}">Reset Password</a>',
          variables: ['name', 'resetUrl'],
        },
      ],
      skipDuplicates: true,
    });
    console.log(`   ✅ Created ${emailTemplates.count} email templates`);

    console.log('\n✨ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Run seed when executed directly
async function main() {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
