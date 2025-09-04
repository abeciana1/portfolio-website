import ImageComponent from '@/src/blocks/Image/component'
import { type BlogImageProps } from '@/types/blockTypes'

const BlogImage: React.FC<BlogImageProps> = ({
  image,
  caption
}) => {

  const {
    width,
    height,
  } = image

  return (
    <figure>
      <ImageComponent
        image={image}
        useURL={false}
        forcedWidth={width as number}
        forcedHeight={height as number}
        gradient={false}
        gradientXFlip={false}
        gradientYFlip={false}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default BlogImage