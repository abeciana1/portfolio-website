import {
  type CollectionConfig
} from 'payload'
import sharp, { type SharpOptions } from 'sharp';
import { S3 } from 'aws-sdk';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    displayPreview: true,
    adminThumbnail: ({ doc }) => {
      return `${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/${doc.filename}`
    },
    mimeTypes: ['image/*', 'video/*'],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.convertWebp) {
          try {
            const s3 = new S3({
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
              },
              s3ForcePathStyle: true,
            });

            const bucket = 'images';
            const originalKey = doc.filename;

            const originalObject = await s3
            .getObject({
              Bucket: bucket,
              Key: originalKey,
            })
            .promise();

            if (!originalObject.Body) {
              throw new Error('No file body retrieved from S3');
            }

            const webpBuffer = await sharp(originalObject.Body as SharpOptions)
              .toFormat('webp')
              .toBuffer();

            const newFilename = originalKey.replace(/\.[^/.]+$/, '.webp');
            await s3
            .putObject({
              Bucket: bucket,
              Key: newFilename,
              Body: webpBuffer,
              ContentType: 'image/webp',
            })
            .promise();
          } catch (error) {
            console.error('Error converting file to WebP:', error);
          }
        }
      },
    ],
    afterRead: [
      async ({ doc }) => {
        const bucket = 'images'
        if (doc.filename) {
          const s3 = new S3({
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
            s3ForcePathStyle: true,
          });

          const webpFilename = doc.filename.replace(/\.[^/.]+$/, '.webp');
          try {
            await s3
            .headObject({
              Bucket: bucket,
              Key: webpFilename,
            })
            .promise();

            doc.webpUrl = `${process?.env?.S3_ENDPOINT}/${bucket}/${webpFilename}`;
          } catch (error: any) {
            if (error?.code === 'NotFound') {
              doc.webpUrl = null;
            } else {
              console.error(`Error checking for WebP file ${webpFilename}:`, error);
              doc.webpUrl = null;
            }
          }
        }
      }
    ]
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'convertWebp',
      type: 'checkbox',
      admin: {
        description: 'Convert image to webp'
      },
      label: 'Use WebP format',
      defaultValue: false
    }
  ],
}
