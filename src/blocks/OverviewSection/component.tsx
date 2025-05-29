import {
  type OverviewSectionBlockProps,
  type RoleSelect
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import ProjectTag from '@/components/_projects/ProjectTag'

const OverviewSection: React.FC<OverviewSectionBlockProps> = ({
  title,
  content_html,
  role,
  duration,
  tags
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
      className='relative z-50 lg:py-24 py-10 plx-5 md:pl-10 lg:pl-17 mx-auto w-full'
    >
      <Heading1 text={title} />
      <section className='mt-10 flex gap-6'>
        <section className='max-w-2xl'>
          <RichTextEditor
            content_html={content_html as string}
          />
        </section>
        <section className='w-full sticky top-0 lg:max-w-64 space-y-3'>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Role</div>
            <ul className='flex flex-wrap gap-2'>
              {role?.map((role, index) => {
                return (
                  <ProjectTag
                    key={`${role}-${index}`}
                    label={roles[role as RoleSelect] as string}
                  />
                )
              })}
            </ul>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Duration</div>
            <div className='text-md'>{`${duration.timeLength} ${duration.frequency}`}</div>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-semibold'>Tags</div>
            <ul className='flex flex-wrap gap-2'>
              {tags?.map((tag) => {
                return (
                  <ProjectTag key={`${tag?.label}-${tag?.id}`} label={tag?.label} />
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