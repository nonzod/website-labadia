export type ContactLeadFormValues = {
  desiredPeriod: string
  email: string
  guestCount: string
  message: string
  name: string
  phone: string
}

export type ContactLeadFieldName = keyof ContactLeadFormValues

export type ContactLeadFormErrors = Partial<Record<ContactLeadFieldName, string>>

export type ContactLeadFormState = {
  errors: ContactLeadFormErrors
  formError: string | null
  values: Partial<ContactLeadFormValues>
}

export const emptyContactLeadFormState: ContactLeadFormState = {
  errors: {},
  formError: null,
  values: {},
}
