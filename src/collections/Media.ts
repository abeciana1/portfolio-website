import {
  type CollectionConfig
} from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    displayPreview: true,
    adminThumbnail: ({ doc }) => {
      return `${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/${doc.filename}`
    }
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    }
  ],
}
