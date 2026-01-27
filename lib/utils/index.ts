/**
 * Utility functions barrel export
 * Import all utilities from this single file
 *
 * @example
 * import { cn, formatDate, slugify, truncate, sanitizeHtml } from '@/lib/utils';
 */

// Class name utilities
export { cn } from './cn';

// Date formatting
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeDate,
  isToday,
  isYesterday,
  startOfDay,
  endOfDay,
  type DateFormatStyle,
} from './format-date';

// Currency formatting
export {
  formatCurrency,
  getCurrencySymbol,
  parseCurrency,
  formatNumber,
  formatPercentage,
  type CurrencyCode,
  type FormatCurrencyOptions,
} from './format-currency';

// Slug utilities
export {
  slugify,
  generateUniqueSlug,
  unslugify,
  isValidSlug,
  sanitizeSlug,
  type SlugifyOptions,
} from './slugify';

// Text truncation
export {
  truncate,
  truncateLines,
  truncateHtml,
  truncateFilename,
  createExcerpt,
  type TruncateOptions,
} from './truncate';

// HTML sanitization
export {
  sanitizeHtml,
  sanitizeText,
  sanitizeRichText,
  sanitizeUrl,
  escapeHtml,
  unescapeHtml,
  stripHtml,
  sanitizeInput,
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  type SanitizeOptions,
} from './sanitize';

// Constants
export * from './constants';
