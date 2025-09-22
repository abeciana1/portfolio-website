import {
  type CollectionConfig
} from 'payload'
import {
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";

// const r2 = new R2({
//   accountId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCT_ID as string,
//   accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_VIDEO_ACCESS_KEY_ID as string,
//   secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY as string,
// });

const r2 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_VIDEO_ACCESS_KEY_ID! as string,
    secretAccessKey: process.env.CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY! as string
  },
  forcePathStyle: true
})

export const Video: CollectionConfig = {
  slug: 'video',
  upload: {
    displayPreview: true,
    adminThumbnail: ({ doc }) => {
      return `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com/${process.env.CLOUDFLARE_VIDEO_BUCKET_NAME}/${doc.filename}`
    },
    mimeTypes: ['video/*'],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.title) {
          try {
            const exists = async (key: string): Promise<boolean> => {
              try {
                await r2.send(new HeadObjectCommand({ Bucket: 'videos', Key: key }))
                return true;
              } catch (err: any) {
                const status = err?.$metadata?.httpStatusCode;
                return status === 404 || err?.name === "NotFound";
              }
            }

            const doesExist = await exists(doc.filename);
            doc.videoUrl = doesExist ? `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com/${process.env.CLOUDFLARE_VIDEO_BUCKET_NAME}/${doc.filename}` : null;

          } catch (error: any) {
            console.error(`Error checking for video file ${doc.filename}:`, error);
          }
        }
      }
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc.filename) {
          try {
            await r2.send(new DeleteObjectCommand({ Bucket: 'videos', Key: doc.filename }));
            console.log(`Deleted video file ${doc.filename} from R2.`);
          } catch (error: any) {
            if (error.code === 'NotFound') {
              console.log(`Video file ${doc.filename} not found on R2, nothing to delete.`);
            } else {
              console.error(`Error deleting video file ${doc.filename}:`, error);
            }
          }
        }
      }
    ]
  },
  fields: [
    {
      name: 'title',
      label: 'Video title',
      type: 'text'
    }
  ]
}