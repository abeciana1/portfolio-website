import { type ProjectTagProps } from '@/types/blockTypes'
import clsx from 'clsx'

const ProjectTag: React.FC<
  Pick<ProjectTagProps, 'label' | 'addBorder' | 'enableDarkMode' | 'inversePill'>
> = ({ label, addBorder = false, enableDarkMode = false, inversePill = false }) => {
  return (
    <li
      data-cursor-variant="callToAction"
      data-cursor-pointer="text"
      tabIndex={0}
      className={clsx('rounded-lg py-1 px-2 text-center font-medium max-w-fit text-sm', {
        ['border-2 border-foreground']: addBorder,
        ['dark:border-0 dark:border-transparent']: enableDarkMode,
        ['bg-foreground text-background']: inversePill,
        ['text-foreground bg-pillGrey']: !inversePill,
      })}
    >
      {label}
    </li>
  )
}

export default ProjectTag
