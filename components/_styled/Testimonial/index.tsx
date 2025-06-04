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
import { TestimonialProps } from '@/types/blockTypes'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'

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
            width={headshot?.width as number}
            height={headshot?.height as number}
            src={headshot?.webpUrl as string}
            alt={`${name} headshot`}
            className='h-55 w-48 rounded-md object-cover object-top'
          />
          <div className='flex flex-col w-full p-6 justify-between h-55'>
            <div data-testid='callout' className='font-semibold italic text-md text-left'>
              &quot;{callout}&quot;
            </div>
            <div className='flex flex-col justify-between text-foreground font-medium text-md'>
              <MorphingDialogTitle>
                <div className='text-left dark:text-background'>
                  <span data-testid='job-role'>{name}</span>
                </div>
              </MorphingDialogTitle>
              <MorphingDialogSubtitle
                className='flex flex-col justify-between text-darkGrey dark:text-pillGrey text-md text-left'
              >
                <span data-testid='position'>{`${position} @ ${company}`}</span>
              </MorphingDialogSubtitle>
            </div>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className='relative max-w-4xl border-2 p-6 border-darkGrey dark:border-pillGrey bg-background dark:bg-foreground rounded-lg'
        >
          <div className='relative flex flex-col md:flex-row space-x-6 h-auto w-auto items-center'>
            <div className='relative flex flex-col space-y-6 w-full max-w-80'>
              <div className='relative mx-auto'>
                <MorphingDialogImage
                  width={headshot?.width as number}
                  height={headshot?.height as number}
                  src={headshot?.webpUrl as string}
                  alt={`${name} headshot`}
                  className='h-56 w-56 aspect-square rounded-full object-cover object-top'
                />
              </div>
              <div className='flex flex-col justify-between text-foreground font-medium text-lg'>
                <MorphingDialogTitle>
                  <div className='text-center dark:text-background'>
                    <span data-testid='job-role'>{name}</span>
                  </div>
                </MorphingDialogTitle>
                <MorphingDialogSubtitle
                  className='flex flex-col justify-between text-darkGrey dark:text-pillGrey text-center'
                >
                  <span data-testid='position'>{`${position} @ ${company}`}</span>
                </MorphingDialogSubtitle>
              </div>
            </div>
            <div className='flex flex-col w-full h-auto max-h-72 justify-between'>
              <div className='font-semibold italic text-lg text-left'>
                &quot;{callout}&quot;
              </div>
              <div className='max-h-56 overflow-scroll mt-6'>
                <RichTextEditor
                  content_html={content_html}
                />
              </div>
            </div>
          </div>
        <MorphingDialogClose className='text-foreground' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default Testimonial