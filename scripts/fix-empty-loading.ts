/**
 * Script to populate empty loading.tsx files with placeholder content
 * Run with: bun run scripts/fix-empty-loading.ts
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, dirname } from 'path';

const appDir = join(import.meta.dirname, '../app');

function generatePlaceholder(): string {
  return `/**
 * Loading Component
 * Displayed while page content is loading
 */

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
`;
}

function findEmptyLoadingFiles(dir: string): string[] {
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
          } else if (entry === 'loading.tsx') {
            const content = readFileSync(fullPath, 'utf-8');
            // Check if file is empty or doesn't have a proper export default
            if (content.trim().length === 0 || !content.includes('export default')) {
              emptyFiles.push(fullPath);
            }
          }
        } catch {
          // Skip files that can't be accessed
        }
      }
    } catch {
      // Skip directories that can't be accessed
    }
  }
  
  walk(dir);
  return emptyFiles;
}

// Main execution
console.log('Finding empty/invalid loading.tsx files...');
const emptyLoadings = findEmptyLoadingFiles(appDir);

console.log(`Found ${emptyLoadings.length} empty/invalid loading files.`);

for (const filePath of emptyLoadings) {
  const placeholder = generatePlaceholder();
  writeFileSync(filePath, placeholder, 'utf-8');
  console.log(`✓ Fixed: ${relative(appDir, filePath)}`);
}

console.log('Done!');
