import {
  type ProjectSectionBlockProps
} from '@/types/blockTypes'
import ProjectCard from '@/components/_projects/ProjectCard'

const ProjectGrid: React.FC<Pick<ProjectSectionBlockProps, 'projects'>> = ({
  projects
}) => {
  return (
    <section>
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
          />
        )
      })}
    </section>
  )
}

export default ProjectGrid