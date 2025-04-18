import { type JobSectionProps } from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import Pill from '@/components/_styled/Pill'

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
      {jobs && jobs.map((job, index) => {
        return (
          <></>
        )
      })}
    </section>
  )
}

export default JobSection