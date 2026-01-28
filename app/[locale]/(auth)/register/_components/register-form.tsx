'use client';

/**
 * Registration Form Component with Clerk
 * Custom UI registration form using Clerk backend
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { register } from '@/actions/auth/register';
import { registerSchema } from '@/lib/validations/auth';
import { checkPasswordStrength, type PasswordStrength } from '@/lib/auth/password';
import type { z } from 'zod';

type RegisterFormData = z.infer<typeof registerSchema>;

interface FormErrors {
    [key: string]: string | undefined;
}

interface RegisterFormProps {
    locale: string;
}

export function RegisterForm({ locale }: RegisterFormProps) {
    const router = useRouter();
    const { signUp, setActive } = useSignUp();
    const [isPending, startTransition] = useTransition();

    // Form state
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: '',
        acceptTerms: true,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password strength
    const passwordStrength = checkPasswordStrength(formData.password);

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
    };

    const validateForm = (): boolean => {
        const result = registerSchema.safeParse(formData);

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

        if (!signUp) {
            setServerError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                // Create Clerk user
                await signUp.create({
                    emailAddress: formData.email.toLowerCase(),
                    password: formData.password,
                    firstName: formData.name.split(' ')[0],
                    lastName: formData.name.split(' ').slice(1).join(' ') || undefined,
                    username: formData.username?.toLowerCase() || undefined,
                });

                // Send email verification
                await signUp.prepareEmailAddressVerification({
                    strategy: 'email_code',
                });

                setPendingVerification(true);
            } catch (err) {
                console.error('Registration error:', err);
                if (err instanceof Error) {
                    if (err.message.includes('email_address')) {
                        setServerError('An account with this email already exists.');
                    } else if (err.message.includes('username')) {
                        setServerError('This username is already taken.');
                    } else {
                        setServerError(err.message || 'Registration failed. Please try again.');
                    }
                } else {
                    setServerError('Registration failed. Please try again.');
                }
            }
        });
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!signUp || !setActive) {
            setServerError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                const result = await signUp.attemptEmailAddressVerification({
                    code: verificationCode,
                });

                if (result.status === 'complete') {
                    // Create user in database via server action
                    await register(formData);

                    // Set the session active
                    await setActive({ session: result.createdSessionId });

                    setSuccess(true);
                    setTimeout(() => {
                        router.push(`/${locale}/dashboard`);
                    }, 1500);
                } else {
                    setServerError('Verification incomplete. Please try again.');
                }
            } catch (err) {
                console.error('Verification error:', err);
                setServerError('Invalid verification code. Please try again.');
            }
        });
    };

    const getStrengthColor = (strength: PasswordStrength): string => {
        switch (strength) {
            case 'weak': return 'bg-red-500';
            case 'fair': return 'bg-orange-500';
            case 'good': return 'bg-yellow-500';
            case 'strong': return 'bg-green-500';
            case 'very-strong': return 'bg-emerald-500';
            default: return 'bg-gray-300';
        }
    };

    const getStrengthWidth = (strength: PasswordStrength): string => {
        switch (strength) {
            case 'weak': return 'w-1/5';
            case 'fair': return 'w-2/5';
            case 'good': return 'w-3/5';
            case 'strong': return 'w-4/5';
            case 'very-strong': return 'w-full';
            default: return 'w-0';
        }
    };

    // Success state
    if (success) {
        return (
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
                    Registration Successful!
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Redirecting to dashboard...
                </p>
            </div>
        );
    }

    // Verification state
    if (pendingVerification) {
        return (
            <form onSubmit={handleVerification} className="space-y-5">
                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        Check Your Email
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        We sent a verification code to <strong>{formData.email}</strong>
                    </p>
                </div>

                {serverError && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                        {serverError}
                    </div>
                )}

                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Verification Code
                    </label>
                    <input
                        id="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                        maxLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending || verificationCode.length < 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying...
                        </span>
                    ) : (
                        'Verify Email'
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setPendingVerification(false)}
                    className="w-full text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                    ← Back to registration
                </button>
            </form>
        );
    }

    // Registration form
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {serverError && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                    {serverError}
                </div>
            )}

            {/* Full Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Username */}
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Username <span className="text-slate-400">(optional)</span>
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.username
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Choose a username"
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
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
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                            } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formData.password && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Password strength</span>
                            <span className={`text-xs font-medium capitalize ${passwordStrength.strength === 'weak' ? 'text-red-500' :
                                    passwordStrength.strength === 'fair' ? 'text-orange-500' :
                                        passwordStrength.strength === 'good' ? 'text-yellow-600' :
                                            'text-green-500'
                                }`}>
                                {passwordStrength.strength.replace('-', ' ')}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getStrengthColor(passwordStrength.strength)} ${getStrengthWidth(passwordStrength.strength)} transition-all duration-300`}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                            } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        {showConfirmPassword ? (
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
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start">
                <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-0.5 text-blue-600 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">
                    I agree to the{' '}
                    <Link href={`/${locale}/terms`} className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href={`/${locale}/privacy`} className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Privacy Policy
                    </Link>
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
                        Creating account...
                    </span>
                ) : (
                    'Create Account'
                )}
            </button>
        </form>
    );
}
