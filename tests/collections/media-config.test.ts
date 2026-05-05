import { describe, expect, it } from 'vitest'

import { Media } from '@/collections/Media'

describe('Media collection config', () => {
  it('uses the expected slug and admin title field', () => {
    expect(Media.slug).toBe('media')
    expect(Media.admin?.useAsTitle).toBe('alt')
  })

  it('includes governance metadata fields with the expected configuration', () => {
    const fieldsByName = new Map(
      Media.fields
        .filter((field): field is (typeof Media.fields)[number] & { name: string } => 'name' in field)
        .map((field) => [field.name, field]),
    )

    expect(fieldsByName.get('credit')).toMatchObject({
      name: 'credit',
      type: 'text',
    })

    expect(fieldsByName.get('usageArea')).toMatchObject({
      defaultValue: 'shared',
      name: 'usageArea',
      required: true,
      type: 'select',
      options: [
        { label: 'Shared', value: 'shared' },
        { label: 'Home', value: 'home' },
        { label: 'Dimora', value: 'dimora' },
        { label: 'Esperienze', value: 'experiences' },
        { label: 'Territorio', value: 'territory' },
        { label: 'Racconti / Blog', value: 'stories' },
      ],
    })

    expect(fieldsByName.get('readiness')).toMatchObject({
      defaultValue: 'draft',
      name: 'readiness',
      required: true,
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Ready IT', value: 'ready-it' },
        { label: 'Ready IT/EN', value: 'ready-it-en' },
      ],
    })

    expect(fieldsByName.get('ownerNotes')).toMatchObject({
      name: 'ownerNotes',
      type: 'textarea',
    })
  })
})
