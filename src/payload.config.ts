import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo';
import { titleToSlug } from '@/utils/helpers'

// * subdirectory hash


// * collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import NavigationMenu from './collections/navigation'
import NavLinks from './collections/nav-links'
import SocialLinks from './collections/social-links'
import Page from './collections/pages'
import { SkillCollection } from './collections/skills-collection'

// * blocks
import { HeroSection as HeroSectionBlock } from '@/src/blocks/HeroSection/config'
import { Skill as SkillBlock } from '@/src/blocks/Skill/config'
import { CallToAction as CallToActionBlock } from '@/src/blocks/CallToAction/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NODE_ENV === 'production' ? 'https://alexbeciana.com' : 'http://localhost:3000',
      collections: [
        'users',
        'media',
        'navigation-menu',
        'nav-links',
        'pages',
        'skills-collection',
      ],
    }
  },
  blocks: [
    HeroSectionBlock,
    SkillBlock,
    CallToActionBlock
  ],
  cors: [
    'http://localhost:3000',
    'https://alexbeciana.com'
  ],
  csrf: [
    'http://localhost:3000',
    'https://alexbeciana.com'
  ],
  collections: [
    Users,
    Media,
    NavigationMenu,
    NavLinks,
    SocialLinks,
    Page,
    SkillCollection
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: (args) => {
            const { filename } = args
            if (filename) {
              return `${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/${filename}`
            }
            return ''
          },
        }
      },
      bucket: process?.env?.BUCKET_NAME as string,
      config: {
        credentials: {
          accessKeyId: process?.env?.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process?.env?.S3_SECRET_ACCESS_KEY as string,
        },
        region: process?.env?.S3_REGION as string,
        endpoint: process?.env?.S3_ENDPOINT as string,
        forcePathStyle: true,
      }
    }),
    seoPlugin({
      collections: [
        'pages'
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Alex Beciana | ${doc.title}`,
      generateDescription: ({ doc }) => `${doc.description}`,
      generateURL: ({ doc }) => `https://alexbeciana.com/${doc.title === 'Home' ? '' : titleToSlug(doc?.title)}`,
      generateImage: ({ doc }) => doc?.featuredImage,
      tabbedUI: true
    })
  ],
})
