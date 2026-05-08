'use client'

import { useTransition } from 'react'
import { useTranslation } from '@payloadcms/ui'
import { cn } from '@/lib/utils'

type AdminLanguage = 'en' | 'zh'

const copy = {
  en: {
    aria: 'Admin language switcher',
    english: 'English',
    chinese: '中文',
    label: 'Language',
    saving: 'Switching...',
  },
  zh: {
    aria: '后台语言切换',
    english: 'English',
    chinese: '中文',
    label: '语言',
    saving: '切换中...',
  },
} satisfies Record<AdminLanguage, Record<string, string>>

type AdminLanguageToggleProps = {
  className?: string
}

export default function AdminLanguageToggle({ className }: AdminLanguageToggleProps) {
  const { i18n, switchLanguage } = useTranslation()
  const [isPending, startTransition] = useTransition()
  const activeLanguage: AdminLanguage = i18n.language?.startsWith('zh') ? 'zh' : 'en'
  const text = copy[activeLanguage]

  const selectLanguage = (language: AdminLanguage) => {
    if (!switchLanguage || language === activeLanguage || isPending) {
      return
    }

    startTransition(() => {
      void switchLanguage(language)
    })
  }

  return (
    <div className={cn('admin-language-toggle', className)} aria-label={text.aria}>
      <span className="admin-language-toggle__label">
        {isPending ? text.saving : text.label}
      </span>
      <div className="admin-language-toggle__buttons">
        <button
          aria-pressed={activeLanguage === 'en'}
          className="admin-language-toggle__button"
          disabled={isPending}
          onClick={() => selectLanguage('en')}
          type="button"
        >
          {text.english}
        </button>
        <button
          aria-pressed={activeLanguage === 'zh'}
          className="admin-language-toggle__button"
          disabled={isPending}
          onClick={() => selectLanguage('zh')}
          type="button"
        >
          {text.chinese}
        </button>
      </div>
    </div>
  )
}
