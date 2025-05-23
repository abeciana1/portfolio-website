import { type ProjectProps } from '@/types/blockTypes'
import Link from 'next/link'
import Image from 'next/image'

const ProjectCard: React.FC<ProjectProps> = ({
  slug,
  title,
  excerpt,
  status,
  tech,
  links,
  tags,
  image
}) => {

  const {
    webpUrl,
    alt
  } = image

  return (
    <Link
      href={`/projects/${slug}`}
      className='relative p-6 rounded-2xl bg-background/50 dark:bg-foreground/50'
    >
      <div className='relative z-50 opacity-100 space-y-6'>
        <div className='relative w-full p-6 bg-pillGrey h-full max-h-[240px] rounded-2xl'>
          <Image
            data-testid='project-image'
            src={webpUrl}
            alt={alt}
            height={100}
            width={100}
            className="mx-auto h-32 w-auto"
          />
        </div>
        <div>
          <div data-testid='project-title' className="font-medium text-lg text-foreground dark:text-background">
            {title}
          </div>
          <div data-testid='project-excerpt' className="font-medium text-md text-darkGrey dark:text-pillGrey">
            {excerpt}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard