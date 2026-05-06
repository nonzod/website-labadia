'use server'

import { redirect } from 'next/navigation'

import type { ContactLeadFormState } from '@/lib/contact-form'
import type { AppLocale } from '@/lib/i18n'
import { submitContactLead } from '@/lib/contact-leads'

export const submitContactLeadAction = async (
  locale: AppLocale,
  _previousState: ContactLeadFormState,
  formData: FormData,
): Promise<ContactLeadFormState> => {
  const result = await submitContactLead(locale, formData)

  if (!result.ok) {
    return result.state
  }

  redirect(result.redirectPath)
}
