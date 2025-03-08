import { type Page } from '@/src/payload-types'
import { Fragment } from 'react'

// * components
import HeroSection from '@/src/blocks/HeroSection/component'

const blockComponents = {
  "hero-section": HeroSection
}

const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {

  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks?.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <Block key={index} {...block} disableInnerContainer />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }
  return null
}

export default RenderBlocks