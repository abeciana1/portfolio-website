import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === 'production' ? ".env.production" : ".env.development.local" });
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
import { BlogPage } from './collections/blog-pages'
import { BlogCategory } from './collections/blog-categories'
import { BlogTag } from './collections/blog-tags'
import { Video } from './collections/video'

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
import { BlogImage as BlogImageBlock } from '@/src/blocks/BlogImage/config'
import { BlogHeader as BlogHeaderBlock } from '@/src/blocks/BlogHeader/config'
import { BlogBody as BlogBodyBlock } from '@/src/blocks/BlogBody/config'
import { BlogPostSectionBlock } from '@/src/blocks/BlogPostSection/config'
import { CodeBlock } from '@/src/blocks/Code/config'
import { Video as VideoBlock } from '@/src/blocks/Video/config'

// * nested route mapping
type HashMap = {
  [key in CollectionSlug | string]: string
}

export const nestedRouteHash: HashMap = {
  'blog': 'blog',
  'projects' : 'projects',
  'base': ''
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const shouldPush = process.env.PAYLOAD_DB_PUSH === 'true';

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
        'project-pages',
        'blog-pages',
        'blog-categories',
        'blog-tags',
        'video'
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
    OutcomesSectionBlock,
    BlogImageBlock,
    BlogHeaderBlock,
    BlogBodyBlock,
    BlogPostSectionBlock,
    CodeBlock,
    VideoBlock
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
    ProjectTag,
    BlogPage,
    BlogCategory,
    BlogTag,
    Video
  ],
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL as string,
  secret: process.env.NEXT_PUBLIC_PAYLOAD_SECRET as string || process.env.PAYLOAD_SECRET as string,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI! as string,
    },
    push: shouldPush,
    migrationDir: 'src/migrations'
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
    s3Storage({
      clientUploads: true,
      collections: {
        video: {
          disableLocalStorage: true,
          generateFileURL: (args) => {
            const { filename } = args
            if (filename) {
              return `https://videos.alexbeciana.com/${encodeURI(filename)}`
            }
            return ''
          },
        }
      },
      bucket: process?.env?.CLOUDFLARE_VIDEO_BUCKET_NAME as string,
      config: {
        credentials: {
          accessKeyId: process?.env?.CLOUDFLARE_VIDEO_ACCESS_KEY_ID as string,
          secretAccessKey: process?.env?.CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY as string
        },
        region: 'auto',
        endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
        forcePathStyle: true,
      }
    }),
    seoPlugin({
      collections: [
        'pages',
        'project-pages',
        'blog-pages'
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Alex Beciana | ${doc.title}`,
      generateDescription: ({ doc }) => `${doc.description}`,
      generateURL: ({ doc }) => {
        const routing = doc.nestedRoute === 'base' ? '/' : `/${nestedRouteHash[doc?.nestedRoute]}/`
        return `https://alexbeciana.com${routing}${doc.title === 'Home' ? '' : titleToSlug(doc?.title)}`
      },
      generateImage: ({ doc }) => doc.featuredImage,
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
