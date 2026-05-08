type PayloadRouteContext = {
  params: Promise<{
    slug?: string[]
  }>
}

type PayloadRouteHandler = (
  request: Request,
  context: PayloadRouteContext,
) => Response | Promise<Response>

type PayloadHandlerFactory = (config: Promise<unknown>) => PayloadRouteHandler

const isPayloadConfigured = () =>
  process.env.PAYLOAD_DATABASE_DISABLED !== '1' &&
  Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET)

const unavailableResponse = () =>
  Response.json(
    {
      error: 'Payload is not configured. Set DATABASE_URL and PAYLOAD_SECRET to enable admin APIs.',
    },
    { status: 503 },
  )

const handlerLoaders = {
  DELETE: async () => (await import('@payloadcms/next/routes')).REST_DELETE,
  GET: async () => (await import('@payloadcms/next/routes')).REST_GET,
  OPTIONS: async () => (await import('@payloadcms/next/routes')).REST_OPTIONS,
  PATCH: async () => (await import('@payloadcms/next/routes')).REST_PATCH,
  POST: async () => (await import('@payloadcms/next/routes')).REST_POST,
  PUT: async () => (await import('@payloadcms/next/routes')).REST_PUT,
} as const

type PayloadMethod = keyof typeof handlerLoaders

async function handlePayloadRoute(
  method: PayloadMethod,
  request: Request,
  context: PayloadRouteContext,
) {
  if (!isPayloadConfigured()) {
    return unavailableResponse()
  }

  const [{ default: payloadConfig }, createHandler] = await Promise.all([
    import('@/payload-config'),
    handlerLoaders[method](),
  ])
  const handler = (createHandler as PayloadHandlerFactory)(Promise.resolve(payloadConfig))

  return handler(request, context)
}

export const GET = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('GET', request, context)

export const POST = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('POST', request, context)

export const DELETE = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('DELETE', request, context)

export const PATCH = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('PATCH', request, context)

export const PUT = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('PUT', request, context)

export const OPTIONS = (request: Request, context: PayloadRouteContext) =>
  handlePayloadRoute('OPTIONS', request, context)
