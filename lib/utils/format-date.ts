/**
 * Date formatting utilities for consistent date display across the app
 * Supports Nepali locale and various format options
 */

export type DateFormatStyle = 'short' | 'medium' | 'long' | 'full' | 'relative';

/**
 * Format a date with various style options
 *
 * @param date - Date to format (Date object, string, or timestamp)
 * @param style - Format style: 'short', 'medium', 'long', 'full', or 'relative'
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date()) // "Jan 27, 2026"
 * formatDate(new Date(), 'long') // "January 27, 2026"
 * formatDate(new Date(), 'relative') // "2 hours ago"
 */
export function formatDate(
  date: Date | string | number,
  style: DateFormatStyle = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  if (style === 'relative') {
    return formatRelativeDate(dateObj);
  }

  const options: Intl.DateTimeFormatOptions = getDateFormatOptions(style);
  return dateObj.toLocaleDateString(locale, options);
}

/**
 * Format a date and time together
 *
 * @param date - Date to format
 * @param includeSeconds - Whether to include seconds
 * @param locale - Locale for formatting
 * @returns Formatted date and time string
 *
 * @example
 * formatDateTime(new Date()) // "Jan 27, 2026, 2:30 PM"
 */
export function formatDateTime(
  date: Date | string | number,
  includeSeconds: boolean = false,
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' }),
  };

  return dateObj.toLocaleString(locale, options);
}

/**
 * Format time only
 *
 * @param date - Date to extract time from
 * @param use24Hour - Whether to use 24-hour format
 * @param locale - Locale for formatting
 * @returns Formatted time string
 *
 * @example
 * formatTime(new Date()) // "2:30 PM"
 * formatTime(new Date(), true) // "14:30"
 */
export function formatTime(
  date: Date | string | number,
  use24Hour: boolean = false,
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid time';
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  };

  return dateObj.toLocaleTimeString(locale, options);
}

/**
 * Format a date as relative time (e.g., "2 hours ago", "in 3 days")
 *
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeDate(date: Date | string | number): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 0) {
    // Future date
    return formatFutureRelative(Math.abs(diffInSeconds));
  }

  return formatPastRelative(diffInSeconds);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = new Date(date);
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  const dateObj = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Get the start of a day (midnight)
 */
export function startOfDay(date: Date | string | number): Date {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
}

/**
 * Get the end of a day (23:59:59.999)
 */
export function endOfDay(date: Date | string | number): Date {
  const dateObj = new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
}

// Helper functions

function getDateFormatOptions(style: DateFormatStyle): Intl.DateTimeFormatOptions {
  switch (style) {
    case 'short':
      return { year: '2-digit', month: 'numeric', day: 'numeric' };
    case 'medium':
      return { year: 'numeric', month: 'short', day: 'numeric' };
    case 'long':
      return { year: 'numeric', month: 'long', day: 'numeric' };
    case 'full':
      return { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    default:
      return { year: 'numeric', month: 'short', day: 'numeric' };
  }
}

function formatPastRelative(seconds: number): string {
  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

function formatFutureRelative(seconds: number): string {
  if (seconds < 60) {
    return 'in a moment';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `in ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `in ${days} ${days === 1 ? 'day' : 'days'}`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `in ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `in ${months} ${months === 1 ? 'month' : 'months'}`;
  }

  const years = Math.floor(days / 365);
  return `in ${years} ${years === 1 ? 'year' : 'years'}`;
}
