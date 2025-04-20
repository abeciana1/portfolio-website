import { type JobProps } from '@/types/blockTypes'
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
import { format } from 'date-fns'

const Job: React.FC<JobProps> = ({
  companyName,
  jobRole,
  companyDescription,
  companyWebsite,
  companyLogo,
  startDate,
  endDate,
  location,
  positionType,
  currentPosition,
  skills,
  duties
}) => {
  const { image } = companyLogo[0]
  const { webpUrl } = image
  return (
    <MorphingDialog
      testId='job'
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger
        className='relative w-full max-w-2xl mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg p-4 md:h-20'
      >
        <div className='flex space-x-6 items-center'>
          <MorphingDialogImage
            src={webpUrl}
            alt={`Company logo - ${companyName}`}
            className='h-fit w-fit max-h-10 max-w-20 object-cover object-top'
          />
          <div className='flex flex-col w-full'>
            <MorphingDialogTitle
              className='flex flex-col sm:flex-row justify-between text-foreground dark:text-background font-medium text-md'
            >
              <div className='flex flex-col sm:flex-row sm:gap-2 text-left'>
                <span data-testid='job-role'>{jobRole}</span>
                <span className='font-bold hidden sm:block'>·</span>
                <span data-testid='position'>{positionType}</span>
              </div>
              <div className='flex justify-start'>
                <span>{`${format(new Date(startDate), 'MM yyyy')} — ${currentPosition ? 'Present' : format(new Date(endDate as string), 'MM yyyy')}`}</span>
              </div>
            </MorphingDialogTitle>
            <MorphingDialogSubtitle
              className='flex justify-between text-darkGrey dark:text-pillGrey text-md'
            >
              <div className='flex flex-col sm:flex-row justify-between w-full sm:gap-2 text-left'>
                <span
                  data-testid='company-name'
                  
                >
                  {companyName}
                </span>
                <span>{location}</span>
              </div>
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
    </MorphingDialog>
  )
}

export default Job