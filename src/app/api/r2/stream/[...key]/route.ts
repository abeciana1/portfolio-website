// src/app/api/r2/stream/[...key]/route.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

export const runtime = 'nodejs' // AWS SDK streams need Node runtime

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
  req: Request,
  ctx: RouteContext<'/api/r2/stream/[...key]'>
) {
  const { key } = await ctx.params // <-- params is a Promise in Next 15
  const segments = Array.isArray(key) ? key : [key]
  const rawKey = decodeURIComponent(segments.join('/'))

  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
  const range = req.headers.get('range') ?? undefined

  const obj = await r2.send(
    new GetObjectCommand({ Bucket: bucket, Key: rawKey, Range: range })
  )

  const headers = new Headers()
  if (obj.ContentType) headers.set('content-type', obj.ContentType)
  if (obj.ContentLength) headers.set('content-length', String(obj.ContentLength))
  if (obj.AcceptRanges) headers.set('accept-ranges', obj.AcceptRanges)
  if (obj.ETag) headers.set('etag', obj.ETag)
  if (obj.ContentRange) headers.set('content-range', obj.ContentRange)

  return new Response(obj.Body as any, { status: range ? 206 : 200, headers })
}