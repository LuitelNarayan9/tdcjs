/**
 * Script to populate empty page.tsx files with placeholder content
 * Run with: bun run scripts/fix-empty-pages.ts
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, dirname, basename } from 'path';

const appDir = join(import.meta.dirname, '../app');

function getPageName(filePath: string): string {
  // Extract a readable name from the path
  const relativePath = relative(appDir, dirname(filePath));
  const parts = relativePath.split(/[\\\/]/).filter(p => 
    p && !p.startsWith('[') && !p.startsWith('(')
  );
  
  if (parts.length === 0) return 'Page';
  
  // Get the last meaningful part and convert to title case
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') + ' Page';
}

function generatePlaceholder(filePath: string): string {
  const pageName = getPageName(filePath);
  
  return `/**
 * ${pageName}
 * TODO: Implement this page
 */

export default function ${pageName.replace(/\s+/g, '')}() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">${pageName}</h1>
      <p className="text-muted-foreground mt-2">This page is under construction.</p>
    </div>
  );
}
`;
}

function findEmptyPageFiles(dir: string): string[] {
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
          } else if (entry === 'page.tsx') {
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
console.log('Finding empty page.tsx files...');
const emptyPages = findEmptyPageFiles(appDir);

console.log(`Found ${emptyPages.length} empty page files.`);

for (const filePath of emptyPages) {
  const placeholder = generatePlaceholder(filePath);
  writeFileSync(filePath, placeholder, 'utf-8');
  console.log(`✓ Fixed: ${relative(appDir, filePath)}`);
}

console.log('Done!');
