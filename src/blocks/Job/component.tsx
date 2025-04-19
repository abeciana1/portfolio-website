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
  return (
    <div data-testid='job'>

    </div>
  )
}

export default Job