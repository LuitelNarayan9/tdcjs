'use client';

/**
 * Login Form Component with Clerk
 * Custom UI login form using Clerk backend
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { validateLogin } from '@/actions/auth/login';
import { loginSchema } from '@/lib/validations/auth';
import type { z } from 'zod';

type LoginFormData = z.infer<typeof loginSchema>;

interface FormErrors {
    [key: string]: string | undefined;
}

interface LoginFormProps {
    locale: string;
    callbackUrl?: string;
}

export function LoginForm({ locale, callbackUrl = '/dashboard' }: LoginFormProps) {
    const router = useRouter();
    const { signIn, setActive } = useSignIn();
    const [isPending, startTransition] = useTransition();

    // Form state
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [requiresVerification, setRequiresVerification] = useState(false);

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        setServerError(null);
        setRequiresVerification(false);
    };

    const validateForm = (): boolean => {
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: FormErrors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0] as string;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!signIn || !setActive) {
            setServerError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                // First validate against our database (check user status)
                const validation = await validateLogin(formData);

                if (!validation.success) {
                    setServerError(validation.message);
                    if (validation.requiresVerification) {
                        setRequiresVerification(true);
                    }
                    return;
                }

                // Sign in with Clerk
                const result = await signIn.create({
                    identifier: formData.email.toLowerCase(),
                    password: formData.password,
                });

                if (result.status === 'complete') {
                    await setActive({ session: result.createdSessionId });
                    router.push(`/${locale}${callbackUrl}`);
                    router.refresh();
                } else if (result.status === 'needs_first_factor') {
                    setServerError('Additional verification required.');
                } else {
                    setServerError('Login failed. Please try again.');
                }
            } catch (err) {
                console.error('Login error:', err);
                if (err instanceof Error) {
                    if (err.message.includes('Invalid') || err.message.includes('identifier') || err.message.includes('password')) {
                        setServerError('Invalid email or password');
                    } else {
                        setServerError(err.message || 'Login failed. Please try again.');
                    }
                } else {
                    setServerError('Login failed. Please try again.');
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Server Error */}
            {serverError && (
                <div className={`rounded-lg p-4 text-sm ${requiresVerification
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                    <div className="flex items-start gap-2">
                        <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {requiresVerification ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                        <div>
                            <p>{serverError}</p>
                            {requiresVerification && (
                                <Link
                                    href={`/${locale}/resend-verification`}
                                    className="mt-2 inline-block text-sm font-medium underline hover:no-underline"
                                >
                                    Resend verification email
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                    </label>
                    <Link
                        href={`/${locale}/forgot-password`}
                        className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                            } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        {showPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">
                    Remember me
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing in...
                    </span>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
}
