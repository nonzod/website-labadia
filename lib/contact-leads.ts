import type { AppLocale } from '@/lib/i18n'
import type {
  ContactLeadFormErrors,
  ContactLeadFormState,
  ContactLeadFormValues,
} from '@/lib/contact-form'
import { getPayloadClient } from '@/lib/payload'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { sendContactNotification } from '@/lib/email'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
const minimumMessageLength = 12

type SubmitContactLeadResult =
  | {
      ok: true
      redirectPath: string
    }
  | {
      ok: false
      state: ContactLeadFormState
    }

const getString = (formData: FormData, key: keyof ContactLeadFormValues): string => {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const normalizeContactLeadValues = (formData: FormData): ContactLeadFormValues => {
  return {
    desiredPeriod: getString(formData, 'desiredPeriod'),
    email: getString(formData, 'email'),
    guestCount: getString(formData, 'guestCount'),
    message: getString(formData, 'message'),
    name: getString(formData, 'name'),
    phone: getString(formData, 'phone'),
  }
}

const validateContactLeadValues = (
  locale: AppLocale,
  values: ContactLeadFormValues,
): ContactLeadFormErrors => {
  const messages = publicContent[locale].contact.form.errors
  const errors: ContactLeadFormErrors = {}
  const guestCount = Number.parseInt(values.guestCount, 10)

  if (values.name.length < 2) {
    errors.name = messages.name
  }

  if (!emailPattern.test(values.email)) {
    errors.email = messages.email
  }

  if (values.desiredPeriod.length < 3) {
    errors.desiredPeriod = messages.desiredPeriod
  }

  if (!Number.isInteger(guestCount) || guestCount <= 0) {
    errors.guestCount = messages.guestCount
  }

  if (values.message.length < minimumMessageLength) {
    errors.message = messages.message
  }

  return errors
}

const buildContactLeadState = (
  locale: AppLocale,
  values: ContactLeadFormValues,
  errors: ContactLeadFormErrors,
): ContactLeadFormState => {
  return {
    errors,
    formError:
      Object.keys(errors).length > 0 ? publicContent[locale].contact.form.errors.summary : null,
    values,
  }
}

const buildContactLeadCreateData = (locale: AppLocale, values: ContactLeadFormValues) => {
  return {
    desiredPeriod: values.desiredPeriod,
    email: values.email,
    guestCount: Number.parseInt(values.guestCount, 10),
    lang: locale,
    message: values.message,
    name: values.name,
    phone: values.phone || null,
    sourcePage: getPublicHref('contact', locale),
    status: 'new' as const,
  }
}

export const submitContactLead = async (
  locale: AppLocale,
  formData: FormData,
): Promise<SubmitContactLeadResult> => {
  const values = normalizeContactLeadValues(formData)
  const errors = validateContactLeadValues(locale, values)

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      state: buildContactLeadState(locale, values, errors),
    }
  }

  const payload = await getPayloadClient()

  await payload.create({
    collection: 'leads',
    data: buildContactLeadCreateData(locale, values),
  })

  // Fire-and-forget: email notification sent asynchronously after lead is saved.
  // If email fails, the lead is already persisted — no data loss.
  sendContactNotification({
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    guestCount: Number.parseInt(values.guestCount, 10),
    desiredPeriod: values.desiredPeriod,
    message: values.message,
    lang: locale,
  }).catch((error) => {
    console.error('[contact-leads] email notification failed:', error)
  })

  return {
    ok: true,
    redirectPath: getPublicHref('contactConfirmation', locale),
  }
}
