const readEnv = (name: string): string | undefined => {
  const value = process.env[name]?.trim()

  if (!value) {
    return undefined
  }

  return value
}

const requireEnv = (name: string): string => {
  const value = readEnv(name)

  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env and set a project-specific value.`,
    )
  }

  return value
}

export const serverEnv = {
  databaseUrl: requireEnv('DATABASE_URL'),
  payloadSecret: requireEnv('PAYLOAD_SECRET'),
  smtpHost: readEnv('SMTP_HOST'),
  smtpPort: Number(readEnv('SMTP_PORT') ?? '587'),
  smtpUser: readEnv('SMTP_USER'),
  smtpPass: readEnv('SMTP_PASS'),
  smtpFrom: readEnv('SMTP_FROM') ?? '"La Badia" <noreply@labadia.it>',
  notifyEmail: readEnv('NOTIFY_EMAIL') ?? readEnv('SMTP_FROM'),
}
