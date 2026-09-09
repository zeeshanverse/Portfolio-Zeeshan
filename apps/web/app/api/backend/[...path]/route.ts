import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/v1'

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  const target = `${BACKEND_URL.replace(/\/$/, '')}/${path.join('/')}${request.nextUrl.search}`

  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('content-length')

  const hasBody = !['GET', 'HEAD'].includes(request.method)
  const body = hasBody ? await request.arrayBuffer() : undefined

  const response = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: 'manual',
    cache: 'no-store',
  })

  const responseHeaders = new Headers(response.headers)
  responseHeaders.delete('content-length')
  responseHeaders.delete('content-encoding')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
}

export const GET = forward
export const POST = forward
export const PATCH = forward
export const PUT = forward
export const DELETE = forward
export const OPTIONS = forward
