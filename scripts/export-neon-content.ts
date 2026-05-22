import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config.neon'

const collections = [
  'users',
  'media',
  'navigation-menu',
  'nav-links',
  'social-links',
  'pages',
  'project-pages',
  'skills-collection',
  'skills',
  'testimonials',
  'jobs',
  'projects',
  'project-tags',
  'blog-pages',
  'blog-categories',
  'blog-tags',
  'video',
]

async function exportCollection(payload: Awaited<ReturnType<typeof getPayload>>, slug: string) {
  const docs: unknown[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const result = await payload.find({
      collection: slug as any,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
      draft: true,
    })

    docs.push(...result.docs)
    hasNextPage = result.hasNextPage
    page += 1
  }

  await fs.writeFile(
    path.join(process.cwd(), 'exports', `${slug}.json`),
    JSON.stringify(docs, null, 2),
  )

  console.log(`Exported ${docs.length} docs from ${slug}`)
}

async function main() {
  if (!process.env.DATABASE_URI) {
    throw new Error('Missing NEON_DATABASE_URL')
  }

  const payload = await getPayload({ config })

  await fs.mkdir(path.join(process.cwd(), 'exports'), { recursive: true })

  for (const collection of collections) {
    try {
      await exportCollection(payload, collection)
    } catch (error) {
      console.error(`Failed to export collection: ${collection}`)
      console.error(error)
    }
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})