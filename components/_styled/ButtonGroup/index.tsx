import { type ButtonGroupProps } from '@/types/general'

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children
}) => {
  return (
    <div className='flex flex-wrap gap-6'>
      {children}
    </div>
  )
}

export default ButtonGroup