import { NextRequest } from 'next/server'
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

export const runtime = 'nodejs'

const r2 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_VIDEO_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_VIDEO_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

function extractKeyFromPath(req: NextRequest) {
  const pathname = new URL(req.url).pathname
  const prefix = '/api/r2/stream/'
  if (!pathname.startsWith(prefix)) return null
  return decodeURIComponent(pathname.slice(prefix.length))
}

const isProd = !!process.env.VERCEL

function redirectResponse(target: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'public, max-age=300',
    },
  })
}

export async function GET(req: NextRequest) {
  const rawKey = extractKeyFromPath(req)
  if (!rawKey) return new Response('Bad path', { status: 400 })

  const publicBase = process.env.R2_PUBLIC_BASE_URL

  if (isProd) {
    if (!publicBase) return new Response('Missing R2_PUBLIC_BASE_URL', { status: 500 })
    const target = `${publicBase}/${rawKey.split('/').map(encodeURIComponent).join('/')}`
    return redirectResponse(target)
  }

  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
  const range = req.headers.get('range') ?? undefined
  const ifNoneMatch = req.headers.get('if-none-match') ?? undefined
  const ifModifiedSince = req.headers.get('if-modified-since') ?? undefined

  if (ifNoneMatch || ifModifiedSince) {
    try {
      const head = await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: rawKey }))
      const etag = head.ETag
      const lastMod = head.LastModified ? new Date(head.LastModified).toUTCString() : undefined
      const notModifiedByETag = ifNoneMatch && etag && ifNoneMatch.replace(/W\//, '') === etag
      const notModifiedByDate =
        ifModifiedSince && lastMod && Date.parse(lastMod) <= Date.parse(ifModifiedSince)
      if (notModifiedByETag || notModifiedByDate) {
        const headers = new Headers()
        if (etag) headers.set('etag', etag)
        if (lastMod) headers.set('last-modified', lastMod)
        headers.set('cache-control', 'public, max-age=86400')
        return new Response(null, { status: 304, headers })
      }
    } catch {}
  }

  const obj = await r2.send(new GetObjectCommand({ Bucket: bucket, Key: rawKey, Range: range }))
  const headers = new Headers()
  headers.set('cache-control', 'public, max-age=86400')
  if (obj.ContentType) headers.set('content-type', obj.ContentType)
  if (obj.ContentLength) headers.set('content-length', String(obj.ContentLength))
  if (obj.AcceptRanges) headers.set('accept-ranges', obj.AcceptRanges)
  if (obj.ETag) headers.set('etag', obj.ETag)
  if (obj.LastModified) headers.set('last-modified', new Date(obj.LastModified).toUTCString())
  if (obj.ContentRange) headers.set('content-range', obj.ContentRange)

  return new Response(obj.Body as ReadableStream, { status: range ? 206 : 200, headers })
}

export async function HEAD(req: NextRequest) {
  const rawKey = extractKeyFromPath(req)
  if (!rawKey) return new Response('Bad path', { status: 400 })

  const publicBase = process.env.R2_PUBLIC_BASE_URL
  if (isProd) {
    if (!publicBase) return new Response('Missing R2_PUBLIC_BASE_URL', { status: 500 })
    const target = `${publicBase}/${rawKey.split('/').map(encodeURIComponent).join('/')}`
    return redirectResponse(target)
  }

  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
  const head = await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: rawKey }))

  const headers = new Headers()
  headers.set('cache-control', 'public, max-age=86400')
  if (head.ContentType) headers.set('content-type', head.ContentType)
  if (head.ContentLength) headers.set('content-length', String(head.ContentLength))
  if (head.AcceptRanges) headers.set('accept-ranges', head.AcceptRanges)
  if (head.ETag) headers.set('etag', head.ETag)
  if (head.LastModified) headers.set('last-modified', new Date(head.LastModified).toUTCString())

  return new Response(null, { status: 200, headers })
}
