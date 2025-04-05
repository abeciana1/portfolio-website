/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardBlockProps } from '@/types/blockTypes'
import RenderBlocks from '@/src/blocks/RenderBlocks'

const Card: React.FC<CardBlockProps> = ({
  pill,
  embedBlocks,
}) => {
  return (
    <div>
      <RenderBlocks blocks={[...embedBlocks] as any} />
    </div>
  )
}

export default Card