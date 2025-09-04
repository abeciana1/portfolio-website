'use server'
import { payload } from '@/src/payload'
import { type BlogPostSectionBlockProps, type ProjectTagProps } from '@/types/blockTypes'
import { type CMSMediaT } from '@/types/general'
import BlogPostCard from '@/components/_blog/BlogPostCard'

const buildQueryArgs = (
  opts: {
    postSelection: BlogPostSectionBlockProps['postSelection']
    postLimit?: number | null
    categoryFilter?: ProjectTagProps | null
  }
) => {
  const limit = opts.postLimit ?? 3
  const where: any = {
    slug: { not_equals: 'home' }
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
  meta: { image: true, description: true },
  content_html: true,
  teaserContent: true
} as const

type Media = {
  image: CMSMediaT;
  description: string;
}

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
    return (
      <section>
        {posts?.docs?.map((post, _) => {
        console.log('using category', post)
          return (
            <BlogPostCard
              key={post.title}
              title={post.title}
              slug={post.slug as string}
              publishedDate={post.publishedDate as string}
              category={post.category as ProjectTagProps}
              tags={post.tags as ProjectTagProps[]}
              meta={post.meta as Media}
              teaserContent={post?.content_html as string}
            />
          )
        })}
      </section>
    )
  } else {
    console.log('not using category', posts)
    return (
      <section>
        {posts?.map((post, _) => {
        console.log('using category', post)
          return (
            <BlogPostCard
              key={post.title}
              title={post.title}
              slug={post.slug as string}
              publishedDate={post.publishedDate as string}
              category={post.category as ProjectTagProps}
              tags={post.tags as ProjectTagProps[]}
              meta={post.meta as Media}
              teaserContent={post?.content_html as string}
            />
          )
        })}
      </section>
    )
  }
}

export default BlogPostSection