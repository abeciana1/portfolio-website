import { type BlogHeaderProps } from '@/types/blockTypes'
import Image from 'next/image'
import { Heading1 } from '@/components/_styled/Heading'
import ProjectTag from '@/components/_projects/ProjectTag'

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  excerpt,
  featuredImage,
  category,
  tags
}) => {

  console.log('tags', tags)

  const {
    webpUrl,
    alt
  } = featuredImage

  return (
    <section className='mt-12 space-y-6 relative text-center mb-6'>
      <ul className='relative mx-auto flex justify-center'>
        <ProjectTag label={category?.label} />
      </ul>
      <Heading1 text={title} />
      <div data-testid='blog-excerpt' className='italic text-lg font-medium'>{excerpt}</div>
      <Image
        src={webpUrl}
        alt={alt}
        width={700}
        height={1400}
        className='mx-auto object-cover object-center rounded-md'
      />
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
    </section>
  )
}

export default BlogHeader