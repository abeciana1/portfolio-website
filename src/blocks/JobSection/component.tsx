import {
  type JobSectionProps,
  type JobProps,
  type GradientOptions
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import Pill from '@/components/_styled/Pill'
import Job from '@/src/blocks/Job/component'
import Gradient from '@/components/_styled/Gradient'

const JobSection: React.FC<JobSectionProps> = ({
  sectionId,
  title,
  jobs,
  gradient,
  gradientSelect
}) => {
  return (
    <section id={sectionId} className='relative z-20 flex flex-col space-y-6 justify-center items-center lg:py-24 px-5 py-10'>
      {gradient &&
        <div
          className='z-0 absolute -top-15 right-0 md:right-8 rounded-full h-56 sm:h-[10rem] md:h-[20rem] w-[45rem] overflow-hidden blur-3xl sm:opacity-70'
        >
          <Gradient
            variant={gradientSelect as GradientOptions}
          />
        </div>
      }
      <div className='z-20'>
        <Pill text='Experience' />
      </div>
      <Heading1 text={title} />
      {jobs && jobs.map((job: JobProps, index: number) => {
        if (job.display) {
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
        }
      })}
    </section>
  )
}

export default JobSection