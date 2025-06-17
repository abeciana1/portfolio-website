import { LabelProps } from '@/types/form'

const Label: React.FC<LabelProps> = ({
  label,
  name,
  required
}) => {
  return (
    <label htmlFor={name}>{label}{required && '*'}</label>
  )
}

export default Label