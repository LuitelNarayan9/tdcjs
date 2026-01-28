/**
 * Script to populate empty route.ts files with placeholder content
 * Run with: bun run scripts/fix-empty-routes.ts
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, dirname } from 'path';

const appDir = join(import.meta.dirname, '../app');

function getRouteName(filePath: string): string {
  const relativePath = relative(appDir, dirname(filePath));
  const parts = relativePath.split(/[\\\/]/).filter(p => 
    p && !p.startsWith('[') && !p.startsWith('(')
  );
  
  if (parts.length === 0) return 'api';
  
  return parts[parts.length - 1]
    .split('-')
    .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generatePlaceholder(filePath: string): string {
  const routeName = getRouteName(filePath);
  
  return `/**
 * API Route: ${routeName}
 * TODO: Implement this route
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This API route is under construction',
    route: '${routeName}'
  }, { status: 501 });
}
`;
}

function findEmptyRouteFiles(dir: string): string[] {
  const emptyFiles: string[] = [];
  
  function walk(currentDir: string) {
    try {
      const entries = readdirSync(currentDir);
      
      for (const entry of entries) {
        const fullPath = join(currentDir, entry);
        try {
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (entry === 'route.ts') {
            const content = readFileSync(fullPath, 'utf-8');
            if (content.trim().length === 0) {
              emptyFiles.push(fullPath);
            }
          }
        } catch (e) {
          // Skip files that can't be accessed
        }
      }
    } catch (e) {
      // Skip directories that can't be accessed
    }
  }
  
  walk(dir);
  return emptyFiles;
}

// Main execution
console.log('Finding empty route.ts files...');
const emptyRoutes = findEmptyRouteFiles(appDir);

console.log(`Found ${emptyRoutes.length} empty route files.`);

for (const filePath of emptyRoutes) {
  const placeholder = generatePlaceholder(filePath);
  writeFileSync(filePath, placeholder, 'utf-8');
  console.log(`✓ Fixed: ${relative(appDir, filePath)}`);
}

console.log('Done!');
