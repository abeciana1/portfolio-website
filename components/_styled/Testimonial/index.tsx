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
        className='relative h-56 w-96 lg:w-125 mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg bg-background dark:bg-foreground'
      >
        <div className='flex items-center'>
          <MorphingDialogImage
            src={headshot?.webpUrl as string}
            alt={`${name} headshot`}
            className='h-55 w-48 rounded-md object-cover object-top'
          />
          <div className='flex flex-col w-full p-6 justify-between h-55'>
            <div className='font-semibold italic text-md text-left'>
              &quot;{callout}&quot;
            </div>
            <div className='flex flex-col justify-between text-foreground font-medium text-md'>
              <MorphingDialogTitle>
                <div className='text-left'>
                  <span data-testid='job-role'>{name}</span>
                </div>
              </MorphingDialogTitle>
              <MorphingDialogSubtitle
                className='flex flex-col justify-between text-darkGrey text-md text-left'
              >
                <span data-testid='position'>{`${position} @ ${company}`}</span>
              </MorphingDialogSubtitle>
            </div>
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