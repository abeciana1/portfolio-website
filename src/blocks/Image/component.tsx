import Image from 'next/image'
import Gradient from '@/components/_styled/Gradient'
import { type ImageBlockProps, type GradientOptions } from '@/types/blockTypes'

const ImageComponent: React.FC<ImageBlockProps> = ({
  image,
  gradient,
  gradientXFlip,
  gradientYFlip,
  gradientSelect,
  forcedHeight,
  forcedWidth
}) => {

  const {
    webpUrl,
    alt,
    width,
    height,
  } = image

  return (
    <div className='relative'>
        <Image
          src={webpUrl}
          alt={alt}
          height={(forcedHeight || height) as number}
          width={(forcedWidth || width) as number}
          className='relative z-50 rounded-md'
        />
        {gradient &&
          <Gradient
            variant={gradientSelect as GradientOptions}
            gradientXFlip={gradientXFlip as boolean}
            gradientYFlip={gradientYFlip as boolean}
          />
        }
    </div>
  )
}

export default ImageComponent