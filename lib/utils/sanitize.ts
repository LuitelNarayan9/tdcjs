/**
 * HTML sanitization utilities using DOMPurify
 * Prevents XSS attacks when rendering user-generated content
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Allowed HTML tags for different content contexts
 */
export const ALLOWED_TAGS = {
  /** Basic formatting only */
  basic: ['b', 'i', 'em', 'strong', 'u', 's', 'br'] as string[],

  /** Standard rich text */
  richText: [
    'p', 'br', 'b', 'i', 'em', 'strong', 'u', 's', 'strike',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'hr', 'span', 'div',
  ] as string[],
} as const;

/**
 * Allowed attributes for different contexts
 */
export const ALLOWED_ATTR = {
  basic: [] as string[],
  richText: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'] as string[],
} as const;

export interface SanitizeOptions {
  /** Allowed HTML tags */
  allowedTags?: string[];
  /** Allowed attributes */
  allowedAttributes?: string[];
  /** Allow data: URIs for images */
  allowDataUri?: boolean;
}

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param dirty - Untrusted HTML content
 * @param options - Sanitization options
 * @returns Sanitized HTML
 *
 * @example
 * sanitizeHtml('<script>alert("xss")</script><p>Hello</p>') // "<p>Hello</p>"
 * sanitizeHtml('<a href="javascript:alert(1)">Click</a>') // "<a>Click</a>"
 */
export function sanitizeHtml(dirty: string, options: SanitizeOptions = {}): string {
  const {
    allowedTags = ALLOWED_TAGS.richText,
    allowedAttributes = ALLOWED_ATTR.richText,
    allowDataUri = false,
  } = options;

  const config: Record<string, unknown> = {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    ALLOW_DATA_ATTR: false,
  };

  // Handle data URIs
  if (!allowDataUri) {
    config.FORBID_ATTR = [];
  }

  return DOMPurify.sanitize(dirty, config) as string;
}

/**
 * Sanitize content for basic text (strips all HTML)
 *
 * @param dirty - Untrusted content
 * @returns Plain text
 */
export function sanitizeText(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }) as string;
}

/**
 * Sanitize content for rich text editing (Markdown-like output)
 *
 * @param dirty - Untrusted HTML
 * @returns Sanitized HTML with rich text support
 */
export function sanitizeRichText(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS.richText,
    allowedAttributes: ALLOWED_ATTR.richText,
  });
}

/**
 * Sanitize URLs to prevent javascript: and data: exploits
 *
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim().toLowerCase();

  // Check for dangerous protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return '';
  }

  // Allow relative URLs, http, https, mailto, and tel
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', '//', '/'];
  const hasAllowedProtocol = allowedProtocols.some(
    (protocol) => trimmed.startsWith(protocol) || !trimmed.includes(':')
  );

  if (!hasAllowedProtocol) {
    return '';
  }

  return url;
}

/**
 * Escape HTML entities (for displaying HTML as text)
 *
 * @param text - Text to escape
 * @returns Escaped text
 *
 * @example
 * escapeHtml('<script>') // "&lt;script&gt;"
 */
export function escapeHtml(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
}

/**
 * Unescape HTML entities
 *
 * @param text - Text to unescape
 * @returns Unescaped text
 */
export function unescapeHtml(text: string): string {
  const unescapeMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
  };

  return text.replace(
    /&(?:amp|lt|gt|quot|#039|#x27|#x2F);/g,
    (entity) => unescapeMap[entity] || entity
  );
}

/**
 * Strip all HTML tags from content
 *
 * @param html - HTML content
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] }) as string;
}

/**
 * Sanitize user input for use in SQL or other sensitive contexts
 * Note: Always use parameterized queries - this is just an extra layer
 *
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>'"]/g, '') // Remove potential HTML/SQL characters
    .trim();
}
