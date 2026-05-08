import { getPayloadClient } from '@/lib/payload'
import type { ServiceDoc, SquareSyncEntry, SquareSyncSummary } from '@/lib/types'

const SQUARE_API_VERSION = '2026-01-22'

function extractPriceLabel(item: Record<string, any>) {
  const variations = item.item_variation_data
    ? [item]
    : Array.isArray(item.item_data?.variations)
      ? item.item_data.variations
      : []

  const firstVariation = variations.find((variation: Record<string, any>) => {
    return variation.item_variation_data?.price_money?.amount
  })

  const amount = firstVariation?.item_variation_data?.price_money?.amount

  if (typeof amount !== 'number') return undefined

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount / 100)
}

async function fetchSquareCatalogSummary(service: ServiceDoc): Promise<SquareSyncEntry> {
  if (!process.env.SQUARE_ACCESS_TOKEN) {
    return {
      slug: service.slug,
      active: service.binding.active,
      live: false,
      priceLabel: service.priceLabel,
      reason: 'Missing SQUARE_ACCESS_TOKEN',
    }
  }

  if (!service.binding.squareCategoryId && !service.binding.squareItemId) {
    return {
      slug: service.slug,
      active: Boolean(service.binding.squareAppointmentUrl),
      live: false,
      priceLabel: service.priceLabel,
      reason: 'No Square item or category binding configured',
    }
  }

  const body = {
    category_ids: service.binding.squareCategoryId ? [service.binding.squareCategoryId] : undefined,
    text_filter: service.binding.squareItemId ? undefined : service.title,
    enabled_location_ids: process.env.SQUARE_LOCATION_ID ? [process.env.SQUARE_LOCATION_ID] : undefined,
    archived_state: 'ARCHIVED_STATE_NOT_ARCHIVED',
    limit: 10,
  }

  const response = await fetch('https://connect.squareup.com/v2/catalog/search-catalog-items', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Square-Version': SQUARE_API_VERSION,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!response.ok) {
    return {
      slug: service.slug,
      active: service.binding.active,
      live: false,
      priceLabel: service.priceLabel,
      reason: `Square returned ${response.status}`,
    }
  }

  const data = (await response.json()) as { items?: Array<Record<string, any>> }
  const matched = data.items?.[0]

  return {
    slug: service.slug,
    active: Boolean(matched) && Boolean(service.binding.squareAppointmentUrl),
    live: true,
    priceLabel: matched ? extractPriceLabel(matched) ?? service.priceLabel : service.priceLabel,
  }
}

export async function runSquareSync(): Promise<SquareSyncSummary> {
  const payload = await getPayloadClient()
  const payloadServices = payload
    ? ((await payload.find({
        collection: 'services',
        depth: 0,
        limit: 100,
        pagination: false,
      })).docs as unknown as ServiceDoc[])
    : []

  const fallbackServices = payloadServices.length ? [] : (await import('@/lib/default-content')).servicesSeed
  const syncTarget = payloadServices.length ? payloadServices : fallbackServices

  const summaryEntries = await Promise.all(syncTarget.map(fetchSquareCatalogSummary))

  if (payload && payloadServices.length) {
    await Promise.all(
      summaryEntries.map(async (entry) => {
        const service = payloadServices.find((current) => current.slug === entry.slug)
        if (!service) return

        await payload.update({
          collection: 'services',
          id: (service as unknown as { id: number | string }).id,
          data: {
            binding: {
              ...(service as unknown as { binding: Record<string, unknown> }).binding,
              active: entry.active,
            },
            priceLabel: entry.priceLabel,
            lastSyncedAt: new Date().toISOString(),
          },
        })
      }),
    )
  }

  return {
    syncedAt: new Date().toISOString(),
    live: Boolean(process.env.SQUARE_ACCESS_TOKEN),
    services: summaryEntries,
  }
}
