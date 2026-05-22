import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type ID = string | number

const collections = [
  'users',
  'media',

  'project-tags',
  'blog-categories',
  'blog-tags',

  'skills',
  'skills-collection',
  'testimonials',
  'jobs',

  'social-links',
  'nav-links',
  'video',

  'projects',
  'project-pages',
  'blog-pages',
  'pages',

  'navigation-menu',
]

const idMaps: Record<string, Map<ID, ID>> = {
  users: new Map(),
  media: new Map(),

  'project-tags': new Map(),
  'blog-categories': new Map(),
  'blog-tags': new Map(),

  skills: new Map(),
  'skills-collection': new Map(),
  testimonials: new Map(),
  jobs: new Map(),

  'social-links': new Map(),
  'nav-links': new Map(),
  video: new Map(),

  projects: new Map(),
  'project-pages': new Map(),
  'blog-pages': new Map(),
  pages: new Map(),

  'navigation-menu': new Map(),
}

function rememberID(collection: string, oldID: ID, newID: ID) {
  if (!idMaps[collection]) {
    idMaps[collection] = new Map()
  }

  idMaps[collection].set(oldID, newID)
}

function remapID(collection: string, value: any) {
  if (value == null) return value

  const map = idMaps[collection]
  if (!map) return value

  if (Array.isArray(value)) {
    return value.map((id) => {
      if (id == null) return id
      return map.get(id) ?? id
    })
  }

  return map.get(value) ?? value
}

function stripSystemFields(doc: any) {
  const {
    id,
    createdAt,
    updatedAt,
    ...data
  } = doc

  return data
}

function prepareDocForImport(slug: string, doc: any) {
  if (slug === 'users') {
    const {
      id,
      sessions,
      apiKey,
      enableAPIKey,
      updatedAt,
      createdAt,
      ...userData
    } = doc

    return {
      ...userData,
      password: process.env.PAYLOAD_IMPORT_USER_PASSWORD || 'TempPassword123!',
    }
  }

  if (slug === 'media') {
    const {
      id,
      createdAt,
      updatedAt,
      ...mediaData
    } = doc

    return mediaData
  }

  if (slug === 'skills') {
    const data = stripSystemFields(doc)

    return {
      ...data,
      skillIcon: remapID('media', doc.skillIcon),
    }
  }

  if (slug === 'skills-collection') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // Common possibilities:
      skills: remapID('skills', doc.skills),
      skill: remapID('skills', doc.skill),
      skillIcon: remapID('media', doc.skillIcon),
      icon: remapID('media', doc.icon),
    }
  }

  if (slug === 'testimonials') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // Adjust/remove these if your field names differ.
      image: remapID('media', doc.image),
      avatar: remapID('media', doc.avatar),
      headshot: remapID('media', doc.headshot),
    }
  }

  if (slug === 'jobs') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // Adjust/remove these if your field names differ.
      logo: remapID('media', doc.logo),
      companyLogo: remapID('media', doc.companyLogo),
      image: remapID('media', doc.image),
    }
  }

  if (slug === 'social-links') {
    return stripSystemFields(doc)
  }

  if (slug === 'nav-links') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // Common nav relationships.
      page: remapID('pages', doc.page),
      projectPage: remapID('project-pages', doc.projectPage),
      blogPage: remapID('blog-pages', doc.blogPage),
    }
  }

  if (slug === 'video') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // Adjust/remove these if your video collection has different fields.
      thumbnail: remapID('media', doc.thumbnail),
      image: remapID('media', doc.image),
      poster: remapID('media', doc.poster),
    }
  }

  if (slug === 'projects') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      // These capitalized fields came up in your Payload validation errors.
      Technology: remapID('skills', doc.Technology),
      Tags: remapID('project-tags', doc.Tags),

      // Common lowercase variants, harmless if undefined.
      technology: remapID('skills', doc.technology),
      tags: remapID('project-tags', doc.tags),

      // Common media fields.
      image: remapID('media', doc.image),
      featuredImage: remapID('media', doc.featuredImage),
      thumbnail: remapID('media', doc.thumbnail),
      logo: remapID('media', doc.logo),
    }
  }

  if (slug === 'project-pages') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      project: remapID('projects', doc.project),
      projects: remapID('projects', doc.projects),

      image: remapID('media', doc.image),
      featuredImage: remapID('media', doc.featuredImage),
      thumbnail: remapID('media', doc.thumbnail),

      Technology: remapID('skills', doc.Technology),
      Tags: remapID('project-tags', doc.Tags),
      technology: remapID('skills', doc.technology),
      tags: remapID('project-tags', doc.tags),
    }
  }

  if (slug === 'blog-pages') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      category: remapID('blog-categories', doc.category),
      categories: remapID('blog-categories', doc.categories),

      tag: remapID('blog-tags', doc.tag),
      tags: remapID('blog-tags', doc.tags),

      author: remapID('users', doc.author),

      image: remapID('media', doc.image),
      featuredImage: remapID('media', doc.featuredImage),
      thumbnail: remapID('media', doc.thumbnail),
      heroImage: remapID('media', doc.heroImage),
    }
  }

  if (slug === 'pages') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      image: remapID('media', doc.image),
      featuredImage: remapID('media', doc.featuredImage),
      thumbnail: remapID('media', doc.thumbnail),
      heroImage: remapID('media', doc.heroImage),

      project: remapID('projects', doc.project),
      projects: remapID('projects', doc.projects),

      blogPage: remapID('blog-pages', doc.blogPage),
      blogPages: remapID('blog-pages', doc.blogPages),

      skills: remapID('skills', doc.skills),
      testimonials: remapID('testimonials', doc.testimonials),
      jobs: remapID('jobs', doc.jobs),
    }
  }

  if (slug === 'navigation-menu') {
    const data = stripSystemFields(doc)

    return {
      ...data,

      links: remapID('nav-links', doc.links),
      navLinks: remapID('nav-links', doc.navLinks),
      socialLinks: remapID('social-links', doc.socialLinks),
    }
  }

  if (
    slug === 'project-tags' ||
    slug === 'blog-categories' ||
    slug === 'blog-tags'
  ) {
    return stripSystemFields(doc)
  }

  return stripSystemFields(doc)
}

async function importCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
) {
  const filePath = path.join(process.cwd(), 'exports', `${slug}.json`)
  const file = await fs.readFile(filePath, 'utf8')
  const docs = JSON.parse(file)

  for (const doc of docs) {
    try {
      const data = prepareDocForImport(slug, doc)

      const created =
        slug === 'media'
          ? await payload.db.create({
              collection: slug as any,
              data,
            })
          : await payload.create({
              collection: slug as any,
              data,
              overrideAccess: true,
            })

      rememberID(slug, doc.id, created.id)

      console.log(`Imported ${slug}: ${doc.id} → ${created.id}`)
    } catch (error) {
      console.error(`Failed to import ${slug}: ${doc.id}`)

      console.error('FAILED DOC:')
      console.dir(doc, { depth: 20 })

      console.error('PREPARED DOC:')
      console.dir(prepareDocForImport(slug, doc), { depth: 20 })

      console.error('ERROR DETAILS:')
      console.dir(error, { depth: 20 })
    }
  }

  console.log(`Finished ${slug}: ${docs.length} docs`)
}

async function main() {
  const payload = await getPayload({ config })

  for (const collection of collections) {
    await importCollection(payload, collection)
  }

  console.log('Import complete.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})