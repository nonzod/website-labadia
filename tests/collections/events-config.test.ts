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
})
