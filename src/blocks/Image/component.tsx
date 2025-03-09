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
    <div className='relative'>
      {gradient && (
        <div
          className={`absolute top-0 left-0 w-full h-full`}
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
      <Image
        src={webpUrl}
        alt={alt}
        height={height}
        width={width}
        className='z-50'
      />
    </div>
  )
}

export default ImageComponent