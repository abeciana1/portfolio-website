'use server'
import { payload } from '@/src/payload'
import { type BlogPostSectionBlockProps, type ProjectTagProps } from '@/types/blockTypes'

const buildQueryArgs = (
  opts: {
    postSelection: BlogPostSectionBlockProps['postSelection']
    postLimit?: number | null
    categoryFilter?: ProjectTagProps | null
  }
) => {
  const limit = opts.postLimit ?? 3
  const where: any = {
    slug: { not_equals: 'home' },
  }

  if (opts.postSelection === 'byCategory' && opts.categoryFilter?.id != null) {
    where.category = { equals: String(opts.categoryFilter.id) }
  }

  return {
    collection: 'blog-pages' as const,
    limit,
    sort: '-publishedDate' as const,
    where,
    select: BASE_SELECT,
  }
}

const BASE_SELECT = {
  id: true,
  title: true,
  slug: true,
  publishedDate: true,
  category: true,
  tags: true,
  meta: { image: true },
} as const

const BlogPostSection: React.FC<BlogPostSectionBlockProps> = async ({
  postSelection,
  postLimit,
  categoryFilter,
  posts
}) => {

  const usingCategory = Boolean(categoryFilter)

  if (usingCategory || postSelection !== 'custom') {
    const args = buildQueryArgs({ postSelection, postLimit, categoryFilter: categoryFilter ?? null })
    const posts = await payload.find(args)
    console.log('using category', posts)
    return (
      <section></section>
    )
  } else {
    console.log('not using category', posts)
    return (
      <section></section>
    )
  }
}

export default BlogPostSection