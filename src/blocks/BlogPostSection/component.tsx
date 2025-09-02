import { payload } from '@/src/payload'
import { type BlogPostSectionBlockProps } from '@/types/blockTypes'

const BlogPostSection: React.FC<BlogPostSectionBlockProps> = async ({
  postSelection,
  postLimit,
  categoryFilter,
  posts
}) => {
  switch (postSelection) {
    case "latest":
      const latestBlogPosts = await payload.find({
        collection: 'blog-pages',
        limit: postLimit ?? 3,
        sort: '-publishedDate',
        where: {
          slug: {
            not_equals: 'home'
          }
        },
        select: {
          title: true,
          slug: true,
          publishedDate: true,
          category: true,
          tags: true,
          meta: {
            image: true
          }
        }
      })
      console.log('latest blogPosts', latestBlogPosts)
      return (
        <section></section>
      )
    case "byCategory":
      const categoryBlogPosts = await payload.find({
        collection: 'blog-pages',
        limit: postLimit ?? 3,
        where: {
          category: {
            equals: categoryFilter,
          },
          slug: {
            not_equals: 'home'
          }
        },
        sort: '-publishedDate',
        select: {
          title: true,
          slug: true,
          publishedDate: true,
          category: true,
          tags: true,
          meta: {
            image: true
          }
        }
      })
      console.log('category blogPosts', categoryBlogPosts)
      return (
        <section></section>
      )
    case "all":
      const allBlogPosts = await payload.find({
        collection: 'blog-pages',
        limit: postLimit ?? 3,
        sort: '-publishedDate',
        where: {
          slug: {
            not_equals: 'home'
          }
        },
        select: {
          title: true,
          slug: true,
          publishedDate: true,
          category: true,
          tags: true,
          meta: {
            image: true
          }
        }
      })
      console.log('all blogPosts', allBlogPosts)
      return (
        <section></section>
      )
    case "custom":
      return (
        <section></section>
    )
    default:
      return (
        <section></section>
      )
  }
}

export default BlogPostSection