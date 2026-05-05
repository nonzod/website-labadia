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
      name: 'usageArea',
      type: 'select',
      options: ['shared', 'home', 'dimora', 'experiences', 'territory', 'stories'],
    })

    expect(fieldsByName.get('readiness')).toMatchObject({
      name: 'readiness',
      type: 'select',
      options: ['draft', 'ready-it', 'ready-it-en'],
    })

    expect(fieldsByName.get('ownerNotes')).toMatchObject({
      name: 'ownerNotes',
      type: 'textarea',
    })
  })
})
