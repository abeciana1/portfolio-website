import { type BlogPostCardProps } from '@/types/blockTypes'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import ProjectTag from '@/components/_projects/ProjectTag'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import { ScrollArea } from '@/components/_core/ScrollArea'
import CallToAction from '@/src/blocks/CallToAction/component'

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  slug,
  publishedDate,
  category,
  tags,
  meta,
  teaserContent,
}) => {
  const { image, description } = meta

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger
        testId="blog-post"
        cursorVariant="blogCard"
        cursorLabel={`Read <i>${title}</i>`}
        className="relative pb-3 rounded-2xl max-w-[600px] bg-[#fbf2e4] border-2 border-darkGrey dark:border-pillGrey"
      >
        <div className="relative z-50 opacity-100 space-y-3">
          <div className="relative bg-[#FFFBF5] rounded-t-[0.9rem]">
            <ul data-testid="blog-category" className="absolute top-3 right-3">
              <ProjectTag label={category?.label} addBorder />
            </ul>
            <ul data-testid="blog-author" className="absolute bottom-3 left-3">
              <ProjectTag label="By Alex Beciana" addBorder />
            </ul>
            <ul data-testid="blog-date" className="absolute bottom-3 right-3">
              <ProjectTag label={`${format(new Date(publishedDate), 'MMM dd yyyy')}`} addBorder />
            </ul>
            <Image
              data-testid="blog-image"
              src={image?.url}
              alt={image?.alt}
              height={246}
              width={600}
              className="w-full mx-auto h-auto rounded-t-[0.9rem] p-3 sm:p-0"
            />
          </div>
          <div className="flex flex-col px-3 space-y-3">
            <div
              tabIndex={0}
              data-testid="blog-title"
              className="text-left font-medium text-xl text-foreground"
            >
              {title}
            </div>
            <div
              data-testid="blog-excerpt"
              className="text-left font-medium text-lg text-foreground"
            >
              {description.substring(0, 55) + '...'}
            </div>
            <ul tabIndex={0} data-testid="tags-list" className="flex gap-2">
              {tags?.slice(0, 4)?.map((tag) => {
                return <ProjectTag key={tag?.id} label={tag?.label} inversePill />
              })}
              {tags?.length > 4 && <ProjectTag label="..." inversePill />}
            </ul>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative border-2 border-darkGrey dark:border-pillGrey bg-background dark:bg-foreground rounded-lg max-w-[600px]">
          <div className="relative bg-[#FFFBF5]">
            <ul className="absolute top-3 left-3">
              <ProjectTag label={category?.label} addBorder />
            </ul>
            <ul className="absolute bottom-3 left-3">
              <ProjectTag label="By Alex Beciana" addBorder />
            </ul>
            <ul className="absolute bottom-3 right-3">
              <ProjectTag label={`${format(new Date(publishedDate), 'MMM dd yyyy')}`} addBorder />
            </ul>
            <MorphingDialogImage
              src={image?.url}
              width={600}
              height={246}
              alt={`Blog post title - ${title}`} // TODO - add alt text
              className="w-full p-3 sm:p-0 object-cover object-top rounded-t-md border-b-2 border-darkGrey"
            />
          </div>
          <section className="p-3">
            <div className="flex flex-col text-foreground dark:text-background space-y-3">
              <ul tabIndex={0} data-testid="tags-list" className="flex gap-2 flex-wrap">
                {tags?.map((tag) => {
                  return <ProjectTag key={tag?.id} label={tag?.label} inversePill />
                })}
              </ul>
              <ScrollArea className="h-[40vh]" type="scroll">
                <MorphingDialogTitle className="text-3xl md:text-6xl font-semibold leading-16">
                  {title}
                </MorphingDialogTitle>
                <RichTextEditor content_html={teaserContent} />
              </ScrollArea>
              <div className='mx-auto'>
                <CallToAction
                  eventLocation={`Blog post modal - ${title}`}
                  style='primary'
                  arrow
                  arrowDirection='right'
                  link={{
                    type: 'custom',
                    newTab: false,
                    url: `blog/${slug}`,
                    reference: [{ value: { slug } }],
                    label: 'Read this article'
                  }}
                />
              </div>
            </div>
          </section>
          <MorphingDialogClose className="text-foreground" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default BlogPostCard
