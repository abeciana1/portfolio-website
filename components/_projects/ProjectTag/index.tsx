import {
  type ProjectTagProps
} from '@/types/blockTypes'
import clsx from 'clsx'

const ProjectTag: React.FC<Pick<ProjectTagProps,
  'label' |
  'addBorder'
>> = ({
  label,
  addBorder = false
}) => {
  return (
    <li
      tabIndex={0}
      className={clsx("text-foreground bg-pillGrey rounded-lg py-1 px-2 text-center font-medium max-w-fit text-sm", {
        ['border-2 border-foreground dark:border-0 dark:border-transparent']: addBorder
      })}
    >
      { label }
    </li>
  )
}

export default ProjectTag