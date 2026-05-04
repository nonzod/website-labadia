import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { serverEnv } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Leads],
  db: sqliteAdapter({
    client: {
      url: serverEnv.databaseUrl,
    },
    push: true,
  }),
  localization: {
    defaultLocale: 'it',
    fallback: true,
    locales: [
      {
        code: 'it',
        label: 'Italiano',
      },
      {
        code: 'en',
        fallbackLocale: 'it',
        label: 'English',
      },
    ],
  },
  secret: serverEnv.payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
