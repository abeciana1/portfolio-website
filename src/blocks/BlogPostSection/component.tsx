'use server'
import { payload } from '@/src/payload'
import {
  type BlogPostSectionBlockProps,
  type ProjectTagProps,
  type ArrowDirection,
  type CTAStyle,
  type CTALink,
} from '@/types/blockTypes'
import { type CMSMediaT, type WrapperI } from '@/types/general'
import BlogPostCard from '@/components/_blog/BlogPostCard'
import { sectionContainer } from '@/utils/helpers'
import Pill from '@/components/_styled/Pill'
import CallToAction from '@/src/blocks/CallToAction/component'
import ButtonGroup from '@/components/_styled/ButtonGroup'
import { Heading1 } from '@/components/_styled/Heading'

const buildQueryArgs = (opts: {
  postSelection: BlogPostSectionBlockProps['postSelection']
  postLimit?: number | null
  categoryFilter?: ProjectTagProps | null
}) => {
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
  meta: { image: true, description: true },
  content_html: true,
  teaserContent: true,
} as const

type Media = {
  image: CMSMediaT
  description: string
}

const gridSectionClassname = 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-fit mx-auto mt-6'

const BlogPostSection: React.FC<BlogPostSectionBlockProps> = async ({
  postSelection,
  postLimit,
  categoryFilter,
  posts,
  enableSectionContent,
  sectionGroup,
}) => {
  const usingCategory = Boolean(categoryFilter)

  if (usingCategory || postSelection !== 'custom') {
    const args = buildQueryArgs({
      postSelection,
      postLimit,
      categoryFilter: categoryFilter ?? null,
    })
    const posts = await payload.find(args)
    return (
      <SectionWrapper enableSectionContent={enableSectionContent} sectionGroup={sectionGroup}>
        <section className={gridSectionClassname}>
          {posts?.docs?.map((post, _) => {
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
      </SectionWrapper>
    )
  } else {
    return (
      <SectionWrapper enableSectionContent={enableSectionContent} sectionGroup={sectionGroup}>
        <section className={gridSectionClassname}>
          {posts?.map((post, _) => {
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
      </SectionWrapper>
    )
  }
}

export default BlogPostSection

const SectionWrapper: React.FC<
  WrapperI & Pick<BlogPostSectionBlockProps, 'enableSectionContent' | 'sectionGroup'>
> = ({ enableSectionContent, sectionGroup, children }) => {
  const { sectionId, pill, heading, description, callToAction } = sectionGroup || {}

  return (
    <>
      {enableSectionContent ? (
        <section
          data-cursor="I love sharing knowledge"
          data-cursor-variant="section"
          id={sectionId}
          className={`relative w-full ${sectionContainer}`}
        >
          <div className="relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Pill text={pill as string} />
            </div>
            <Heading1 text={heading as string} />
            <div
              data-cursor-variant="callToAction"
              data-cursor-pointer="text"
              className="text-darkGrey dark:text-pillGrey text-xl font-semibold"
            >
              {description}
            </div>
            {callToAction && callToAction?.length > 0 && (
              <ButtonGroup>
                {callToAction?.map((callToAction, index) => {
                  return (
                    <CallToAction
                      eventLocation="Blog post section header"
                      key={index}
                      style={callToAction.style as CTAStyle}
                      arrow={callToAction.arrow as boolean}
                      arrowDirection={callToAction.arrowDirection as ArrowDirection}
                      link={callToAction.link as CTALink}
                      cursorLabel={callToAction.cursorLabel as string}
                    />
                  )
                })}
              </ButtonGroup>
            )}
          </div>
          {children}
        </section>
      ) : (
        <section className={`relative w-full ${sectionContainer}`}>{children}</section>
      )}
    </>
  )
}
