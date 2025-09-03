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
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog'

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  slug,
  publishedDate,
  category,
  tags,
  meta
}) => {

  const {
    image,
    description
  } = meta

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger
        testId='blog-post'
        className='relative pb-3 rounded-2xl max-w-[600px] bg-[#fbf2e4] border-2 border-darkGrey dark:border-pillGrey'
      >
        <div className='relative z-50 opacity-100 space-y-3'>
          <div className='relative'>
            <ul className='absolute top-3 right-3'>
              <ProjectTag label={category?.label} addBorder />
            </ul>
            <ul className='absolute bottom-3 left-3'>
              <ProjectTag label='By Alex Beciana' addBorder />
            </ul>
            <ul className='absolute bottom-3 right-3'>
              <ProjectTag label={`${format(new Date(publishedDate), 'MMM dd yyyy')}`} addBorder />
            </ul>
            <Image
              data-testid='blog-image'
              src={image?.webpUrl}
              alt={image?.alt}
              height={246}
              width={600}
              className="mx-auto w-auto h-auto rounded-t-[0.9rem]"
            />
          </div>
          <div className='flex flex-col px-3 space-y-3'>
            <div tabIndex={0} data-testid='blog-title' className="text-left font-medium text-xl text-foreground">
              {title}
            </div>
            <div  data-testid='blog-excerpt' className="text-left font-medium text-lg text-foreground">
              {description.substring(0, 55) + '...'}
            </div>
            <ul
              tabIndex={0}
              data-testid='tags-list'
              className='flex gap-2'
            >
              {tags?.slice(0,4)?.map((tag) => {
                return (
                  <ProjectTag key={tag?.id} label={tag?.label} inversePill />
                )
              })}
              {tags?.length > 4 && <ProjectTag label='...' inversePill />}
            </ul>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative border-2 border-darkGrey dark:border-pillGrey bg-background dark:bg-foreground rounded-lg">
          <div className="relative bg-[#FFFBF5]">
            <ul className='absolute top-3 left-3'>
              <ProjectTag label={category?.label} addBorder />
            </ul>
            <ul className='absolute bottom-3 left-3'>
              <ProjectTag label='By Alex Beciana' addBorder />
            </ul>
            <ul className='absolute bottom-3 right-3'>
              <ProjectTag label={`${format(new Date(publishedDate), 'MMM dd yyyy')}`} addBorder />
            </ul>
            <MorphingDialogImage
              src={image?.webpUrl}
              width={600}
              height={246}
              alt={`Blog post title - ${title}`} // TODO - add alt text
              className="object-cover object-top rounded-t-md"
            />
          </div>
          <section className='p-3'>
            <div className="flex flex-col text-foreground dark:text-background space-y-6">
              <ul
                tabIndex={0}
                data-testid='tags-list'
                className='flex gap-2 flex-wrap'
              >
                {tags?.map((tag) => {
                  return (
                    <ProjectTag key={tag?.id} label={tag?.label} inversePill />
                  )
                })}
              </ul>
              <MorphingDialogTitle>
                <div className="flex flex-col text-left text-6xl font-semibold">
                  {title}
                </div>
              </MorphingDialogTitle>
            </div>
          </section>
          <MorphingDialogClose className="text-foreground" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default BlogPostCard