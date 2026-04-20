import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Tigaal'

interface ContactConfirmationProps {
  name?: string
  subject?: string
}

const ContactConfirmationEmail = ({ name, subject }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your message was received — someone from {SITE_NAME} will reach out</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thank you, ${name}!` : 'Thank you for reaching out!'}
        </Heading>
        <Text style={text}>
          Your message was received. Someone from our {SITE_NAME} team will reach out to you shortly.
        </Text>
        {subject ? (
          <Section style={summary}>
            <Text style={summaryLabel}>Subject</Text>
            <Text style={summaryValue}>{subject}</Text>
          </Section>
        ) : null}
        <Text style={text}>
          In the meantime, feel free to explore our work and services at{' '}
          <a href="https://tigaal.com" style={link}>tigaal.com</a>.
        </Text>
        <Text style={footer}>Warm regards,<br />The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We received your message — Tigaal',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane Doe', subject: 'Research collaboration' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0a1628', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#3d4759', lineHeight: '1.6', margin: '0 0 18px' }
const summary = { backgroundColor: '#f5f7fa', padding: '14px 16px', borderRadius: '4px', margin: '20px 0' }
const summaryLabel = { fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 4px' }
const summaryValue = { fontSize: '14px', color: '#0a1628', fontWeight: 500, margin: 0 }
const link = { color: '#c9a961', textDecoration: 'underline' }
const footer = { fontSize: '13px', color: '#6b7280', margin: '32px 0 0' }
