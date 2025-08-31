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

  const {
    webpUrl,
    alt
  } = featuredImage

  return (
    <section className='mt-12 space-y-6 relative text-center mb-6'>
      <ul className='relative mx-auto flex justify-center'>
        <ProjectTag label={category?.label} />
      </ul>
      <section className='flex flex-col space-y-6 max-w-5xl justify-center mx-auto'>
        <Heading1 text={title} />
        <div data-testid='blog-excerpt' className='italic text-lg font-medium'>{excerpt}</div>
      </section>
      <Image
        src={webpUrl}
        alt={alt}
        width={800}
        height={1600}
        className='mx-auto h-auto w-full object-cover object-center rounded-md'
        loading='eager'
      />
      <ul
        tabIndex={0}
        data-testid='tags-list'
        className='flex gap-2 flex-wrap justify-end'
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