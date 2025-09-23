import { NextRequest } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_VIDEO_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true,
})

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!

  const rawKey = decodeURIComponent(params.key.join('/'))

  const range = req.headers.get('range') || undefined
  const cmd = new GetObjectCommand({ Bucket: bucket, Key: rawKey, Range: range })
  const obj = await r2.send(cmd)

  const headers = new Headers()
  if (obj.ContentType) headers.set('content-type', obj.ContentType)
  if (obj.ContentLength) headers.set('content-length', String(obj.ContentLength))
  if (obj.AcceptRanges) headers.set('accept-ranges', obj.AcceptRanges)
  if (obj.ETag) headers.set('etag', obj.ETag)
  if (obj.ContentRange) headers.set('content-range', obj.ContentRange)
  if (range) return new Response(obj.Body as any, { status: 206, headers })
  return new Response(obj.Body as any, { headers })
}
