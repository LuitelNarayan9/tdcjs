/**
 * Email Templates - Verify Email
 * Used when a new user registers to verify their email address
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

interface VerifyEmailProps {
    name: string;
    verificationUrl: string;
}

export function VerifyEmailTemplate({ name, verificationUrl }: VerifyEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email address for TDCJS</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Welcome to TDCJS!</Heading>

                    <Text style={text}>Hi {name},</Text>

                    <Text style={text}>
                        Thank you for registering with TDCJS. Please verify your email address
                        by clicking the button below:
                    </Text>

                    <Section style={buttonContainer}>
                        <Button style={button} href={verificationUrl}>
                            Verify Email Address
                        </Button>
                    </Section>

                    <Text style={text}>
                        Or copy and paste this link into your browser:
                    </Text>

                    <Text style={link}>
                        <Link href={verificationUrl} style={linkStyle}>
                            {verificationUrl}
                        </Link>
                    </Text>

                    <Text style={text}>
                        This link will expire in 24 hours.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        If you didn&apos;t create an account with TDCJS, you can safely ignore this email.
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
    backgroundColor: '#2563eb',
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

const footer = {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
};

export default VerifyEmailTemplate;
