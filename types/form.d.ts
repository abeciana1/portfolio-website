import { UseFormRegister } from 'react-hook-form'

export type BaseInputProps = {
  label: string;
  name: string;
  required: boolean;
  register: UseFormRegister;
}