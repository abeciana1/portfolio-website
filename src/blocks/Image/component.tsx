import Image from 'next/image'
import { ImageBlock } from '@/src/payload-types'
import Variant1 from '@/gradients/Variant1'
import Variant2 from '@/gradients/Variant2'
import Variant3 from '@/gradients/Variant3'
import Variant4 from '@/gradients/Variant4'
import { ImageBlockProps } from '@/types/blockTypes'

const ImageComponent: React.FC<ImageBlockProps> = ({
  image,
  gradient,
  gradientXFlip,
  gradientYFlip,
  gradientSelect,
}) => {

  const {
    src,
    width,
    height,
    alt,
  } = image

  return (
    <div>
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    </div>
  )
}

export default ImageComponent