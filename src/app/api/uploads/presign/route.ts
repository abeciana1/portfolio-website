// app/api/uploads/presign/route.ts
import { NextRequest } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const runtime = 'nodejs'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

export async function POST(req: NextRequest) {
  const { filename, contentType } = await req.json()
  const key = `uploads/${Date.now()}-${encodeURIComponent(filename)}`
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    ContentType: contentType || 'application/octet-stream',
    // No ACL for R2
  })
  const url = await getSignedUrl(r2, command, { expiresIn: 300 }) // 5 min
  return Response.json({ url, key })
}
