/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardBlockProps } from '@/types/blockTypes'
import RenderBlocks from '@/src/blocks/RenderBlocks'
import Pill from '@/components/_styled/Pill'

const Card: React.FC<CardBlockProps> = ({
  pill,
  embedBlocks,
}) => {
  return (
    <div>
      <Pill text={pill} />
      <RenderBlocks blocks={[...embedBlocks] as any} />
    </div>
  )
}

export default Card