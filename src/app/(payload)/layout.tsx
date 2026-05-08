import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'
import '@payloadcms/next/css'
import React from 'react'
import '@/app/(payload)/custom.scss'

export const metadata: Metadata = {
  title: 'Payload Admin | Verdant Meridian Spa',
  description: 'Editorial spa content administration',
}

type LayoutProps = {
  children: React.ReactNode
}

const isPayloadConfigured = () =>
  process.env.PAYLOAD_DATABASE_DISABLED !== '1' &&
  Boolean(process.env.PAYLOAD_SECRET) &&
  (() => {
    try {
      const url = new URL(process.env.DATABASE_URL || '')
      return url.protocol === 'postgres:' || url.protocol === 'postgresql:'
    } catch {
      return false
    }
  })()

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'

  if (!isPayloadConfigured()) return null

  try {
    const { handleServerFunctions } = await import('@payloadcms/next/layouts')
    const config = await import('@/payload-config')
    const { importMap } = await import('@/app/(payload)/admin/importMap')

    return handleServerFunctions({
      ...args,
      config: config.default,
      importMap,
    })
  } catch (error) {
    console.error('Failed to create Payload server function:', error)
    return null
  }
}

async function loadPayloadAdminLayout() {
  if (!isPayloadConfigured()) return null

  try {
    const { RootLayout } = await import('@payloadcms/next/layouts')
    const config = await import('@/payload-config')
    const { importMap } = await import('@/app/(payload)/admin/importMap')

    return {
      RootLayout,
      config: config.default,
      importMap,
    }
  } catch (error) {
    console.error('Failed to render Payload admin layout:', error)
    return null
  }
}

export default async function PayloadAdminLayout({ children }: LayoutProps) {
  const payloadLayout = await loadPayloadAdminLayout()

  if (!payloadLayout) return <>{children}</>

  const { RootLayout, config, importMap } = payloadLayout

  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{
        suppressHydrationWarning: true,
      }}
    >
      {children}
    </RootLayout>
  )
}
