import {
  type ProjectSectionBlockProps
} from '@/types/blockTypes'
import ProjectCard from '@/components/_projects/ProjectCard'

const ProjectGrid: React.FC<Pick<ProjectSectionBlockProps,
'projects' | 'gradient' | 'gradientSelect'>> = ({
  projects
}) => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {projects?.map((project) => {
        return (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            excerpt={project.excerpt}
            status={project.status}
            tech={project.tech}
            links={project.links}
            tags={project.tags}
            image={project.image}
          />
        )
      })}
    </section>
  )
}

export default ProjectGrid