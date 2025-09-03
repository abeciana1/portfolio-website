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
    image
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
        className='relative p-6 rounded-2xl bg-background/50 dark:bg-foreground/50 h-auto max-h-[412px]'
      >
        <div className='relative z-50 opacity-100 space-y-6'>
          <div className='relative w-full p-6 bg-background h-full max-h-[240px] rounded-2xl'>
            <Image
              data-testid='blog-image'
              src={image?.webpUrl}
              alt={image?.alt}
              height={100}
              width={100}
              className="mx-auto h-32 w-auto"
            />
          </div>
          <div className='flex flex-col justify-between gap-3'>
            <div tabIndex={0} data-testid='blog-title' className="font-medium text-lg text-foreground dark:text-background">
              {title}
            </div>
          </div>
          <ul
            tabIndex={0}
            data-testid='tags-list'
            className='flex gap-2 flex-wrap'
          >
            {tags?.map((tag) => {
              return (
                <ProjectTag key={tag?.id} label={tag?.label} />
              )
            })}
          </ul>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative h-auto w-[500px] border-2 border-darkGrey dark:border-pillGrey bg-background rounded-lg">
          <div className="flex justify-center">
            <MorphingDialogImage
              src={image?.webpUrl}
              width={200}
              height={200}
              alt={`Blog post title - ${title}`} // TODO - add alt text
              className="max-h-16 object-cover object-top"
            />
          </div>
          <div>
            <div className="flex justify-between text-foreground dark:text-background font-medium text-md">
              <MorphingDialogTitle>
                <div className="flex flex-col sm:flex-row sm:gap-2 text-left">
                  {/* <span data-testid="job-role">{jobRole}</span> */}
                  {/* <span className="font-bold hidden sm:block">·</span> */}
                  {/* <span data-testid="position">{positionType}</span> */}
                </div>
              </MorphingDialogTitle>
              <div className="flex justify-start">
                <span>{`${format(new Date(publishedDate), 'MMM yyyy')}`}</span>
              </div>
            </div>
          </div>
          <MorphingDialogClose className="text-foreground" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default BlogPostCard