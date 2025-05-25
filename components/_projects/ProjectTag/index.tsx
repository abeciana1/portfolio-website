import {
  type ProjectTagProps
} from '@/types/blockTypes'

const ProjectTag: React.FC<Pick<ProjectTagProps,
  'label'
>> = ({
  label
}) => {
  return (
    <li
      tabIndex={0}
      className="text-foreground bg-pillGrey rounded-lg py-1 px-2 text-center font-medium max-w-fit text-sm"
    >
      { label }
    </li>
  )
}

export default ProjectTag