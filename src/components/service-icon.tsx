import {
  Flower2,
  Gem,
  Hand,
  Leaf,
  MoonStar,
  Sparkles,
  Waves,
} from 'lucide-react'
import type { ServiceIcon as ServiceIconName } from '@/lib/types'

const icons = {
  lotus: Flower2,
  sparkles: Sparkles,
  hand: Hand,
  leaf: Leaf,
  moon: MoonStar,
  waves: Waves,
  gem: Gem,
  flower: Flower2,
} as const

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const Icon = icons[name] || Flower2
  return <Icon className="size-5" strokeWidth={1.75} />
}
