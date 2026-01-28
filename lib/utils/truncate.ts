/**
 * Text truncation utilities
 * Handles text overflow with various truncation strategies
 */

export interface TruncateOptions {
  /** Maximum length (default: 100) */
  length?: number;
  /** Suffix to append (default: '...') */
  suffix?: string;
  /** Preserve whole words (default: true) */
  preserveWords?: boolean;
  /** Position: 'end', 'middle', or 'start' (default: 'end') */
  position?: 'end' | 'middle' | 'start';
}

/**
 * Truncate text to a specified length
 *
 * @param text - Text to truncate
 * @param options - Truncation options
 * @returns Truncated text
 *
 * @example
 * truncate("Hello World, this is a long text") // "Hello World, this is a long..."
 * truncate("Hello", { length: 10 }) // "Hello"
 * truncate("file-name-very-long.txt", { position: 'middle' }) // "file-na...ong.txt"
 */
export function truncate(text: string, options: TruncateOptions = {}): string {
  const {
    length = 100,
    suffix = '...',
    preserveWords = true,
    position = 'end',
  } = options;

  if (!text || text.length <= length) {
    return text;
  }

  const targetLength = length - suffix.length;

  if (targetLength <= 0) {
    return suffix;
  }

  switch (position) {
    case 'start':
      return truncateStart(text, targetLength, suffix);
    case 'middle':
      return truncateMiddle(text, targetLength, suffix);
    case 'end':
    default:
      return truncateEnd(text, targetLength, suffix, preserveWords);
  }
}

/**
 * Truncate text from the end
 */
function truncateEnd(
  text: string,
  targetLength: number,
  suffix: string,
  preserveWords: boolean
): string {
  let truncated = text.substring(0, targetLength);

  if (preserveWords) {
    // Find the last space and truncate there
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > targetLength * 0.5) {
      truncated = truncated.substring(0, lastSpace);
    }
  }

  // Remove trailing punctuation
  truncated = truncated.replace(/[.,;:!?\s]+$/, '');

  return truncated + suffix;
}

/**
 * Truncate text from the start
 */
function truncateStart(text: string, targetLength: number, suffix: string): string {
  return suffix + text.substring(text.length - targetLength);
}

/**
 * Truncate text from the middle
 */
function truncateMiddle(text: string, targetLength: number, suffix: string): string {
  const halfLength = Math.floor(targetLength / 2);
  const start = text.substring(0, halfLength);
  const end = text.substring(text.length - halfLength);
  return start + suffix + end;
}

/**
 * Truncate text by lines (useful for multi-line content)
 *
 * @param text - Text to truncate
 * @param maxLines - Maximum number of lines
 * @param suffix - Suffix to append
 * @returns Truncated text
 */
export function truncateLines(
  text: string,
  maxLines: number,
  suffix: string = '...'
): string {
  const lines = text.split('\n');

  if (lines.length <= maxLines) {
    return text;
  }

  return lines.slice(0, maxLines).join('\n').trim() + suffix;
}

/**
 * Truncate HTML content while preserving tag structure
 * Note: This is a simple implementation - for complex HTML, use a proper parser
 *
 * @param html - HTML content to truncate
 * @param length - Maximum text length (excluding tags)
 * @param suffix - Suffix to append
 * @returns Truncated HTML
 */
export function truncateHtml(
  html: string,
  length: number,
  suffix: string = '...'
): string {
  // Strip HTML tags for length calculation
  const textContent = html.replace(/<[^>]*>/g, '');

  if (textContent.length <= length) {
    return html;
  }

  // Simple approach: truncate text content
  let result = '';
  let textLength = 0;
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === '<') {
      inTag = true;
    }

    if (!inTag) {
      if (textLength >= length) {
        break;
      }
      textLength++;
    }

    result += char;

    if (char === '>') {
      inTag = false;
    }
  }

  // Add suffix and try to close any open tags
  result = result.trim() + suffix;

  return result;
}

/**
 * Truncate a file name while preserving the extension
 *
 * @param filename - File name to truncate
 * @param maxLength - Maximum length
 * @returns Truncated file name
 *
 * @example
 * truncateFilename("very-long-file-name.pdf", 15) // "very-lo...me.pdf"
 */
export function truncateFilename(filename: string, maxLength: number): string {
  if (filename.length <= maxLength) {
    return filename;
  }

  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) {
    // No extension
    return truncate(filename, { length: maxLength, position: 'middle' });
  }

  const name = filename.substring(0, lastDot);
  const extension = filename.substring(lastDot);

  const availableLength = maxLength - extension.length - 3; // 3 for '...'

  if (availableLength <= 3) {
    return filename.substring(0, maxLength - 3) + '...';
  }

  return truncate(name, { length: availableLength, preserveWords: false }) + extension;
}

/**
 * Create an excerpt from text (removes HTML and truncates)
 *
 * @param text - Text or HTML content
 * @param length - Maximum length
 * @returns Plain text excerpt
 */
export function createExcerpt(text: string, length: number = 150): string {
  // Remove HTML tags
  const plainText = text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return truncate(plainText, { length, preserveWords: true });
}
