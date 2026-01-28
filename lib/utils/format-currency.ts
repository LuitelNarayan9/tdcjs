/**
 * Currency formatting utilities
 * Supports NPR (Nepali Rupee) and other currencies
 */

export type CurrencyCode = 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR';

export interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  locale?: string;
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compact?: boolean;
}

/**
 * Format a number as currency
 *
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1000) // "रू 1,000.00"
 * formatCurrency(1000, { currency: 'USD' }) // "$1,000.00"
 * formatCurrency(1500000, { compact: true }) // "रू 15L"
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    currency = 'NPR',
    locale = currency === 'NPR' ? 'ne-NP' : 'en-US',
    showSymbol = true,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    compact = false,
  } = options;

  if (compact) {
    return formatCompactCurrency(amount, currency, showSymbol);
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(amount);
}

/**
 * Format currency in compact notation (e.g., 1.5M, 10K, 15L)
 */
function formatCompactCurrency(
  amount: number,
  currency: CurrencyCode,
  showSymbol: boolean
): string {
  const symbol = getCurrencySymbol(currency);
  const prefix = showSymbol ? `${symbol} ` : '';

  // Use Nepali numbering system for NPR and INR
  if (currency === 'NPR' || currency === 'INR') {
    return prefix + formatIndianNotation(amount);
  }

  // Use Western numbering for others
  return prefix + formatWesternNotation(amount);
}

/**
 * Format using Indian/Nepali numbering system (Lakhs, Crores)
 */
function formatIndianNotation(amount: number): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount >= 10000000) {
    // Crores (1 Cr = 10,000,000)
    return sign + (absAmount / 10000000).toFixed(2).replace(/\.?0+$/, '') + 'Cr';
  }
  if (absAmount >= 100000) {
    // Lakhs (1 L = 100,000)
    return sign + (absAmount / 100000).toFixed(2).replace(/\.?0+$/, '') + 'L';
  }
  if (absAmount >= 1000) {
    // Thousands
    return sign + (absAmount / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
  }

  return sign + absAmount.toString();
}

/**
 * Format using Western numbering system (K, M, B)
 */
function formatWesternNotation(amount: number): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount >= 1000000000) {
    return sign + (absAmount / 1000000000).toFixed(2).replace(/\.?0+$/, '') + 'B';
  }
  if (absAmount >= 1000000) {
    return sign + (absAmount / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  }
  if (absAmount >= 1000) {
    return sign + (absAmount / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
  }

  return sign + absAmount.toString();
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  const symbols: Record<CurrencyCode, string> = {
    NPR: 'रू',
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
  };
  return symbols[currency] || currency;
}

/**
 * Parse a currency string to a number
 *
 * @param value - Currency string to parse
 * @returns Parsed number or NaN if invalid
 *
 * @example
 * parseCurrency("$1,234.56") // 1234.56
 * parseCurrency("रू 1,000.00") // 1000
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols and whitespace
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned);
}

/**
 * Format a number with thousand separators
 *
 * @param num - Number to format
 * @param locale - Locale for formatting
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a percentage
 *
 * @param value - Value to format (0.5 = 50%)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
