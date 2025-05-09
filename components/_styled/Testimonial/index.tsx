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

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  position,
  company,
  headshot,
  callout,
  content_html
}) => {
  console.log('headshot', headshot)
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
        className='relative  max-w-2xl mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg p-4 md:h-20 bg-background'
      >
        <div className='flex space-x-6 items-center'>
          <MorphingDialogImage
            src={headshot?.webpUrl as string}
            alt={`${name} headshot`}
            className='h-auto w-auto max-h-20 max-w-20 min-w-[80px] object-cover object-top'
          />
          <div className='flex flex-col w-full'>
            <div className='flex flex-col sm:flex-row justify-between text-foreground font-medium text-md'>
              <MorphingDialogTitle>
                <div className='flex flex-col sm:flex-row sm:gap-2 text-left'>
                  <span data-testid='job-role'>{name}</span>
                </div>
              </MorphingDialogTitle>
            </div>
            <MorphingDialogSubtitle
              className='flex justify-between text-darkGrey text-md'
            >
              <span data-testid='position'>{`${position} @ ${company}`}</span>
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className='relative h-auto w-[500px] border-2 border-darkGrey dark:border-pillGrey bg-background rounded-lg'
        >
          <ScrollArea className='h-[90vh]' type='scroll'>
            <div className='relative p-6 space-y-6'>
              <div className='flex justify-center'>
                <MorphingDialogImage
                  src={headshot?.webpUrl as string}
                  alt={`${name} headshot`}
                  className='h-auto w-auto max-h-16 object-cover object-top'
                />
              </div>
            </div>
            <div>
              <div className='flex justify-between text-foreground dark:text-background font-medium text-md'>
                <MorphingDialogTitle>
                  <div className='flex flex-col sm:flex-row sm:gap-2 text-left'>
                    <span data-testid='job-role'>{name}</span>
                  </div>
                </MorphingDialogTitle>
              </div>
              <MorphingDialogSubtitle
                className='flex justify-between text-darkGrey dark:text-pillGrey text-md'
              >
                <span data-testid='position'>{`${position} @ ${company}`}</span>
              </MorphingDialogSubtitle>
            </div>
          </ScrollArea>
          <MorphingDialogClose className='text-foreground' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default Testimonial