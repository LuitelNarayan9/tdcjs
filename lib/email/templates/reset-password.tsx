/**
 * Email Templates - Reset Password
 * Sent when user requests a password reset
 */

import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
    name: string;
    resetUrl: string;
}

export function ResetPasswordEmailTemplate({ name, resetUrl }: ResetPasswordEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Reset your TDCJS password</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Reset Your Password</Heading>

                    <Text style={text}>Hi {name},</Text>

                    <Text style={text}>
                        We received a request to reset your password. Click the button below
                        to create a new password:
                    </Text>

                    <Section style={buttonContainer}>
                        <Button style={button} href={resetUrl}>
                            Reset Password
                        </Button>
                    </Section>

                    <Text style={text}>
                        Or copy and paste this link into your browser:
                    </Text>

                    <Text style={link}>
                        <Link href={resetUrl} style={linkStyle}>
                            {resetUrl}
                        </Link>
                    </Text>

                    <Text style={text}>
                        This link will expire in 1 hour for security reasons.
                    </Text>

                    <Hr style={hr} />

                    <Text style={warningText}>
                        ⚠️ If you didn&apos;t request a password reset, please ignore this email
                        or contact support if you have concerns about your account security.
                    </Text>

                    <Text style={footer}>
                        © {new Date().getFullYear()} TDCJS. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px 20px',
    marginBottom: '64px',
    borderRadius: '8px',
    maxWidth: '580px',
};

const heading = {
    fontSize: '24px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center' as const,
};

const text = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#374151',
};

const buttonContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
    marginBottom: '32px',
};

const button = {
    backgroundColor: '#dc2626',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
};

const link = {
    fontSize: '14px',
    color: '#6b7280',
    wordBreak: 'break-all' as const,
};

const linkStyle = {
    color: '#2563eb',
    textDecoration: 'underline',
};

const hr = {
    borderColor: '#e5e7eb',
    margin: '32px 0',
};

const warningText = {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#92400e',
    backgroundColor: '#fef3c7',
    padding: '12px 16px',
    borderRadius: '6px',
};

const footer = {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '24px',
};

export default ResetPasswordEmailTemplate;
