import nodemailer from 'nodemailer'

import { serverEnv } from '@/lib/env'
import type { AppLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'

interface ContactLeadInfo {
  name: string
  email: string
  phone: string | null
  guestCount: number
  desiredPeriod: string
  message: string
  lang: AppLocale
}

const getTransporter = (): nodemailer.Transporter => {
  const host = serverEnv.smtpHost
  const port = serverEnv.smtpPort
  const user = serverEnv.smtpUser
  const pass = serverEnv.smtpPass

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER, and SMTP_PASS must be set')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const buildEmailHtml = (lead: ContactLeadInfo, locale: AppLocale): string => {
  const t = publicContent[locale].contact.email
  const phoneLine = lead.phone
    ? `<tr><td><strong>${t.phone}</strong></td><td>${lead.phone}</td></tr>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${t.subject}</title></head>
<body style="font-family:sans-serif;line-height:1.6;color:#333;padding:2rem">
<h2 style="color:#5b3e2b">${t.subject}</h2>
<table style="width:100%;border-collapse:collapse">
<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">${t.name}</td><td style="padding:8px;border-bottom:1px solid #ddd">${lead.name}</td></tr>
<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">${t.email}</td><td style="padding:8px;border-bottom:1px solid #ddd"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
${phoneLine}
<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">${t.guests}</td><td style="padding:8px;border-bottom:1px solid #ddd">${lead.guestCount}</td></tr>
<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">${t.period}</td><td style="padding:8px;border-bottom:1px solid #ddd">${lead.desiredPeriod}</td></tr>
<tr><td style="padding:8px;font-weight:bold;border:none">${t.message}</td><td style="padding:8px;border:none">${lead.message}</td></tr>
</table>
<p style="margin-top:2rem;font-size:12px;color:#888">${t.footer}</p>
</body>
</html>`.trim()
}

const buildEmailText = (lead: ContactLeadInfo, locale: AppLocale): string => {
  const t = publicContent[locale].contact.email
  const phoneLine = lead.phone ? `${t.phone} ${lead.phone}` : ''

  return [
    `${t.subject}`,
    '---',
    `${t.name} ${lead.name}`,
    `${t.email} ${lead.email}`,
    phoneLine,
    `${t.guests} ${lead.guestCount}`,
    `${t.period} ${lead.desiredPeriod}`,
    '',
    `${t.message}`,
    lead.message,
    '',
    t.footer,
  ]
    .filter(Boolean)
    .join('\n')
}

export const sendContactNotification = async (
  lead: ContactLeadInfo,
): Promise<void> => {
  const from = serverEnv.smtpFrom
  const notifyEmail = serverEnv.notifyEmail
  const locale = lead.lang

  const t = publicContent[locale].contact.email

  try {
    const transporter = getTransporter()

    await transporter.sendMail({
      from,
      to: notifyEmail,
      subject: t.subject,
      text: buildEmailText(lead, locale),
      html: buildEmailHtml(lead, locale),
    })

    console.log('[email] notification sent to', notifyEmail)
  } catch (error) {
    console.error('[email] failed to send notification:', error)
  }
}