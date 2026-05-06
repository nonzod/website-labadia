'use client'

import { useActionState } from 'react'

import type { ContactLeadFormState } from '@/lib/contact-form'

type ContactInquiryFormCopy = {
  body: string
  eyebrow: string
  fields: {
    desiredPeriod: {
      label: string
      placeholder: string
    }
    email: {
      label: string
      placeholder: string
    }
    guestCount: {
      label: string
      placeholder: string
    }
    message: {
      label: string
      placeholder: string
    }
    name: {
      label: string
      placeholder: string
    }
    phone: {
      hint: string
      label: string
      placeholder: string
    }
  }
  pendingLabel: string
  submitLabel: string
  title: string
}

type ContactInquiryFormProps = {
  action: (state: ContactLeadFormState, formData: FormData) => Promise<ContactLeadFormState>
  copy: ContactInquiryFormCopy
}

const initialState: ContactLeadFormState = {
  errors: {},
  formError: null,
  values: {},
}

const getErrorId = (fieldName: string) => `contact-${fieldName}-error`

export function ContactInquiryForm({ action, copy }: ContactInquiryFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  return (
    <section className="contact-form-card" aria-labelledby="contact-form-title">
      <p className="section-eyebrow">{copy.eyebrow}</p>
      <h2 id="contact-form-title">{copy.title}</h2>
      <p className="contact-form-body">{copy.body}</p>

      {state.formError ? (
        <div className="contact-form-alert" role="alert">
          {state.formError}
        </div>
      ) : null}

      <form action={formAction} className="contact-form" noValidate>
        <label className="contact-field">
          <span>{copy.fields.name.label}</span>
          <input
            aria-describedby={state.errors.name ? getErrorId('name') : undefined}
            aria-invalid={state.errors.name ? true : undefined}
            defaultValue={state.values.name ?? ''}
            name="name"
            placeholder={copy.fields.name.placeholder}
            required
            type="text"
          />
          {state.errors.name ? (
            <p className="field-error" id={getErrorId('name')} role="alert">
              {state.errors.name}
            </p>
          ) : null}
        </label>

        <label className="contact-field">
          <span>{copy.fields.email.label}</span>
          <input
            aria-describedby={state.errors.email ? getErrorId('email') : undefined}
            aria-invalid={state.errors.email ? true : undefined}
            defaultValue={state.values.email ?? ''}
            name="email"
            placeholder={copy.fields.email.placeholder}
            required
            type="email"
          />
          {state.errors.email ? (
            <p className="field-error" id={getErrorId('email')} role="alert">
              {state.errors.email}
            </p>
          ) : null}
        </label>

        <label className="contact-field">
          <span>{copy.fields.phone.label}</span>
          <input
            defaultValue={state.values.phone ?? ''}
            name="phone"
            placeholder={copy.fields.phone.placeholder}
            type="tel"
          />
          <small>{copy.fields.phone.hint}</small>
        </label>

        <label className="contact-field">
          <span>{copy.fields.desiredPeriod.label}</span>
          <input
            aria-describedby={state.errors.desiredPeriod ? getErrorId('desiredPeriod') : undefined}
            aria-invalid={state.errors.desiredPeriod ? true : undefined}
            defaultValue={state.values.desiredPeriod ?? ''}
            name="desiredPeriod"
            placeholder={copy.fields.desiredPeriod.placeholder}
            required
            type="text"
          />
          {state.errors.desiredPeriod ? (
            <p className="field-error" id={getErrorId('desiredPeriod')} role="alert">
              {state.errors.desiredPeriod}
            </p>
          ) : null}
        </label>

        <label className="contact-field">
          <span>{copy.fields.guestCount.label}</span>
          <input
            aria-describedby={state.errors.guestCount ? getErrorId('guestCount') : undefined}
            aria-invalid={state.errors.guestCount ? true : undefined}
            defaultValue={state.values.guestCount ?? ''}
            inputMode="numeric"
            min={1}
            name="guestCount"
            placeholder={copy.fields.guestCount.placeholder}
            required
            type="number"
          />
          {state.errors.guestCount ? (
            <p className="field-error" id={getErrorId('guestCount')} role="alert">
              {state.errors.guestCount}
            </p>
          ) : null}
        </label>

        <label className="contact-field contact-field-full">
          <span>{copy.fields.message.label}</span>
          <textarea
            aria-describedby={state.errors.message ? getErrorId('message') : undefined}
            aria-invalid={state.errors.message ? true : undefined}
            defaultValue={state.values.message ?? ''}
            name="message"
            placeholder={copy.fields.message.placeholder}
            required
            rows={6}
          />
          {state.errors.message ? (
            <p className="field-error" id={getErrorId('message')} role="alert">
              {state.errors.message}
            </p>
          ) : null}
        </label>

        <button className="primary-link contact-submit" disabled={isPending} type="submit">
          {isPending ? copy.pendingLabel : copy.submitLabel}
        </button>
      </form>
    </section>
  )
}
