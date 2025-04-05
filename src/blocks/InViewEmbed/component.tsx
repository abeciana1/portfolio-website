/* eslint-disable @typescript-eslint/no-explicit-any */
import { type InViewEmbedProps } from '@/types/blockTypes'
import { InView } from '@/components/_core/InView'
import RenderBlocks from '@/src/blocks/RenderBlocks'

const InViewEmbed: React.FC<InViewEmbedProps> = ({
  sectionId,
  embedBlocks,
  hiddenY,
  hiddenBlur,
  visibleY,
  visibleBlur,
}) => {
  return (
    <section
      className='py-12 lg:py-24'
      id={sectionId}
    >
      <InView
          variants={{
            hidden: { opacity: 0, y: hiddenY, filter: `blur(${hiddenBlur}px)` },
            visible: { opacity: 1, y: visibleY, filter: `blur(${visibleBlur}px)` },
          }}
          viewOptions={{ margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <RenderBlocks blocks={[...embedBlocks] as any} />
      </InView>
    </section>
  )
}

export default InViewEmbed