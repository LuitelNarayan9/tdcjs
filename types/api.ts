/**
 * API response types
 * Standardized types for API responses
 */

// ==============================================
// BASE RESPONSE TYPES
// ==============================================

/**
 * Base API response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

/**
 * Successful response
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false;
  error: ApiError;
}

/**
 * API error details
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  stack?: string;
}

/**
 * Response metadata
 */
export interface ResponseMeta {
  timestamp: string;
  requestId?: string;
  version?: string;
}

// ==============================================
// PAGINATION TYPES
// ==============================================

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  pagination: PaginationInfo;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Cursor-based pagination
 */
export interface CursorPaginatedResponse<T> extends SuccessResponse<T[]> {
  cursor: CursorInfo;
}

/**
 * Cursor info
 */
export interface CursorInfo {
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}

// ==============================================
// MUTATION RESPONSE TYPES
// ==============================================

/**
 * Create response
 */
export interface CreateResponse<T> extends SuccessResponse<T> {
  message: string;
}

/**
 * Update response
 */
export interface UpdateResponse<T> extends SuccessResponse<T> {
  message: string;
}

/**
 * Delete response
 */
export interface DeleteResponse {
  success: true;
  message: string;
  deletedId: string;
}

/**
 * Bulk operation response
 */
export interface BulkResponse {
  success: true;
  message: string;
  affected: number;
  failed?: Array<{ id: string; error: string }>;
}

// ==============================================
// ERROR CODES
// ==============================================

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_CODES;

// ==============================================
// HTTP STATUS HELPERS
// ==============================================

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

// ==============================================
// API REQUEST TYPES
// ==============================================

/**
 * Query parameters for list endpoints
 */
export interface ListQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, string | string[]>;
}

/**
 * API route handler context
 */
export interface RouteContext {
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

// ==============================================
// UTILITY TYPES
// ==============================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract data type from API response
 */
export type ExtractData<T> = T extends ApiResponse<infer D> ? D : never;

/**
 * Function to create success response
 */
export function createSuccessResponse<T>(data: T, meta?: ResponseMeta): SuccessResponse<T> {
  return {
    success: true,
    data,
    meta: meta || { timestamp: new Date().toISOString() },
  };
}

/**
 * Function to create error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, string[]>
): ErrorResponse {
  return {
    success: false,
    error: { code, message, details },
  };
}

/**
 * Function to create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  pagination: PaginationInfo,
  meta?: ResponseMeta
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    pagination,
    meta: meta || { timestamp: new Date().toISOString() },
  };
}
