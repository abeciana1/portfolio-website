import { type Block } from 'payload'
import {
  lexicalEditor,
  lexicalHTMLField
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'form-block',
  interfaceName: 'FormBlockInterface',
  fields: [
    {
      name: 'formTitle',
      label: 'Form title',
      type: 'text',
      required: true
    },
    {
      name: 'enableIntro',
      label: 'Enable Intro Content',
      type: 'checkbox',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Rich Text Content',
      required: true,
      editor: lexicalEditor()
    },
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content'
    }),
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ]
}