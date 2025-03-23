import Image from 'next/image'
import { ImageBlockProps } from '@/types/blockTypes'
import Gradient from '@/components/_styled/Gradient'

const ImageComponent: React.FC<ImageBlockProps> = ({
  image,
  gradient,
  gradientXFlip,
  gradientYFlip,
  gradientSelect,
}) => {

  const {
    webpUrl,
    alt,
    width,
    height,
  } = image

  return (
    <div className='relative '>
        <Image
          src={webpUrl}
          alt={alt}
          height={height}
          width={width}
          className='relative z-50 rounded-md'
        />
        {gradient &&
          <Gradient
            variant={gradientSelect}
            gradientXFlip={gradientXFlip}
            gradientYFlip={gradientYFlip}
          />
        }
    </div>
  )
}

export default ImageComponent