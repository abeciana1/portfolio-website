/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardBlockProps } from '@/types/blockTypes'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import Pill from '@/components/_styled/Pill'

const Card: React.FC<CardBlockProps> = ({
  pill,
  embedBlocks,
}) => {
  return (
    <div
      className='px-5 md:max-w-2xl mx-auto'
    >
      <div className='pb-6'>
        <Pill text={pill} />
      </div>
      <RenderBlocks blocks={[...embedBlocks] as any} />
    </div>
  )
}

export default Card