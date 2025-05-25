import {
  type ProjectTagProps
} from '@/types/blockTypes'

const ProjectTag: React.FC<Pick<ProjectTagProps,
  'label'
>> = ({
  label
}) => {
  return (
    <div
      className="text-foreground bg-pillGrey rounded-lg py-1 px-2 text-center font-medium max-w-fit text-lg"
    >
      { label }
    </div>
  )
}

export default ProjectTag