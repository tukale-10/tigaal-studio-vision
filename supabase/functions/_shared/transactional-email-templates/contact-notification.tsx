import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactNotificationProps {
  name?: string
  email?: string
  organization?: string
  subject?: string
  message?: string
}

const ContactNotificationEmail = ({
  name, email, organization, subject, message,
}: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || 'visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>

        <Section style={row}>
          <Text style={label}>From</Text>
          <Text style={value}>{name || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
        </Section>
        {organization ? (
          <Section style={row}>
            <Text style={label}>Organization</Text>
            <Text style={value}>{organization}</Text>
          </Section>
        ) : null}
        <Section style={row}>
          <Text style={label}>Subject</Text>
          <Text style={value}>{subject || '—'}</Text>
        </Section>

        <Section style={messageBox}>
          <Text style={label}>Message</Text>
          <Text style={messageText}>{message || ''}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New contact: ${data?.subject || 'website enquiry'}`,
  displayName: 'Contact form notification (internal)',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    organization: 'Example Org',
    subject: 'Research collaboration',
    message: 'Hi, we would like to discuss a potential project...',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#0a1628', margin: '0 0 24px' }
const row = { margin: '0 0 12px' }
const label = { fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 2px' }
const value = { fontSize: '14px', color: '#0a1628', margin: 0 }
const messageBox = { backgroundColor: '#f5f7fa', padding: '16px', borderRadius: '4px', margin: '20px 0 0' }
const messageText = { fontSize: '14px', color: '#0a1628', lineHeight: '1.6', margin: '4px 0 0', whiteSpace: 'pre-wrap' as const }
