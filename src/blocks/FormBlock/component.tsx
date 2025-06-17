'use client'
import { type FormBlockProps } from '@/types/blockTypes'
import axios from 'axios'
import { Heading2 } from '@/components/_styled/Heading'
import RichTextEditor from '@/src/blocks/RichTextEditor/component'
import { useForm, UseFormRegister, SubmitHandler } from "react-hook-form"

// * field components
import TextField from '@/components/_forms/_fields/TextField'

// * field types
import { BaseInputProps } from '@/types/form'

type FieldBlockComponentsMap = {
  'text': React.FC<BaseInputProps>
}

const fieldBlockComponents: FieldBlockComponentsMap = {
  'text': TextField
}

type AcceptableFields = keyof typeof fieldBlockComponents

const FormBlock: React.FC<FormBlockProps> = ({
  formTitle,
  destination,
  enableIntro,
  content_html,
  form
}) => {
  const {
    register,
    handleSubmit,
    formState
  } = useForm()
  console.log('form block fields', form)
  return (
    <section>
      <Heading2 text={formTitle} />
      {enableIntro &&
        <RichTextEditor content_html={content_html} />
      }
      <form>
        {form?.fields?.map((field, index) => {
          if (!field.blockType || !(field.blockType in fieldBlockComponents)) {
            return null
          }
          const Block = fieldBlockComponents[field.blockType as AcceptableFields]
          const { name, label, required } = field as Pick<BaseInputProps, 'label' | 'required' | 'name'>
            return <Block
              key={`${name}-${index}`}
              label={label}
              name={name}
              required={required}
              register={register as UseFormRegister<any>}
            />
        })}
      </form>
    </section>
  )
}

export default FormBlock