'use client'

import { LogOut } from 'lucide-react'
import { useTranslation } from '@payloadcms/ui'

export default function AdminLogoutButton() {
  const { i18n } = useTranslation()
  const isChinese = i18n.language?.startsWith('zh')
  const label = isChinese ? '退出登录' : 'Log out'

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button className="admin-sidebar-logout" onClick={handleLogout} title={label} type="button">
      <LogOut size={16} />
      <span>{label}</span>
    </button>
  )
}
