import { NextRequest } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function extractKey(req: NextRequest) {
  const pathname = new URL(req.url).pathname
  const prefix = '/api/r2/stream/'
  if (!pathname.startsWith(prefix)) return null
  return decodeURIComponent(pathname.slice(prefix.length))
}

function buildPublicUrl(base: string, key: string) {
  return `${base}/${key.split('/').map(encodeURIComponent).join('/')}`
}

export async function GET(req: NextRequest) {
  const key = extractKey(req)
  if (!key) return new Response('Bad path', { status: 400 })
  const base = process.env.R2_PUBLIC_BASE_URL
  if (!base) return new Response('Missing R2_PUBLIC_BASE_URL', { status: 500 })
  const target = buildPublicUrl(base, key)
  return new Response(null, { status: 302, headers: { Location: target, 'Cache-Control': 'public, max-age=300' } })
}

export async function HEAD(req: NextRequest) {
  const key = extractKey(req)
  if (!key) return new Response('Bad path', { status: 400 })
  const base = process.env.R2_PUBLIC_BASE_URL
  if (!base) return new Response('Missing R2_PUBLIC_BASE_URL', { status: 500 })
  const target = buildPublicUrl(base, key)
  return new Response(null, { status: 302, headers: { Location: target, 'Cache-Control': 'public, max-age=300' } })
}
