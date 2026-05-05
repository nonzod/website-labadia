import { describe, expect, it } from 'vitest'

import { Events } from '@/collections/Events'

describe('Events collection config', () => {
  it('uses the expected slug and admin title field', () => {
    expect(Events.slug).toBe('events')
    expect(Events.admin?.useAsTitle).toBe('title')
  })

  it('requires publication, timing, and homepage visibility fields', () => {
    const fieldNames = Events.fields.map((field) => ('name' in field ? field.name : null))

    expect(fieldNames).toEqual(
      expect.arrayContaining([
        'title',
        'summary',
        'startDate',
        'endDate',
        'venue',
        'coverImage',
        'featuredOnHome',
        'status',
      ]),
    )
  })

  it('rejects an end date earlier than the start date', () => {
    const beforeValidate = Events.hooks?.beforeValidate?.[0]

    expect(beforeValidate).toBeTypeOf('function')

    expect(() =>
      beforeValidate?.({
        data: {
          startDate: '2026-06-10T10:00:00.000Z',
          endDate: '2026-06-09T10:00:00.000Z',
        },
      } as never),
    ).toThrow('La data di fine non puo essere precedente alla data di inizio.')
  })

  it('rejects a partial update when the effective end date is earlier than the stored start date', () => {
    const beforeValidate = Events.hooks?.beforeValidate?.[0]

    expect(beforeValidate).toBeTypeOf('function')

    expect(() =>
      beforeValidate?.({
        data: {
          endDate: '2026-06-09T10:00:00.000Z',
        },
        originalDoc: {
          startDate: '2026-06-10T10:00:00.000Z',
        },
      } as never),
    ).toThrow('La data di fine non puo essere precedente alla data di inizio.')
  })

  it('allows clearing endDate explicitly while moving startDate later', () => {
    const beforeValidate = Events.hooks?.beforeValidate?.[0]

    expect(beforeValidate).toBeTypeOf('function')

    expect(() =>
      beforeValidate?.({
        data: {
          startDate: '2026-06-12T10:00:00.000Z',
          endDate: null,
        },
        originalDoc: {
          startDate: '2026-06-10T10:00:00.000Z',
          endDate: '2026-06-11T10:00:00.000Z',
        },
      } as never),
    ).not.toThrow()
  })
})
