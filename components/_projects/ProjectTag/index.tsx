import {
  type ProjectTagProps
} from '@/types/blockTypes'

const ProjectTag: React.FC<Pick<ProjectTagProps,
  'label'
>> = ({
  label
}) => {
  return (
    <div>
      { label }
    </div>
  )
}

export default ProjectTag