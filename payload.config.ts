import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from '@payloadcms/translations/languages/en'
import { zh } from '@payloadcms/translations/languages/zh'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Bookings } from './src/collections/Bookings'
import { Inquiries } from './src/collections/Inquiries'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Redirects } from './src/collections/Redirects'
import { Services } from './src/collections/Services'
import { Technicians } from './src/collections/Technicians'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const localDatabaseURL = 'postgresql://payload:payload@127.0.0.1:5432/oasis_spa'
const databaseURL =
  process.env.PAYLOAD_DATABASE_DISABLED === '1' ? '' : process.env.DATABASE_URL || localDatabaseURL

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-only-secret-change-me',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  sharp,
  admin: {
    user: Users.slug,
    components: {
      actions: ['/components/AdminLanguageToggle'],
      beforeDashboard: ['/components/AdminDashboardOverview'],
      beforeLogin: ['/components/AdminLanguageToggle'],
      graphics: {
        Icon: '/components/AdminBrandIcon',
        Logo: '/components/AdminBrandLogo',
      },
      providers: ['/components/AdminAuthShellProvider'],
    },
    importMap: {
      baseDir: path.resolve(dirname, './src/app/(payload)'),
      importMapFile: path.resolve(dirname, './src/app/(payload)/admin/importMap.ts'),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      zh,
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL || 'postgresql://payload-disabled.invalid/payload_disabled',
    },
  }),
  collections: [Users, Media, Pages, Services, Technicians, Bookings, Inquiries, Redirects],
  globals: [SiteSettings],
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  typescript: {
    outputFile: path.resolve(dirname, './src/payload-types.ts'),
  },
})
