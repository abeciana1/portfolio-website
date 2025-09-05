import { type ButtonGroupProps } from '@/types/general'
import clsx from 'clsx'

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  alignment = 'center'
}) => {
  return (
    <div
      className={clsx(
        'flex flex-wrap gap-6 justify-center',
        {
          ['justify-center']: alignment === 'center',
          ['justify-start']: alignment === 'left'}
      )}
    >
      {children}
    </div>
  )
}

export default ButtonGroup