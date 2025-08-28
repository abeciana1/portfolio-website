import { type BlogHeaderProps } from '@/types/blockTypes'
import Image from 'next/image'
import { Heading1 } from '@/components/_styled/Heading'

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  excerpt,
  featuredImage,
  category,
  tags
}) => {

  const {
    webpUrl,
    alt,
    width = 1000,
    height = 700
  } = featuredImage

  return (
    <section className='space-y-6'>
      <Heading1 text={title} />
      <div data-testid='blog-excerpt'>{excerpt}</div>
      <Image
        src={webpUrl}
        alt={alt}
        width={width as number}
        height={height as number}
        className='w-full h-auto object-cover object-center rounded-md'
      />
    </section>
  )
}

export default BlogHeader