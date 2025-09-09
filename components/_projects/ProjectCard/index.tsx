import { type ProjectProps } from '@/types/blockTypes'
import Link from 'next/link'
import Image from 'next/image'
import ProjectTag from '@/components/_projects/ProjectTag'

const ProjectCard: React.FC<Pick<ProjectProps,
  'excerpt' | 'slug' | 'image' | 'tags' | 'title'
>> = ({
  slug,
  title,
  excerpt,
  tags,
  image
}) => {
  const {
    webpUrl,
    alt
  } = image

  return (
    <Link
      data-cursor={`Learn more about ${title}`}
      data-cursor-variant='projectCard'
      prefetch
      data-cursor-pointer='pointer'
      href={`projects/${slug}`}
      className='relative p-6 rounded-2xl bg-background/50 dark:bg-foreground/50 h-auto max-h-[412px]'
    >
      <div className='relative z-50 opacity-100 space-y-6'>
        <div className='relative w-full p-6 bg-background h-full max-h-[240px] rounded-2xl'>
          <Image
            data-testid='project-image'
            src={webpUrl}
            alt={alt}
            height={100}
            width={100}
            className="mx-auto h-32 w-auto"
          />
        </div>
        <div className='flex flex-col justify-between gap-3'>
          <div tabIndex={0} data-testid='project-title' className="font-medium text-lg text-foreground dark:text-background">
            {title}
          </div>
          <div  data-testid='project-excerpt' className="font-medium text-lg text-darkGrey dark:text-pillGrey">
            {excerpt.length > 70 ? excerpt.substring(0, 70) + '...' : excerpt}
          </div>
          <span tabIndex={0} className='sr-only'>{excerpt}</span>
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
      </div>
    </Link>
  )
}

export default ProjectCard