import { BaseInputProps } from '@/types/form'
import Label from '@/components/_forms/Label'

const TextField: React.FC<BaseInputProps> = ({
  label,
  name,
  required,
  register
}) => {
  return (
    <div className='flex flex-col gap-3'>
      <Label
        name={name}
        label={label}
        required={required}
      />
      <input
        type='text'
        {...register(name, {
          required: required
        })}
        className='border-2 border-darkGrey dark:border-pillGrey p-2 rounded-md focus:border-foreground dark:focus:border-pillGrey'
      />
    </div>
  )
}

export default TextField