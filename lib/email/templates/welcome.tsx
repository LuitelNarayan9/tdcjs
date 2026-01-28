/**
 * Email Templates - Welcome Email
 * Sent after user successfully verifies their email
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

interface WelcomeEmailProps {
    name: string;
    loginUrl: string;
}

export function WelcomeEmailTemplate({ name, loginUrl }: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to TDCJS - Your account is ready!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Welcome to TDCJS!</Heading>

                    <Text style={text}>Hi {name},</Text>

                    <Text style={text}>
                        Your email has been verified and your account is now active.
                        Welcome to the TDCJS community!
                    </Text>

                    <Text style={text}>
                        Here&apos;s what you can do now:
                    </Text>

                    <Section style={listSection}>
                        <Text style={listItem}>• Connect with family members</Text>
                        <Text style={listItem}>• Participate in community discussions</Text>
                        <Text style={listItem}>• View and contribute to the family tree</Text>
                        <Text style={listItem}>• Stay updated with community events</Text>
                    </Section>

                    <Section style={buttonContainer}>
                        <Button style={button} href={loginUrl}>
                            Start Exploring
                        </Button>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Need help? Contact us at{' '}
                        <Link href="mailto:support@tdcjs.com" style={linkStyle}>
                            support@tdcjs.com
                        </Link>
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

const listSection = {
    marginTop: '16px',
    marginBottom: '16px',
};

const listItem = {
    fontSize: '14px',
    lineHeight: '24px',
    color: '#374151',
    margin: '0',
};

const buttonContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
    marginBottom: '32px',
};

const button = {
    backgroundColor: '#16a34a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
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

export default WelcomeEmailTemplate;
