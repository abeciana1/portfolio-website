import {
  type CollectionConfig
} from 'payload';
import { titleToSlug } from '@/utils/helpers'

export const Project: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title'
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.title) {
          doc.slug = titleToSlug(doc.title);
        }
      }
    ]
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug'
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true
    },
    {
      name: 'status',
      label: 'Project status',
      type: 'select',
      options: [
        {
          label: 'Completed',
          value: 'completed'
        },
        {
          label: 'In progress',
          value: 'inProgress',
        },
        {
          label: 'On hold',
          value: 'onHold'
        }
      ],
      required: true
    },
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      labels: {
        singular: 'Link',
        plural: 'Links'
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'link',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'tech',
      label: 'Technology',
      type: 'relationship',
      relationTo: 'skills',
      required: true,
      hasMany: true
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'project-tags',
      required: true,
      hasMany: true
    }
  ]
}