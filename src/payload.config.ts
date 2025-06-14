import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type CollectionSlug } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo';
import { titleToSlug } from '@/utils/helpers'
import { postgresAdapter } from '@payloadcms/db-postgres';

// * subdirectory hash


// * collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import NavigationMenu from './collections/navigation'
import NavLinks from './collections/nav-links'
import SocialLinks from './collections/social-links'
import Page from './collections/pages'
import { SkillCollection } from './collections/skills-collection'
import { Skill } from './collections/skills'
import { Testimonial } from './collections/testimonials'
import { Job } from './collections/jobs'
import { Project } from './collections/projects'
import { ProjectTag } from './collections/project-tags'
import { ProjectPage } from './collections/project-pages'

// * blocks
import { HeroSection as HeroSectionBlock } from '@/src/blocks/HeroSection/config'
import { CallToAction as CallToActionBlock } from '@/src/blocks/CallToAction/config'
import { Image as ImageBlock } from '@/src/blocks/Image/config'
import { RichTextBlock } from '@/src/blocks/RichTextEditor/config'
import { CodeMockupSectionBlock } from '@/src/blocks/CodeMockupSection/config'
import { InViewBasic as InViewBasicBlock } from '@/src/blocks/InViewBasic/config'
import { InViewEmbedBlock } from '@/src/blocks/InViewEmbed/config'
import { JobSection as JobSectionBlock } from '@/src/blocks/JobSection/config'
import { CardBlock } from '@/src/blocks/Card/config'
import { TestimonialSectionBlock } from '@/src/blocks/TestimonialSection/config'
import { ProjectSectionBlock } from '@/src/blocks/ProjectSection/config'
import { OverviewSection } from '@/src/blocks/OverviewSection/config'
import { ProblemFramingSection } from '@/src/blocks/ProblemFramingSection/config'
import { UserResearchSectionBlock } from '@/src/blocks/UserResearchSection/config'
import { InsightsSectionBlock } from '@/src/blocks/InsightsSection/config'
import { OutcomesSectionBlock } from '@/src/blocks/OutcomesSection/config'

// * nested route mapping
type HashMap = {
  [key in CollectionSlug | string]: string
}

const nestedRouteHash: HashMap = {
  'projects' : 'projects',
  'base': ''
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: (data) => {
        const routing = data?.data?.nestedRoute === 'base' ? '/' : `/${nestedRouteHash[data?.data?.nestedRoute]}/`
        const pageUrl = data.data?.slug === 'home' ? '' : data.data?.slug
        return process.env.NODE_ENV === 'production' ? `https://alexbeciana.com${routing}${pageUrl}` : `http://localhost:3000${routing}${pageUrl}`
      },
      collections: [
        'users',
        'media',
        'navigation-menu',
        'nav-links',
        'pages',
        'skills-collection',
        'skills',
        'testimonials',
        'jobs',
        'projects',
        'project-tags',
        'project-pages'
      ],
    }
  },
  blocks: [
    HeroSectionBlock,
    CallToActionBlock,
    ImageBlock,
    RichTextBlock,
    CodeMockupSectionBlock,
    InViewBasicBlock,
    InViewEmbedBlock,
    JobSectionBlock,
    CardBlock,
    TestimonialSectionBlock,
    ProjectSectionBlock,
    OverviewSection,
    ProblemFramingSection,
    UserResearchSectionBlock,
    InsightsSectionBlock,
    OutcomesSectionBlock
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
    ProjectPage,
    SkillCollection,
    Skill,
    Testimonial,
    Job,
    Project,
    ProjectTag
  ],
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.PAYLOAD_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET as string,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NODE_ENV === 'development' ? process.env.DATABASE_URI as string : process.env.DATABASE_URI as string,
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
        'pages',
        'project-pages'
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Alex Beciana | ${doc.title}`,
      generateDescription: ({ doc }) => `${doc.description}`,
      generateURL: ({ doc }) => {
        const routing = doc.nestedRoute === 'base' ? '/' : `/${nestedRouteHash[doc?.nestedRoute]}/`
        return `https://alexbeciana.com${routing}${doc.title === 'Home' ? '' : titleToSlug(doc?.title)}`
      },
      generateImage: ({ doc }) => doc?.featuredImage,
      tabbedUI: true
    }),
    // formBuilderPlugin({
    //   fields: {
    //     text: true,
    //     textarea: true,
    //     select: true,
    //     email: true,
    //     checkbox: true,
    //     number: true,
    //     message: true,
    //     date: false,
    //   }
    // })
  ],
})
