/**
 * Script to populate empty error.tsx, layout.tsx files with placeholder content
 * Run with: bun run scripts/fix-empty-other.ts
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, basename } from 'path';

const appDir = join(import.meta.dirname, '../app');

function generateErrorPlaceholder(): string {
  return `'use client';

/**
 * Error Component
 * Displayed when an error occurs in this route segment
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message || 'An unexpected error occurred'}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
`;
}

function generateLayoutPlaceholder(): string {
  return `/**
 * Layout Component
 */

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
`;
}

function findEmptyFiles(dir: string, fileName: string): string[] {
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
          } else if (entry === fileName) {
            const content = readFileSync(fullPath, 'utf-8');
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

// Fix error.tsx files
console.log('Finding empty/invalid error.tsx files...');
const emptyErrors = findEmptyFiles(appDir, 'error.tsx');
console.log(`Found ${emptyErrors.length} empty/invalid error files.`);

for (const filePath of emptyErrors) {
  writeFileSync(filePath, generateErrorPlaceholder(), 'utf-8');
  console.log(`✓ Fixed error: ${relative(appDir, filePath)}`);
}

// Fix layout.tsx files (only if they don't already have content)
console.log('\\nFinding empty/invalid layout.tsx files...');
const emptyLayouts = findEmptyFiles(appDir, 'layout.tsx');
console.log(`Found ${emptyLayouts.length} empty/invalid layout files.`);

for (const filePath of emptyLayouts) {
  writeFileSync(filePath, generateLayoutPlaceholder(), 'utf-8');
  console.log(`✓ Fixed layout: ${relative(appDir, filePath)}`);
}

console.log('\\nDone!');
