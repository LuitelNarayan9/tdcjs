/**
 * URL slug generation utilities
 * Converts strings to URL-friendly slugs
 */

export interface SlugifyOptions {
  /** Separator character (default: '-') */
  separator?: string;
  /** Convert to lowercase (default: true) */
  lowercase?: boolean;
  /** Maximum length (default: no limit) */
  maxLength?: number;
  /** Characters to remove (regex pattern) */
  remove?: RegExp;
  /** Preserve case for certain words */
  preserveCase?: string[];
}

/**
 * Convert a string to a URL-friendly slug
 *
 * @param text - Text to convert
 * @param options - Slugify options
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("My Blog Post 2024") // "my-blog-post-2024"
 * slugify("Café & Résumé") // "cafe-resume"
 */
export function slugify(text: string, options: SlugifyOptions = {}): string {
  const {
    separator = '-',
    lowercase = true,
    maxLength,
    remove,
  } = options;

  let slug = text
    // Normalize unicode characters
    .normalize('NFD')
    // Remove diacritical marks (accents)
    .replace(/[\u0300-\u036f]/g, '')
    // Replace special characters with their ASCII equivalents
    .replace(/[æ]/gi, 'ae')
    .replace(/[œ]/gi, 'oe')
    .replace(/[ø]/gi, 'o')
    .replace(/[ß]/gi, 'ss')
    .replace(/[ð]/gi, 'd')
    .replace(/[þ]/gi, 'th')
    // Remove any remaining non-ASCII characters
    .replace(/[^\x00-\x7F]/g, '')
    // Apply custom remove pattern if provided
    .replace(remove || /[^\w\s-]/g, '')
    // Replace whitespace and underscores with separator
    .replace(/[\s_]+/g, separator)
    // Remove multiple consecutive separators
    .replace(new RegExp(`${escapeRegex(separator)}+`, 'g'), separator)
    // Remove leading/trailing separators
    .replace(new RegExp(`^${escapeRegex(separator)}|${escapeRegex(separator)}$`, 'g'), '');

  // Convert to lowercase if specified
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Apply max length if specified
  if (maxLength && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Remove trailing separator if cut in the middle
    slug = slug.replace(new RegExp(`${escapeRegex(separator)}$`), '');
  }

  return slug;
}

/**
 * Generate a unique slug by appending a number if needed
 *
 * @param text - Text to convert
 * @param existingSlugs - Array of existing slugs to check against
 * @param options - Slugify options
 * @returns Unique slug
 *
 * @example
 * generateUniqueSlug("Hello", ["hello", "hello-1"]) // "hello-2"
 */
export function generateUniqueSlug(
  text: string,
  existingSlugs: string[],
  options: SlugifyOptions = {}
): string {
  const baseSlug = slugify(text, options);
  
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Convert a slug back to a readable title
 *
 * @param slug - Slug to convert
 * @param separator - Separator used in slug (default: '-')
 * @returns Readable title
 *
 * @example
 * unslugify("hello-world") // "Hello World"
 * unslugify("my-blog-post-2024") // "My Blog Post 2024"
 */
export function unslugify(slug: string, separator: string = '-'): string {
  return slug
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if a string is a valid slug
 *
 * @param slug - String to check
 * @returns Whether the string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  // Slug should only contain lowercase letters, numbers, and hyphens
  // Should not start or end with hyphen
  // Should not have consecutive hyphens
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

/**
 * Sanitize a slug to ensure it's valid
 *
 * @param slug - Slug to sanitize
 * @returns Sanitized slug
 */
export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
