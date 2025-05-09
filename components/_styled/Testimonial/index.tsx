import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';
import { ScrollArea } from '@/components/_core/ScrollArea'
import { TestimonialProps } from '@/types/blockTypes'

const Testimonal: React.FC<TestimonialProps> = ({
  name,
  position,
  company,
  headshot,
  callout,
  content_html
}) => {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger
        testId='testimonial'
        className='relative w-full max-w-2xl mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg p-4 md:h-20 bg-background'
      >

      </MorphingDialogTrigger>
    </MorphingDialog>
  )
}

export default Testimonal