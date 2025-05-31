import {
  type OverviewSectionBlockProps,
  type RoleSelect
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import ProjectTag from '@/components/_projects/ProjectTag'
import clsx from 'clsx'

const OverviewSection: React.FC<OverviewSectionBlockProps> = ({
  title,
  content_html,
  role,
  duration,
  tags,
  greyBackground
}) => {

  const roles = {
    "designer": "Designer",
    "frontendDev": "Frontend Developer",
    "backendDEv": "Backend Developer",
    "integrationSpec": "Integration Specialist"
  }

  return (
    <section
      data-testid='overview-section'
      id='overview-section'
      className={clsx('relative z-50 lg:py-24 py-5 px-5 md:px-10 md:justify-around mx-auto w-full', {
        ['bg-pillGrey dark:bg-darkGrey']: greyBackground
      })}
    >
      <section className='flex gap-6 relative mx-auto flex-col sm:flex-col-reverse lg:flex-row items-start'>
        <section className='lg:max-w-2xl relative mx-auto'>
          <Heading1 text={title} />
          <div className='mt-10'>
            <RichTextEditor
              content_html={content_html as string}
            />
          </div>
        </section>
        <section className='w-full lg:max-w-64 space-y-3 relative mx-auto lg:mt-20 lg:pt-4'>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Role</div>
            <ul data-testid='roles' className='flex flex-wrap gap-2'>
              {role?.map((role, index) => {
                return (
                  <ProjectTag
                    key={`${role}-${index}`}
                    label={roles[role as RoleSelect] as string}
                    addBorder={greyBackground as boolean}
                  />
                )
              })}
            </ul>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Duration</div>
            <div data-testid='duration' className='text-md'>{`${duration.timeLength} ${duration.frequency}`}</div>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Tags</div>
            <ul data-testid='tags' className='flex flex-wrap gap-2'>
              {tags?.map((tag) => {
                return (
                  <ProjectTag key={`${tag?.label}-${tag?.id}`} label={tag?.label} addBorder={greyBackground as boolean} />
                )
              })}
            </ul>
          </div>
        </section>
      </section>
    </section>
  )
}

export default OverviewSection