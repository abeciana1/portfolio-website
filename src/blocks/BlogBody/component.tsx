/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BlogBodyBlockProps } from '@/types/blockTypes'
import RenderBlogBlocks from '@/src/blocks/RenderBlogBlocks'

const BlogBodyBlock: React.FC<BlogBodyBlockProps> = ({
  embedBlocks
}) => {
  return (
    <section
      className='relative max-w-3xl mx-auto text-justify'
    >
      <RenderBlogBlocks blocks={[...embedBlocks] as any} />
    </section>
  )
}

export default BlogBodyBlock