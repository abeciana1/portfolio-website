import { type Block } from 'payload';

export const BlogImage: Block = {
  slug: 'blog-image',
  interfaceName: 'BlogImageBlock',
  fields: [
    {
      name: 'cursorLabel',
      label: 'Cursor label',
      type: 'text',
      required: true
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
      required: true
    },
  ],
};