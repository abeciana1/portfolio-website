import { NextRequest } from 'next/server'
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand
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

export async function GET(req: NextRequest) {
  const bucket = process.env.CLOUDFLARE_VIDEO_BUCKET_NAME!
  const publicBase = process.env.R2_PUBLIC_BASE_URL // optional if you want public URLs
  const url = new URL(req.url)
  const name = url.searchParams.get('name') // e.g. "Sweet Static - Beta App Release - Promo Vid.mp4"
  const prefix = url.searchParams.get('prefix') ?? '' // try "videos/" if you use a folder

  try {
    const results: any[] = []
    let token: string | undefined
    let found = false

    do {
      const page = await r2.send(new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix || undefined,
        ContinuationToken: token,
        MaxKeys: 1000,
      }))
      token = page.NextContinuationToken

      for (const obj of page.Contents ?? []) {
        if (!obj.Key) continue
        const basename = obj.Key.split('/').pop()
        if (!name || basename === name || obj.Key === name) {
          // Verify it really exists and collect metadata
          try {
            const head = await r2.send(new HeadObjectCommand({ Bucket: bucket, Key: obj.Key }))
            results.push({
              key: obj.Key,
              basename,
              contentType: head.ContentType,
              contentLength: head.ContentLength,
              acceptRanges: head.AcceptRanges,
              // Build a public URL if you’ve made the bucket public:
              publicUrl: publicBase
                ? `${publicBase}/${obj.Key.split('/').map(encodeURIComponent).join('/')}`
                : null,
              // Raw key for streaming route below:
              streamViaApi: `/api/r2/stream/${encodeURIComponent(obj.Key)}`,
            })
            if (name) found = true
          } catch {
            // ignore; object might have been deleted mid-scan
          }
        }
      }
    } while (token && !found)

    return new Response(JSON.stringify({
      bucket,
      prefix,
      name,
      count: results.length,
      results,
    }), { headers: { 'content-type': 'application/json' }})
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || String(err) }), { status: 500 })
  }
}
