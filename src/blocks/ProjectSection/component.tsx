import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import {
  type ProjectSectionBlockProps,
  type CTAStyle,
  type ArrowDirection,
  type CTALink,
} from '@/types/blockTypes'
import CallToAction from '@/src/blocks/CallToAction/component'
import ButtonGroup from '@/components/_styled/ButtonGroup'
import ProjectGrid from '@/src/blocks/ProjectGrid/component'

const ProjectSection: React.FC<ProjectSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  callToAction,
  projects,
  gradient,
  gradientSelect,
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
      className="relative z-50 lg:py-24 px-5 py-10"
      data-cursor="Check out my projects"
      data-cursor-variant="section"
    >
      <div className="relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto">
        {pill && (
          <div data-testid="testimonials-pill" className="flex justify-center">
            <Pill text={pill as string} />
          </div>
        )}
        <Heading1 text={heading} />
        <div
          data-cursor-variant="callToAction"
          data-cursor-pointer="text"
          data-testid="testimonials-desc"
          className="text-darkGrey dark:text-pillGrey text-xl font-semibold"
        >
          {description}
        </div>
        {callToAction && callToAction?.length > 0 && (
          <ButtonGroup>
            {callToAction?.map((callToAction, index) => {
              return (
                <CallToAction
                  eventLocation="Project section header"
                  key={index}
                  style={callToAction.style as CTAStyle}
                  arrow={callToAction.arrow as boolean}
                  arrowDirection={callToAction.arrowDirection as ArrowDirection}
                  link={callToAction.link as CTALink}
                  cursorLabel={callToAction.cursorLabel as string}
                />
              )
            })}
          </ButtonGroup>
        )}
        <ProjectGrid projects={projects} gradient={gradient} gradientSelect={gradientSelect} />
      </div>
    </section>
  )
}

export default ProjectSection
