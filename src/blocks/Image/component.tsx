import Image from 'next/image'
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
          className='relative z-50'
        />
        {gradient && (
          <div
            className={`absolute -top-32 -left-40 w-full h-full blur-2xl`}
            style={{
              transform: `scaleX(${gradientXFlip? -1 : 1}) scaleY(${gradientYFlip? -1 : 1})`,
            }}
          >
            {gradientSelect === 'Variant1' && <Variant1 />}
            {gradientSelect === 'Variant2' && <Variant2 />}
            {gradientSelect === 'Variant3' && <Variant3 />}
            {gradientSelect === 'Variant4' && <Variant4 />}
          </div>
        )}
    </div>
  )
}

export default ImageComponent