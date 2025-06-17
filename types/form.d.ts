import { UseFormRegister } from 'react-hook-form'

export type BaseInputProps = {
  label: string;
  name: string;
  required: boolean;
  register: UseFormRegister;
}

export type LabelProps = {
  label: string;
  name: string;
  required: boolean;
}