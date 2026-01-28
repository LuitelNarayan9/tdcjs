'use client';

/**
 * Reset Password Form Component with Clerk
 * Custom UI for resetting password with code
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { checkPasswordStrength, type PasswordStrength } from '@/lib/auth/password';

interface ResetPasswordFormProps {
    locale: string;
    email?: string;
}

export function ResetPasswordForm({ locale, email: initialEmail }: ResetPasswordFormProps) {
    const router = useRouter();
    const { signIn, setActive } = useSignIn();
    const [isPending, startTransition] = useTransition();

    const [step, setStep] = useState<'code' | 'password'>('code');
    const [email, setEmail] = useState(initialEmail || '');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const passwordStrength = checkPasswordStrength(password);

    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!signIn) {
            setError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                await signIn.create({
                    strategy: 'reset_password_email_code',
                    identifier: email.toLowerCase(),
                });
                setStep('password');
            } catch (err) {
                console.error('Error requesting reset code:', err);
                setError('Failed to send reset code. Please try again.');
            }
        });
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!code) {
            setError('Please enter the verification code');
            return;
        }

        if (!password) {
            setError('Please enter a new password');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!passwordStrength.isValid) {
            setError('Password does not meet requirements');
            return;
        }

        if (!signIn || !setActive) {
            setError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                const result = await signIn.attemptFirstFactor({
                    strategy: 'reset_password_email_code',
                    code,
                    password,
                });

                if (result.status === 'complete') {
                    await setActive({ session: result.createdSessionId });
                    setSuccess(true);
                    setTimeout(() => {
                        router.push(`/${locale}/dashboard`);
                    }, 1500);
                } else {
                    setError('Password reset incomplete. Please try again.');
                }
            } catch (err) {
                console.error('Error resetting password:', err);
                if (err instanceof Error) {
                    if (err.message.includes('code')) {
                        setError('Invalid verification code. Please try again.');
                    } else if (err.message.includes('password')) {
                        setError('Password does not meet requirements.');
                    } else {
                        setError(err.message || 'Failed to reset password');
                    }
                } else {
                    setError('Failed to reset password. Please try again.');
                }
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

    if (success) {
        return (
            <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    Password Reset Successful!
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Redirecting to dashboard...
                </p>
            </div>
        );
    }

    // Step 1: Request code (if no email provided)
    if (step === 'code' && !initialEmail) {
        return (
            <form onSubmit={handleRequestCode} className="space-y-5">
                {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? 'Sending...' : 'Send Reset Code'}
                </button>
            </form>
        );
    }

    // Step 2: Enter code and new password
    return (
        <form onSubmit={handleResetPassword} className="space-y-5">
            {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Verification Code */}
            <div>
                <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Verification Code
                </label>
                <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Check your email ({email || 'your email'}) for the code
                </p>
            </div>

            {/* New Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
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

                {/* Password Strength */}
                {password && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500">Password strength</span>
                            <span className={`text-xs font-medium capitalize ${passwordStrength.strength === 'weak' ? 'text-red-500' :
                                    passwordStrength.strength === 'fair' ? 'text-orange-500' :
                                        'text-green-500'
                                }`}>
                                {passwordStrength.strength.replace('-', ' ')}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div className={`h-full ${getStrengthColor(passwordStrength.strength)} ${getStrengthWidth(passwordStrength.strength)} transition-all`} />
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    required
                />
                {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending || !passwordStrength.isValid || password !== confirmPassword}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Resetting...
                    </span>
                ) : (
                    'Reset Password'
                )}
            </button>

            {/* Request new code */}
            <button
                type="button"
                onClick={() => setStep('code')}
                className="w-full text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
                Didn&apos;t receive code? Request new one
            </button>
        </form>
    );
}
