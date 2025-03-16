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
    width,
    height,
    alt,
  } = image

  return (
    <div className='relative max-w-fit'>
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
            height={height}
            width={width}
          />
        }
    </div>
  )
}

export default ImageComponent