import type { Access, CollectionConfig } from 'payload'

export const authenticatedAccess: Access = ({ req: { user } }) => Boolean(user)

export const adminOnlyCollectionAccess: CollectionConfig['access'] = {
  create: authenticatedAccess,
  delete: authenticatedAccess,
  read: authenticatedAccess,
  update: authenticatedAccess,
}
