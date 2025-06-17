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
      />
    </div>
  )
}

export default TextField