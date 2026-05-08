import type { ServerProps } from 'payload'

export default function AdminBrandLogo({ i18n }: Partial<Pick<ServerProps, 'i18n'>>) {
  const isChinese = i18n?.language?.startsWith('zh')

  return (
    <div className="admin-brand-logo" aria-label="Oasis Spa Admin">
      <span className="admin-brand-logo__mark">O</span>
      <span className="admin-brand-logo__text">
        <span>Oasis Spa</span>
        <small>{isChinese ? '后台入口' : 'Admin Portal'}</small>
      </span>
    </div>
  )
}
