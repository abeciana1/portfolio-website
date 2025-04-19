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
        className='mx-auto border-2 border-darkGrey dark:border-pillGrey rounded-lg'
      >
        <div className='flex space-x-6'>
          <MorphingDialogImage
            src={webpUrl}
            alt={`Company logo - ${companyName}`}
            className='h-8 w-8 object-cover object-top rounded-lg'
          />
          <div className='flex flex-col'>
            <MorphingDialogTitle
              className='flex justify-between text-foreground dark:text-background font-medium text-md'
            >
              <div>
                <span data-testid='job-role'>{jobRole}</span>
                <span>·</span>
                <span data-testid='company-name'>{companyName}</span>
              </div>
              <div>
                <span>{`${startDate} — ${currentPosition ? 'Present' : endDate}`}</span>
              </div>
            </MorphingDialogTitle>
            <MorphingDialogSubtitle
              className='flex justify-between text-darkGrey dark:text-pillGrey text-md'
            >
              <div>
                <span data-testid='position'>{positionType}</span>
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