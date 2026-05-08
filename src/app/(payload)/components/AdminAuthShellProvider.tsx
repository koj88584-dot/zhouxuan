'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import AdminLanguageToggle from './AdminLanguageToggle'

type AdminAuthShellProviderProps = {
  children?: ReactNode
}

export default function AdminAuthShellProvider({ children }: AdminAuthShellProviderProps) {
  const pathname = usePathname()
  const isCreateFirstUser = pathname?.includes('/create-first-user')

  return (
    <>
      {children}
      {isCreateFirstUser ? (
        <AdminLanguageToggle className="admin-language-toggle--floating" />
      ) : null}
    </>
  )
}
