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
      className='relative z-50 lg:py-24 py-10 px-5 md:px-10 lg:px-17 mx-auto w-full'
    >
      <Heading1 text={title} />
      <section className='mt-10 flex justify-center'>
        <section>
          <div className=''>
            <RichTextEditor
              content_html={content_html as string}
            />
          </div>
        </section>
        <section className='w-full max-w-56'>
          <div>
            <div className=''>Role</div>
            <ul>
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
          <div>
            <div>Duration</div>
            <div>{`${duration.timeLength} ${duration.frequency}`}</div>
          </div>
          <div>
            <div>Tags</div>
            <ul>
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