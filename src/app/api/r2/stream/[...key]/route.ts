// src/app/api/r2/stream/[...key]/route.ts
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

export const runtime = 'nodejs'

type RouteContext = {
  params: Record<string, string | string[]>
}

export async function GET(request: Request, context: RouteContext): Promise<Response> {
  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
  const segments = Array.isArray(context.params.key)
    ? (context.params.key as string[])
    : [context.params.key as string]

  const rawKey = decodeURIComponent(segments.join('/'))

  const range = request.headers.get('range') ?? undefined
  const cmd = new GetObjectCommand({ Bucket: bucket, Key: rawKey, Range: range })
  const obj = await r2.send(cmd)

  const headers = new Headers()
  if (obj.ContentType) headers.set('content-type', obj.ContentType)
  if (obj.ContentLength) headers.set('content-length', String(obj.ContentLength))
  if (obj.AcceptRanges) headers.set('accept-ranges', obj.AcceptRanges)
  if (obj.ETag) headers.set('etag', obj.ETag)
  if (obj.ContentRange) headers.set('content-range', obj.ContentRange)

  return new Response(obj.Body as any, { status: range ? 206 : 200, headers })
}