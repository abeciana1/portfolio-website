import { type CollectionConfig } from 'payload'
import {
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

const r2 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_VIDEO_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true,
})

export const Video: CollectionConfig = {
  slug: 'video',
  upload: {
    displayPreview: true,
    mimeTypes: ['video/*'],
  },
  hooks: {
    afterRead: [
      async ({ doc }) => {
        const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
        const key: string | undefined =
          (doc?.storageKey as string) ?? (doc?.filename as string | undefined)

        if (!key) {
          doc.videoUrl = null
          doc.streamUrl = null
          return doc
        }
        try {
          await r2.send(
            new HeadObjectCommand({
              Bucket: bucket,
              Key: key,
            })
          )
          doc.streamUrl =
            '/api/r2/stream/' + key.split('/').map(encodeURIComponent).join('/')
          doc.videoUrl = doc.streamUrl
        } catch {
          doc.streamUrl = null
          doc.videoUrl = null
        }

        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
        const key: string | undefined =
          (doc?.storageKey as string) ?? (doc?.filename as string | undefined)

        if (!key) return

        try {
          await r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
          console.log(`Deleted ${key} from R2.`)
        } catch (err) {
          console.error('Error deleting object from R2:', err)
        }
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Video title', type: 'text' },
    { name: 'storageKey', type: 'text', admin: { hidden: true } },
    { name: 'streamUrl', type: 'text', admin: { readOnly: true } },
    { name: 'videoUrl', type: 'text', admin: { readOnly: true } },
  ],
}