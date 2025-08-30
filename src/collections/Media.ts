import {
  type CollectionConfig
} from 'payload'
import sharp, { type SharpOptions } from 'sharp';
import * as AWS from 'aws-sdk';
import {
  S3Client,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";


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
            const s3 = new AWS.S3({
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
          const s3 = new S3Client({
            endpoint: process.env.S3_ENDPOINT,   // e.g. https://<accountid>.r2.cloudflarestorage.com
            region: process.env.S3_REGION || "auto",
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            forcePathStyle: true, // required for Cloudflare R2
          });
          // const s3 = new AWS.S3({
          //   endpoint: process.env.S3_ENDPOINT,
          //   region: process.env.S3_REGION,
          //   credentials: {
          //     accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          //     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
          //   },
          //   s3ForcePathStyle: true,
          // });

          const webpFilename = doc.filename.replace(/\.[^/.]+$/, '.webp');
          try {
            // async function streamToBuffer(stream: Readable | any): Promise<Buffer> {
            //   const chunks: Buffer[] = [];
            //   for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            //   return Buffer.concat(chunks);
            // }
            async function objectExists(key: string): Promise<boolean> {
              try {
                await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
                return true;
              } catch (err: any) {
                const status = err?.$metadata?.httpStatusCode;
                return status === 404 || err?.name === "NotFound";
              }
            }
            // await s3
            // .headObject({
            //   Bucket: bucket,
            //   Key: webpFilename,
            // })
            // .promise();
            const exists = await objectExists(webpFilename);
            // doc.webpUrl = `${process?.env?.S3_ENDPOINT}/${bucket}/${webpFilename}`;
            doc.webpUrl = exists ? `${process.env.S3_ENDPOINT}/${bucket}/${webpFilename}` : null;
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
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc?.filename) {
          const s3 = new AWS.S3({
            endpoint: process?.env?.S3_ENDPOINT,
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
              .deleteObject({
                Bucket: 'images',
                Key: webpFilename,
              })
              .promise();
            console.log(`Deleted WebP image ${webpFilename} from S3.`);
          } catch (error: any) {
            if (error.code === 'NotFound') {
              console.log(`WebP image ${webpFilename} not found on S3, nothing to delete.`);
            } else {
              console.error(`Error deleting WebP image ${webpFilename}:`, error);
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
