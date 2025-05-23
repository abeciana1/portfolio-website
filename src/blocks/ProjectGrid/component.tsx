import {
  type ProjectSectionBlockProps,
  type GradientOptions
} from '@/types/blockTypes'
import ProjectCard from '@/components/_projects/ProjectCard'
import Gradient from '@/components/_styled/Gradient'

const ProjectGrid: React.FC<Pick<ProjectSectionBlockProps,
'projects' | 'gradient' | 'gradientSelect'>> = ({
  projects,
  gradient,
  gradientSelect
}) => {

  const groups = projects.reduce<typeof projects[]>((acc, proj, idx) => {
    if (idx % 4 === 0) acc.push([])
    acc[acc.length - 1].push(proj)
    return acc
  }, [])

  return (
    <section
      className=""
    >
      {groups.map((group, groupIdx) => (
        <div
          key={groupIdx}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {gradient && (
            <div
              className="absolute top-1/5 left-5 lg:left-1/4 rounded-full h-64 w-[45rem] blur-3xl opacity-70 z-0"
            >
              <Gradient variant={gradientSelect as GradientOptions} />
            </div>
          )}
          {group.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              excerpt={project.excerpt}
              tags={project.tags}
              image={project.image}
            />
          ))}
        </div>
      ))}
    </section>
  )
}

export default ProjectGrid