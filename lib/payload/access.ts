import type { Access, CollectionConfig } from 'payload'

export const authenticatedAccess: Access = ({ req: { user } }) => Boolean(user)

export const publishedContentReadAccess: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}

export const adminOnlyCollectionAccess: CollectionConfig['access'] = {
  create: authenticatedAccess,
  delete: authenticatedAccess,
  read: authenticatedAccess,
  update: authenticatedAccess,
}
