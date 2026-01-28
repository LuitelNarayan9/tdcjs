/**
 * localtunnel Tunnel Script
 * Exposes localhost:3000 for Clerk webhooks
 * 
 * Usage: bun run tunnel
 */

import localtunnel from 'localtunnel';

const PORT = 3000;

async function startTunnel() {
  try {
    console.log('\n🚀 Starting localtunnel...\n');
    
    const tunnel = await localtunnel({ port: PORT });

    console.log('='.repeat(60));
    console.log(`\n  📡 Public URL: ${tunnel.url}`);
    console.log(`  🔗 Webhook URL: ${tunnel.url}/api/webhooks/clerk\n`);
    console.log('='.repeat(60));
    console.log('\n📋 Clerk Dashboard Setup:');
    console.log('  1. Go to Clerk Dashboard → Webhooks');
    console.log(`  2. Add endpoint: ${tunnel.url}/api/webhooks/clerk`);
    console.log('  3. Subscribe to: user.created, user.updated, user.deleted');
    console.log('  4. Copy the Signing Secret to CLERK_WEBHOOK_SECRET\n');
    console.log('⚠️  First request may show a "localtunnel" splash page.');
    console.log('    Click through it to continue.\n');

    tunnel.on('close', () => {
      console.log('\n👋 Tunnel closed');
      process.exit(0);
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });

    // Keep running
    process.on('SIGINT', () => {
      tunnel.close();
    });

  } catch (error) {
    console.error('❌ Failed to start tunnel:', error);
    process.exit(1);
  }
}

startTunnel();
