'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BlogBodyBlockProps } from '@/types/blockTypes'
import dynamic from 'next/dynamic'
const RenderBlogBlocks = dynamic(() => import('@/src/blocks/RenderBlogBlocks'), { ssr: true })
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { usePathname } from 'next/navigation'
import ShareBtn from '@/components/_styled/ShareBtn'
import { Copy } from 'lucide-react';

const BlogBodyBlock: React.FC<BlogBodyBlockProps> = ({
  embedBlocks
}) => {
  const [ copiedText, copyToClipboard ] = useCopyToClipboard();
  const pathname = usePathname()

  const hasCopiedText = Boolean(copiedText)

  return (
    <>
      <div className='sticky top-10 left-0'>
        <div className='space-y-6'>
          <ShareBtn
            onClick={() => copyToClipboard(`https://alexbeciana.com${pathname}`)}
            text={hasCopiedText ? 'Copied!' : 'Copy link'}
            icon={Copy}
          />
        </div>
      </div>
      <section
        className='relative max-w-3xl mx-auto text-justify'
      >
        <RenderBlogBlocks blocks={[...embedBlocks] as any} />
      </section>
    </>
  )
}

export default BlogBodyBlock