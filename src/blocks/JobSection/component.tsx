import {
  type JobSectionProps,
  type JobProps
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import Pill from '@/components/_styled/Pill'
import Job from '@/src/blocks/Job/component'

const JobSection: React.FC<JobSectionProps> = ({
  sectionId,
  title,
  jobs,
  gradient,
  gradientSelect
}) => {
  return (
    <section id={sectionId} className='flex flex-col space-y-6'>
      <Pill text='Experience' />
      <Heading1 text={title} />
      {/* <div className='flex flex-col space-y-6'>
      </div> */}
      {jobs && jobs.map((job: JobProps, index: number) => {
        return (
          <Job
            key={job.id || `${job.companyName}-${index}`}
            companyDescription={job.companyDescription}
            companyName={job.companyName}
            companyLogo={job.companyLogo}
            companyWebsite={job.companyWebsite}
            jobRole={job.jobRole}
            startDate={job.startDate}
            endDate={job.endDate}
            location={job.location}
            positionType={job.positionType}
            currentPosition={job.currentPosition}
            skills={job.skills}
            duties={job.duties}
          />
        )
      })}
    </section>
  )
}

export default JobSection